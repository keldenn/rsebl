'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"; 
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
export default function PaymentGateway({service_code, setPaymentSuccess, setOrderNo, setAmount, MERCHANT_CHECKOUT_URL}) {
  const router = useRouter();
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
    'EC': 'Bank Validation Failed', 
  };
  const [tempAmt, setTempAmt] = useState(0);
  const [loading, setLoading] = useState(false);
  const [bankCode, setBankCode] = useState('');
  const [accNumber, setAccNumber] = useState('');
  const [bankOtp, setBankOtp] = useState('');
  const [countdown, setCountdown] = useState(60000); // 7 minutes
  const [banks, setBanks] = useState([]);
  const [bfsTransId, setBfsTransId] = useState('');
  const [showBankFields, setShowBankFields] = useState(false);
  const [showOtpField, setShowOtpField] = useState(false);
  const [temp, setTemp] = useState();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [inactiveTimeout, setInactiveTimeout] = useState(null);
  const isExecuted = useRef(false); // ✅ Declare useRef outside useEffect

// Checkout Time = 5 Min
const startInactivityTimer = () => {
  if (inactiveTimeout) clearTimeout(inactiveTimeout);

  const timeout = setTimeout(() => {
    toast({
      title: "Session Timeout!",
      description: "Session expired due to inactivity",
      variant: "destructive",
    });
    window.location.href = MERCHANT_CHECKOUT_URL; // Redirect to merchant checkout
  }, 300000); // 5 minutes (300,000 milliseconds)

  setInactiveTimeout(timeout);
};

const resetTimer = () => {
  startInactivityTimer(); // Reset the timer on any user activity
};
useEffect(() => {
  startInactivityTimer(); // Start the timeout when the component mounts

  // Add event listeners for user interactions
  window.addEventListener("mousemove", resetTimer);
  window.addEventListener("keydown", resetTimer);
  window.addEventListener("touchstart", resetTimer);

  return () => {
    // Cleanup listeners when component unmounts
    window.removeEventListener("mousemove", resetTimer);
    window.removeEventListener("keydown", resetTimer);
    window.removeEventListener("touchstart", resetTimer);
    if (inactiveTimeout) clearTimeout(inactiveTimeout);
  };
}, []);





  useEffect(() => {
    async function fetchBanks() {
      try {
        const response = await fetch("https://rsebl.org.bt/agm/api/fetch-all-banks");
        const data = await response.json();
        setBanks(data);
      } catch (error) {
        console.error("Error fetching banks:", error);
      }
    }

    if (!isExecuted.current) {
      isExecuted.current = true; // ✅ Ensure it runs only once
      fetchBanks();
      handleSubmit();
    }
  }, []); // Runs only on mount

  const confirmSubmit = () => {
    setIsAlertOpen(true);
  };
  const handleConfirmedSubmit = () => {
    setIsAlertOpen(false);
    handlePayment();
  };

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

        // console.log("Status Updated Successfully:", data);
        return data;
    } catch (error) {
        // console.error("Error updating status:", error.message);
        return { status: "error", message: error.message };
    }
};

useEffect(() => {
  if (showOtpField && countdown > 0) {
    const timer = setTimeout(() => { 
      setCountdown(countdown - 1);
    }, 1000);
    
    return () => clearTimeout(timer);
  } else {
    setShowOtpField(false);
    // window.location.href = MERCHANT_CHECKOUT_URL;
  }
}, [showOtpField, countdown]);


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
  
      const response = await fetch('https://cms.rsebl.org.bt/payment_gateway/payment_terminal.php', {
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
        // console.log("First payment_Gateway res trxn id: ", data)
        setAmount(data.data[1].amount);
        setTempAmt(data.data[1].amount);
        setOrderNo(data.data[1].order_no);
        setBfsTransId(data.data[1].bfs_bfsTxnId);

      }
    } catch (error) {
      toast({
        title: "Error!",
        description: "An error occurred",
        variant: "destructive",
      });
      // console.error("Error:", error.message);
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
    try {
      setLoading(true); // Ensure loading state is set at the start

      const formData = new URLSearchParams();
      formData.append("bfs_trans_id", bfsTransId);
      formData.append("bank_code", bankCode);
      formData.append("acc_number", accNumber);
      formData.append("operation", "get__opt__from__bank");
    
      const response = await fetch("https://cms.rsebl.org.bt/payment_gateway/payment_terminal.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString(),
      });
    
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
        // console.error("Invalid JSON response:", text);
        alert("Invalid response from server");
        return;
      }
    
      if (Array.isArray(data) && data.length > 0 && data[0]?.state === "YES") {
        setShowOtpField(true);
        setCountdown(420);
      } else {


        toast({
          title: "Error!",
          description: `${responseCodeMessages[data[0]?.bfs_msgType] ? responseCodeMessages[data[0]?.bfs_msgType] : data[0]?.bfs_msgType} Please check your Account number and Bank`,
          variant: "destructive",
        });
        console.log(data[0]?.bfs_msgType);
        // const responseCode = data[0]?.data?.bfs_msgType;

        // console.log("failed", responseCode , responseCodeMessages[responseCode]);
        setTimeout(() => {
          window.location.href = MERCHANT_CHECKOUT_URL; // Redirect to merchant checkout
          // console.log("Redirecting to:", MERCHANT_CHECKOUT_URL);
          // router.replace("/ourservices/online-share-statement");
          // window.location.reload(); // This fully reloads the page
          // router.push(`?error=${data[0]?.data?.bfs_msgType}`);
          // router.replace(MERCHANT_CHECKOUT_URL);
        }, 4000);
      }
    } catch (error) {
      console.error("Error fetching OTP:", data[0]?.error); // <-- Log the actual error to the console
      
      toast({
        title: "Error!",
        description: `Error fetching OTP: ${data[0]?.error || error}`,
        variant: "destructive",
      });
    
      alert(`Error from server: ${data[0]?.error || "Unknown error"}`);

      setLoading(false);
    }
    
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
  
    try {
      setLoading(true); // Ensure loading state is set at the start
    
      const formData = new URLSearchParams();
      // console.log("bfs:OTP", bfsTransId, bankOtp);
      formData.append("bfs_trans_id", bfsTransId);
      formData.append("otp", bankOtp);
      formData.append("operation", "make__online__payment");
    
      const response = await fetch('https://cms.rsebl.org.bt/payment_gateway/payment_terminal.php', {
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
        // console.error("Invalid JSON response:", text);
        toast({
          title: "Error!",
          description: "Unexpected server response. Please try again later.",
          variant: "destructive",
        });
        return;
      }
    
      // console.log("Parsed JSON Response:", data);
    
      const bfsCode = data?.[0]?.bfs_code;
      const bfsOrderNo = data?.[0]?.form_data?.bfs_orderNo;
    
      if (data?.[0]?.http_code === 200 && bfsCode === '00') {    
        if (bfsOrderNo.slice(0, 2) === "SS") {
          toast({ title: "Success", description: 'Payment Done' });
          // setOrderNo(bfsOrderNo)
          try {
            const response = await updateStatusByOrderNo(bfsOrderNo);
            // console.log("Status Update Response:", response);
          } catch (error) {
            console.error("Error updating status:", error);
          }
          setPaymentSuccess(true);
          return;
        }else if (bfsOrderNo.slice(0, 2) === "OT" ){
          toast({ title: "Success", description: 'Payment Done' });
          setPaymentSuccess(true);
          return;
        }else if (bfsOrderNo.slice(0, 2) === "OR" ){
          toast({ title: "Success", description: 'Payment Done' });
          setPaymentSuccess(true);
          return;
        }else if (bfsOrderNo.slice(0, 2) === "DS" ){
          toast({ title: "Success", description: 'Payment Done' });
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
                  <Button onClick={confirmSubmit} className="w-full ">Submit Payment</Button>

                </>
              ) : (
                <Button onClick={handleGetOtp} className="w-full ">Get OTP</Button>
              )}
            </>
          )}
        </CardContent>
      </Card>
      {/* Alert */}
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmation</AlertDialogTitle>
            <AlertDialogDescription>
              Generating your share statement will cost Nu {tempAmt && tempAmt}. Do you wish to proceed?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmedSubmit}>Proceed</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
  
    </div>
  );
}
