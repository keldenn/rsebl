"use client";

import { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import PaymentGateway from "../components/PaymentGateway";
import { useToast } from "@/hooks/use-toast";
import ShareStatement from "../components/shareStatement";
export default function OnlineShareStatement() {
  const [open, setOpen] = useState(false);
  const [accountType, setAccountType] = useState(""); // Account type: Individual or Corporate
  const [cidNo, setCidNo] = useState("");
  const [disnNo, setDisnNo] = useState("");
  const [phone, setPhone] = useState(""); // Phone number state
  const [email, setEmail] = useState(""); // Email state
  const [loading, setLoading] = useState(false); // Loading state for buttons
  const [fieldsVisible, setFieldsVisible] = useState(false); // Control visibility of phone/email fields
  const [otp, setOtp] = useState(""); // OTP state
  const [otpVerified, setOtpVerified] = useState(false); // OTP verification state
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [orderNo, setOrderNo] = useState();
  const { toast } = useToast();

  const handleAccountTypeChange = (e) => {
    setAccountType(e.target.value); // Update account type based on dropdown selection
  };
  const handleCidChange = (e) => {
    setCidNo(e.target.value); // Update CID number
  };
  const handleDisnChange = (e) => setDisnNo(e.target.value); // Update DISN number
  if(paymentSuccess){
    console.log("page", orderNo)
  }
  const fetchData = async () => {
    if (accountType === "I" && !cidNo) {
      toast({
        description: "CID number is required",
        variant: "destructive",
      });
      return;
    }

    if (accountType === "J" && !disnNo) {
      toast({
        description: "DISN number is required",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const apiURL = `https://rsebl.org.bt/agm/api/checkshareExistNew?${accountType === "I" ? `cidNo=${cidNo}` : `cidNo=${disnNo}`}&accType=${accountType}`;

      const response = await fetch(apiURL);
      const data = await response.json();

      if (data.status === 200) {
        setPhone(data.phone || "");
        setEmail(data.email || "");
        setFieldsVisible(true);
        toast({
          description: "If your Phone number/Email is incorrect, please contact RSEB office/Broker to update.",
        });
      } else {
        toast({
          description: data.message || "No data is available on holding any shares.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast({
        description: "Error fetching data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  async function sendOtpOperation(stmnt) {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/sendOtpOperation`;
    const body = JSON.stringify({
      cidNo: stmnt.cidNo,
      phoneNo: stmnt.phoneNo,
      email: stmnt.email,
    });

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      });

      const data = await response.json();

      if (response.status === 200) {
        setOtpVerified(true);

        return data; // Success
      } else {
        throw new Error(data.message || "Error sending OTP");
      }
    } catch (error) {
      console.error("Error:", error);
      throw error; // Error handling
    }
  }

  // Handles OTP verification
  const verifyOtp = async () => {
    if (!otp) {
      toast({
        description: "Please enter the OTP.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true); // Show loading state during OTP verification

    const stmnt = {
      cidNo: accountType === "I" ? cidNo : disnNo,
      phoneNo: phone,
      email: email,
      otpNo: otp,
    };

    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/sendPaymentForOSS`; // API URL for OTP verification
      const body = JSON.stringify(stmnt);

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      });

      const data = await response.json();

      if (response.status === 200) {
         // Mark OTP as verified
        toast({
          description: "OTP verified successfully. Proceed to payment.",

        });
        setOpen(true); // Open payment gateway drawer
      } else {
        toast({
          description: data.message || "Invalid OTP. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast({
        description: "Error verifying OTP. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    // Prepare statement object for sending OTP
    const stmnt = {
      cidNo: accountType === "I" ? cidNo : disnNo,
      phoneNo: phone,
      email: email,
    };

    try {
      setLoading(true);
      const otpResponse = await sendOtpOperation(stmnt);

      if (otpResponse && otpResponse.status === 200) {
        toast({
          description: "OTP sent successfully. Enter OTP to proceed.",
        });
      } else {
        toast({
          description: otpResponse?.message || "Error sending OTP, please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast({
        description: "An error occurred while sending OTP. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-6">
      <div className="rounded-xl h-auto border bg-card text-card-foreground shadow p-4">
        <h2 className="py-4 text-xl font-medium text-center">Online Share Statement</h2>

        {/* Account Type Dropdown */}
        <label className="text-sm font-medium">Account Type</label>
        <select
          className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-base text-muted-foreground"
          value={accountType}
          onChange={handleAccountTypeChange}
        >
          <option value="">Select Account Type</option>
          <option value="I">Individual</option>
          <option value="J">Corporate/Association</option>
        </select>

        {/* CID No Input (for Individual) */}
        {accountType === "I" &&  !paymentSuccess && (
          <>
            <label className="text-sm font-medium">CID No</label>
            <input
              className="flex h-10 w-full rounded-md border bg-background px-3 py-2 mt-2 mb-2"
              placeholder="Enter your CID number"
              type="text"
              required
              value={cidNo}
              onChange={handleCidChange}
            />
          </>
        )}

        {/* DISN No Input (for Corporate/Association) */}
        {accountType === "J" &&  !paymentSuccess &&(
          <>
            <label className="text-sm font-medium">DISN No</label>
            <input
              className="flex h-10 w-full rounded-md border bg-background px-3 py-2 mt-2 mb-2"
              placeholder="Enter DISN number provided by RSEB"
              type="text"
              required
              value={disnNo}
              onChange={handleDisnChange}
            />
          </>
        )}

        {/* Fetch Button */}
        <div className="flex justify-center">
          <Button
            variant="outline"
            size="lg"
            className="my-5"
            onClick={fetchData}
            disabled={loading}
          >
            {loading ? "Fetching..." : "Fetch"}
          </Button>
        </div>

        {/* Phone and Email Fields */}
        {fieldsVisible &&  !paymentSuccess &&(
          <>
            <label className="text-sm font-medium">Phone No</label>
            <input
              className="flex h-10 w-full rounded-md border bg-background px-3 py-2 mt-2 mb-2"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              type="text"
              required
            />
            <label className="text-sm font-medium">Email</label>
            <input
              className="flex h-10 w-full rounded-md border bg-background px-3 py-2 mt-2 mb-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              type="email"
              required
            />
            <div className="flex justify-center">
              <Button
                variant="outline"
                size="lg"
                className="my-5"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Sending OTP..." : "Send OTP "}
              </Button>
            </div>
          </>
        )}

        {/* OTP Input and Verification */}
        {fieldsVisible && otpVerified && !paymentSuccess &&(
          <>
            <label className="text-sm font-medium">Enter OTP number recieved from RSEB</label>
            <input
              className="flex h-10 w-full rounded-md border bg-background px-3 py-2 mt-2 mb-2"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              type="text"
              required
            />
            <div className="flex justify-center">
              <Button
                variant="outline"
                size="lg"
                className="my-5"
                onClick={verifyOtp}
                disabled={loading}
              >
                {loading ? "Verifying OTP..." : "Verify OTP"}
              </Button>
            </div>
          </>
        )}
      </div>
      
      {paymentSuccess && orderNo && (
        <ShareStatement order_no={orderNo} />
    )}
      {/* Drawer - Payment Portal */}
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger>
          {/* <Button variant="outline">Open Drawer</Button> */}
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-lg p-5 p-0-md">
            <DrawerHeader className="m-0 px-0 flex flex-col justify-center items-center">
              <DrawerTitle>Payment Portal</DrawerTitle>
              <DrawerDescription>Royal Securities Exchange of Bhutan</DrawerDescription>
            </DrawerHeader>
            <div className=" h-[290px]">
              <PaymentGateway service_code={"SS"} setPaymentSuccess={setPaymentSuccess} setOrderNo ={setOrderNo}/>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
