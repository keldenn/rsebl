'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";

export default function PaymentGateway() {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [bankCode, setBankCode] = useState('');
  const [accNumber, setAccNumber] = useState('');
  const [bankOtp, setBankOtp] = useState('');
  const [countdown, setCountdown] = useState(420); // 7 minutes
  const [banks, setBanks] = useState([]);
  const [bfsTransId, setBfsTransId] = useState('');
  const [showBankFields, setShowBankFields] = useState(false);
  const [showOtpField, setShowOtpField] = useState(false);

  useEffect(() => {
    async function fetchBanks() {
      const response = await fetch('https://rsebl.org.bt/agm/api/fetch-all-banks');
      const data = await response.json();
      setBanks(data);
    }
    fetchBanks();
  }, []);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleSubmit = async () => {
    if (!amount) {
      alert("Required Amount");
      return;
    }
    setLoading(true);
  
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
      formData.append("amount", amount);
      formData.append("service_code", "OT");
      formData.append("sys_date_time", sys_date_time);
      formData.append("operation", "get__transition_txt__id");
  
      const response = await fetch('https://cms.rsebl.org.bt/payment_gateway/payment_gateway.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString(), // Correctly format the body
      });
  
      console.log("res", response);
  
      if (!response.ok) {
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
        console.log("bfs", data.data[1].bfs_bfsTxnId)
        setBfsTransId(data.data[1].bfs_bfsTxnId);
      }
    } catch (error) {
      console.error("Error:", error.message);
      alert(`An error occurred: ${error.message}`);
      setLoading(false);
    }
  };
  

  const handleGetOtp = async () => {
    if (!bankCode) {
      alert("Select Bank");
      return;
    }
    if (!accNumber) {
      alert("Account No. Required");
      return;
    }
    setLoading(true);
  
    setTimeout(async () => {
      try {
        const formData = new URLSearchParams();
        formData.append("bfs_trans_id", bfsTransId);
        formData.append("amount", amount);
        formData.append("bank_code", bankCode);
        formData.append("acc_number", accNumber);
        formData.append("operation", "get__opt__from__bank");
  
        const response = await fetch(
          "https://cms.rsebl.org.bt/payment_gateway/payment_gateway.php",
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
  
        console.log("OTP Response:", data); // Debugging log
  
        if (Array.isArray(data) && data.length > 0 && data[0]?.state === "YES") {
          setShowOtpField(true);
          setCountdown(420);
        } else {
          alert("Failed to get OTP");
        }
      } catch (error) {
        console.error("Error fetching OTP:", error);
        alert("An error occurred while getting OTP.");
        setLoading(false);
      }
    }, 2000);
  };
  
  
  const handlePayment = async () => {
    if (!bankOtp) {
      alert("OTP Required");
      return;
    }
    setLoading(true);
  
    setTimeout(async () => {
      const formData = new URLSearchParams();
      formData.append("bfs_trans_id", bfsTransId);
      formData.append("otp", bankOtp);
      formData.append("operation", "make__online__payment");
  
      const response = await fetch('https://cms.rsebl.org.bt/payment_gateway/payment_gateway.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString(),
      });
  
      const text = await response.text();
      setLoading(false);
  
      if (!text) {
        alert("Empty response from server");
        return;
      }
  
      const data = JSON.parse(text);
  
      if (data?.[0]?.http_code === 200 && data?.[0]?.bfs_code === '00') {
        const form = document.createElement('form');
        form.action = data[0].action_url;
        form.method = 'POST';
  
        Object.keys(data[0].form_data).forEach((key) => {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = key;
          input.value = data[0].form_data[key];
          form.appendChild(input);
        });
  
        document.body.appendChild(form);
        form.submit();
      } else {
        alert("Transaction Failed");
      }
    }, 2000);
  };
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-70">
          <Loader2 className="animate-spin w-10 h-10" />
          <p className="ml-2">Processing. Please Wait...</p>
        </div>
      )}

      <h1 className="text-center text-2xl font-bold mb-6">Payment Gateway</h1>
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <div className="mb-4">
            <label className="block mb-1">Amount</label>
            <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} readOnly={showBankFields} />
          </div>

          {!showBankFields && (
            <Button onClick={handleSubmit} className="w-full mb-4">Submit</Button>
          )}

          {showBankFields && (
            <>
              <div className="mb-4">
                <label className="block mb-1">Bank</label>
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

              <div className="mb-4">
                <label className="block mb-1">Account No.</label>
                <Input type="number" value={accNumber} onChange={(e) => setAccNumber(e.target.value)} />
              </div>

              {showOtpField ? (
                <>
                  <div className="mb-4">
                    <label className="block mb-1">OTP</label>
                    <Input type="number" value={bankOtp} onChange={(e) => setBankOtp(e.target.value)} />
                  </div>
                  <Button onClick={handlePayment} className="w-full">Submit Payment</Button>
                </>
              ) : (
                <Button onClick={handleGetOtp} className="w-full">Get OTP</Button>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
