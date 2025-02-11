'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast"
import ShareStatement from './shareStatement';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
export default function PaymentGateway({service_code, setPaymentSuccess, setOrderNo, setAmount}) {
   const { toast } = useToast();
   const responseCodeMessages = {
    '00': 'Approved',
    '03': 'Invalid Beneficiary',
    '05': 'Beneficiary Account Closed',
    '12': 'Invalid Transaction',
    '13': 'Invalid Amount',
    '14': 'Invalid Remitter Account',
    '20': 'Invalid Response',
    '30': 'Transaction Not Supported Or Format Error',
    '45': 'Duplicate Beneficiary Order Number',
    '47': 'Invalid Currency',
    '48': 'Transaction Limit Exceeded',
    '51': 'Insufficient Funds',
    '53': 'No Savings Account',
    '57': 'Transaction Not Permitted',
    '61': 'Withdrawal Limit Exceeded',
    '65': 'Withdrawal Frequency Exceeded',
    '76': 'Transaction Not Found',
    '78': 'Decryption Failed',
    '80': 'Buyer Cancel Transaction',
    '84': 'Invalid Transaction Type',
    '85': 'Internal Error At Bank System',
    'BC': 'Transaction Cancelled By Customer',
    'FE': 'Internal Error',
    'OA': 'Session Timeout at BFS Secure Entry Page',
    'OE': 'Transaction Rejected As Not In Operating Hours',
    'OF': 'Transaction Timeout',
    'SB': 'Invalid Beneficiary Bank Code',
    'XE': 'Invalid Message',
    'XT': 'Invalid Transaction Type',
    'UC': 'Cancelled by User',
    'TO': 'Time Out',
    '06': 'Declined',
    '55': 'Incorrect OTP',
    '91': 'Switch Bank',
    'IE': 'PG Internal Error',
  };
  
  const [loading, setLoading] = useState(false);
  const [bankCode, setBankCode] = useState('');
  const [accNumber, setAccNumber] = useState('');
  const [bankOtp, setBankOtp] = useState('');
  const [countdown, setCountdown] = useState(5); // 7 minutes
  const [banks, setBanks] = useState([]);
  const [bfsTransId, setBfsTransId] = useState('');
  const [showBankFields, setShowBankFields] = useState(false);
  const [showOtpField, setShowOtpField] = useState(false);
  const [temp, setTemp] = useState();
 


  useEffect(() => {
    async function fetchBanks() {
      const response = await fetch('https://rsebl.org.bt/agm/api/fetch-all-banks');
      const data = await response.json();
      setBanks(data);
    }
    fetchBanks();
    handleSubmit();
  }, []);

  const updateStatusByOrderNo = async (orderNo) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/updateStatusByOrderNo`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ orderNo }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to update status");
        }

        console.log("Status Updated Successfully:", data);
        return data;
    } catch (error) {
        console.error("Error updating status:", error.message);
        return { status: "error", message: error.message };
    }
};

  useEffect(() => {
    if (showOtpField && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }else{
      setShowOtpField(false);
    }
  }, [countdown, showOtpField]);

  const handleSubmit = async () => {

    setLoading(true);
    setCountdown(0); // Stop the countdown
    setShowOtpField(false); // Hide OTP field
    
    try {
      const now = new Date();
      const sys_date_time =
        now.getFullYear() +
        ('0' + (now.getMonth() + 1)).slice(-2) +
        ('0' + now.getDate()).slice(-2) +
        ('0' + now.getHours()).slice(-2) +
        ('0' + now.getMinutes()).slice(-2) +
        ('0' + now.getSeconds()).slice(-2);
  
      const formData = new URLSearchParams();
      // formData.append("amount", amount);
      formData.append("service_code", service_code);
      formData.append("sys_date_time", sys_date_time);
      formData.append("operation", "get__transition_txt__id");
  
      const response = await fetch('http://localhost/payment_gateway/payment_gateway.php', {
      
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString(), // Correctly format the body
      });

  
      if (!response.ok) {
        toast({
          title: "Error!",
          description: "Server error",
          variant: "destructive",
        });

      
        throw new Error(`Server error: ${response.status} ${response.statusText}`);
      }
  
      const text = await response.text();
      if (!text) {
        throw new Error("Empty response from server");
      }
      
      const data = JSON.parse(text);
      setLoading(false);
  
      if (data?.data?.[1]?.bfs_bfsTxnId) {
        setShowBankFields(true);
        console.log("First payment_Gateway res trxn id: ", data)
        setAmount(data.data[1].amount);
        setOrderNo(data.data[1].order_no);
        setBfsTransId(data.data[1].bfs_bfsTxnId);
        // insert data
        if(service_code = "SS") {
          // call function insert_into_database
          
        }
      }
    } catch (error) {
      toast({
        title: "Error!",
        description: "An error occurred",
        variant: "destructive",
      });
      console.error("Error:", error.message);
      alert(`An error occurred: ${error.message}`);

      setLoading(false);
    }
  };
  

  const handleGetOtp = async () => {
    if (!bankCode) {
      toast({
        title: "Error!",
        description: "Select a bank",
        variant: "destructive",
      });
      return;
    }
    if (!accNumber) {
      toast({
        title: "Error!",
        description: "Account No requried!",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
  
    setTimeout(async () => {
      try {
        const formData = new URLSearchParams();
        formData.append("bfs_trans_id", bfsTransId);
        // formData.append("amount", amount);
        formData.append("bank_code", bankCode);
        formData.append("acc_number", accNumber);
        formData.append("operation", "get__opt__from__bank");
  
        const response = await fetch(
          "http://localhost/payment_gateway/payment_gateway.php",
          {
            
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: formData.toString(),
          }
        );
  
        const text = await response.text();
        setLoading(false);
  
        if (!text) {
          alert("Empty response from server");
          return;
        }
  
        let data;
        try {
          data = JSON.parse(text);
        } catch (error) {
          console.error("Invalid JSON response:", text);
          alert("Invalid response from server");
          return;
        }
  
        if (Array.isArray(data) && data.length > 0 && data[0]?.state === "YES") {
          setShowOtpField(true);
          setCountdown(420);
        } else {
          toast({
            title: "Error!",
            description: "Failed to get OTP!, Please check your Account no and Bank",
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Error!",
          description: "Error fetching OTP",
          variant: "destructive",
        });
        alert("An error occurred while getting OTP.");
        setLoading(false);
      }
    }, 2000);
  };
  
  
  const handlePayment = async () => {
    if (!bankOtp) {
      toast({
        title: "Error!",
        description: "Bank OTP required",
        variant: "destructive",
      });
      return;
    }
    if (bankOtp.length !== 6) {
      toast({
        title: "Error!",
        description: "The OTP should be exactly 6 characters long",
        variant: "destructive",
      });
      return;
    }
  
    setLoading(true);
 
    
    setTimeout(async () => {
      const formData = new URLSearchParams();
      console.log("bfs:OTP", bfsTransId, bankOtp)
      formData.append("bfs_trans_id", bfsTransId);
      formData.append("otp", bankOtp);
      formData.append("operation", "make__online__payment");
  
      try {
        const response = await fetch('http://localhost/payment_gateway/payment_gateway.php', {
        
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: formData.toString(),
        });
  
        const text = await response.text();
        setLoading(false);
  
        if (!text) {
          toast({
            title: "Error!",
            description: "Empty response from server",
            variant: "destructive",
          });
          return;
        }
  
        // **Check if the response is valid JSON**
        let data;
        try {
          data = JSON.parse(text);
        } catch (error) {
          console.error("Invalid JSON response:", text);
          toast({
            title: "Error!",
            description: "Unexpected server response. Please try again later.",
            variant: "destructive",
          });
          return;
        }
  
        console.log("Parsed JSON Response:", data);
      
        const bfsCode = data?.[0]?.bfs_code;
        const bfsOrderNo = data?.[0]?.form_data?.bfs_orderNo;
        
        if (data?.[0]?.http_code === 200 && bfsCode === '00') {
          toast({ title: "Success", description: 'Payment Done!' });
          if (bfsOrderNo.slice(0, 2) === "SS") {
            toast({ title: "Success", description: 'Payment Done2!' });
            // setOrderNo(bfsOrderNo)
            try {
              const response = await updateStatusByOrderNo(bfsOrderNo);
              console.log("Status Update Response:", response);
          } catch (error) {
              console.error("Error updating status:", error);
          }
            setPaymentSuccess(true);
            
            return;
          }
  
        } else {
          toast({
            title: "Transaction Failed",
            description: responseCodeMessages[bfsCode] || 'Unknown error occurred',
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error:", error);
        toast({
          title: "Error!",
          description: "A network or server error occurred. Please try again.",
          variant: "destructive",
        });
        setLoading(false);
      }
    }, 20000);
  };
  

  return (
    <div className="flex flex-col items-center justify-center ">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-70">
          <Loader2 className="animate-spin w-10 h-10" />
          <p className="ml-2">Processing. Please Wait..</p>
        </div>
      )}

      <Card className="w-full ">
        <CardContent className="p-6">
          {showBankFields && (
            <>
            <div className="">
              You will be charged
              {temp}
            </div>
            <div className="flex flex-row">
            <div className="mb-4 w-1/2">
                <label className="text-sm mb-1 text-gray-500">Bank</label>
                <Select onValueChange={setBankCode}>
                  <SelectTrigger>
                    <SelectValue placeholder="--Select Bank--" />
                  </SelectTrigger>
                  <SelectContent>
                    {banks.map((bank) => (
                      <SelectItem key={bank.bank_code} value={bank.bank_code}>
                        {bank.bank_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="mb-4 ms-4 w-1/2">
                <label className=" mb-1 text-sm text-gray-500">Account No</label>
                <Input type="number" value={accNumber} onChange={(e) => setAccNumber(e.target.value)} />
              </div>
            </div>

              {/* {showOtpField && (
                    <div className="mb-2 w-full ">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-red-500 font-semibold">
                        OTP Verification Timer : 
                          {Math.floor(countdown / 60)}:{String(countdown % 60).padStart(2, '0')}
                        </span>
                      </div>
                      <div className="relative pt-1">
                        <div className="flex mb-1 items-center justify-between">
                          <div className="w-full bg-gray-200 h-1 rounded-full">
                            <div
                              className="h-1 bg-custom-1 rounded-full transition-all"
                              style={{ width: `${(countdown / 420) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )} */}

              {showOtpField ? (
                <>
                  <div className="mb-4 ">
                    
                  <div className="flex justify-between ">
                  <label className=" mb-1 text-sm text-gray-500">One-Time Password</label>
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-red-500 font-semibold">
                        Expiry timer :  
                          {" " + Math.floor(countdown / 60)}:{String(countdown % 60).padStart(2, '0')}
                        </span>
                      </div>
                    </div>
                    {/* <Input type="number" value={bankOtp} onChange={(e) => setBankOtp(e.target.value)} /> */}
                    <div className="flex flex-col items-center justify-center">
                    
                    <InputOTP
                      maxLength={6}
                      value={bankOtp}
                      onChange={setBankOtp}
                      className="w-full"
                    >
                      <InputOTPGroup>
                          <InputOTPSlot className="w-14" index={0} />
                          <InputOTPSlot className="w-14" index={1} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot className="w-14" index={2} />
                          <InputOTPSlot className="w-14" index={3} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot className="w-14" index={4} />
                          <InputOTPSlot className="w-14" index={5} />
                        </InputOTPGroup>
                    </InputOTP>
                    </div>
                  
                  </div>
                  <Button onClick={handlePayment} className="w-full ">Submit Payment</Button>
                </>
              ) : (
                <Button onClick={handleGetOtp} className="w-full ">Get OTP</Button>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
