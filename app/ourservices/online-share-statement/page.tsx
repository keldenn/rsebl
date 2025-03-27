"use client";

import { useEffect, useState } from "react";
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
import ShareStatement from "../components/ShareStatement";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import BhutanNDIComponent from "@/components/ndi/ndi-modal";
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
  const [amount, setAmount] = useState();
  const[ndiSuccess, setNdiSuccess]=useState(false);
  const[ndiData, setNdiData]=useState();
  const [fetched, setFetched] = useState(false); // Add this near your other states
  const [accountSelected, setAccountSelected] = useState(false);
  const { toast } = useToast();

  const handleAccountTypeChange = (e) => {
    const newAccountType = e?.target?.value ?? e; // Update account type based on dropdown selection
    setAccountType(newAccountType);
    setAccountSelected(true); // Mark account as selected
    if (newAccountType === "I" && ndiData) {
      setOpen(true); // Open payment gateway directly for Individual
    }
  };
  const handleCidChange = (e) => {
    setCidNo(e?.target?.value ?? e); // Update CID number
  };
  const handleDisnChange = (e) => setDisnNo(e?.target?.value ?? e); // Update DISN number
  if(paymentSuccess){
    // console.log("page", orderNo)
  }
  const fetchData = async () => {
    if (accountType === "I" && !ndiData?.idNumber && !cidNo) {
      toast({
        description: "Please provide CID via NDI or manual input",
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
      const apiURL = `${process.env.NEXT_PUBLIC_API_URL}/checkshareExistNew?${accountType === "I" ? `cidNo=${cidNo}` : `cidNo=${disnNo}`}&accType=${accountType}`;

      const response = await fetch(apiURL);
      const data = await response.json();

      if (data.status === 200) {
        setPhone(data.phone || "");
        setEmail(data.email || "");
        setFieldsVisible(true);
        setFetched(true);
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
      cidNo: accountType === "I" ? (ndiData?.idNumber || cidNo) : disnNo,
      phoneNo: phone,
      otpNo: otp,
    };

    try {

      const url = `${process.env.NEXT_PUBLIC_API_URL}/verify_otp_for_sharestatement`; // API URL for OTP verification
      const body = JSON.stringify(stmnt);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      });

      const data = await response.json();

      if (data.status === 200) {
         // Mark OTP as verified

        toast({
          description: data.message,

        });
        setOpen(true); // Open payment gateway drawer
      }else if(data.status == 400){
        setOpen(false);
        toast({
          description: data.message ,
          variant: "destructive",
        });
      } 
      else {
     
        toast({
          description: data.message ,
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
  const afterBankInsert = async () => {

    const stmnt = {
      cidNo: accountType === "I" ? (ndiData?.idNumber || cidNo) : disnNo,
      phoneNo: phone,
      email: email,
      amount: amount,
      orderNo: orderNo,
    };

    try {

      const url = `${process.env.NEXT_PUBLIC_API_URL}/insert_into_database`; // API URL for OTP verification
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
        // toast({
        //   description: data.message,

        // });
        setOpen(true); // Open payment gateway drawer
      } 
      // else {
      //   toast({
      //     description: data.message ,
      //     variant: "destructive",
      //   });
      // }
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
      cidNo: accountType === "I" ? (ndiData?.idNumber || cidNo) : disnNo, // ✅ Fallback
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
  useEffect(() => {
    if (ndiData && ndiSuccess) {
      setCidNo(ndiData.idNumber); // Auto-fill CID when NDI succeeds
      setFetched(true);
      setOpen(true);
    }
  }, [ndiData, ndiSuccess]);
  useEffect(() => {
    if (orderNo?.startsWith("SS")) {
      afterBankInsert();
    }
  }, [orderNo]); // Runs whenever orderNo changes
  
  useEffect(() => {
    if (paymentSuccess && orderNo) {
      setOpen(false); // Close the drawer when payment is successful and order number is set
    }
  }, [paymentSuccess, orderNo]);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-6">
     {!paymentSuccess && !orderNo && (
 <Card>
        <CardHeader>
        <CardTitle>Online Share Statement</CardTitle>
        <CardDescription>Enter your details to proceed</CardDescription>
      </CardHeader>
    <CardContent className="">
    <Label>Account Type</Label>
    <Select value={accountType} onValueChange={handleAccountTypeChange} disabled={fetched}>
      <SelectTrigger className="w-full mb-3">
        <SelectValue placeholder="Select Account Type" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="I">Individual</SelectItem>
        <SelectItem value="J">Corporate/Association</SelectItem>
      </SelectContent>
    </Select>

    {accountType === "I" && (
  <>
    <Label>CID No</Label>
    <div className="flex gap-2 mb-3">
      <Input
        className="flex-1"
        placeholder="Enter CID number"
        value={cidNo}
        onChange={handleCidChange}
        disabled={fetched} 
      />
      {/* <BhutanNDIComponent
        btnText="Fetch via NDI"
        setNdiSuccess={setNdiSuccess}
        setNdiData={setNdiData}
      /> */}
    </div>
  </>
)}
    {accountType === "J" && (
      <><Label>DISN No</Label><Input className="mb-3"placeholder="Enter DISN number" value={disnNo} onChange={handleDisnChange} /></>
    )}


    {fieldsVisible && !paymentSuccess && (
      <>
      <Label>Phone No</Label>
      <Input className="mb-3"placeholder="Phone number" value={phone} onChange={(e) => setPhone(e.target.value)}    disabled={fetched}/>
      <Label>Email</Label>
      <Input className="mb-3"placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}  disabled={fetched} />
    </>
    )}

    {fieldsVisible && otpVerified && !paymentSuccess && (
      <>
      <Label>RSEB OTP</Label>
      <Input className="mb-3" placeholder="OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
    </>
    )}
      </CardContent>
      <CardFooter className="flex justify-center flex-col items-center gap-2">
  {!accountSelected ? (
    <p className="text-sm text-gray-500">Please select account type first</p>
  ) : (
    <>
      <Button
        variant="outline"
        size="lg"
        className="my-1 w-full max-w-xs"
        onClick={fieldsVisible ? (otpVerified ? verifyOtp : handleSubmit) : fetchData}
        disabled={loading}
      >
        {loading ? (
          fieldsVisible ? (
            otpVerified ? "Verifying OTP..." : "Sending OTP..."
          ) : "Fetching..."
        ) : fieldsVisible ? (
          otpVerified ? "Verify OTP" : "Send OTP"
        ) : "Fetch"}
      </Button>

      {!fieldsVisible && accountType === "I" && (
        <>
      <div className="flex items-center w-full max-w-xs">
        <div className="flex-grow border-t border-gray-300 dark:border-white"></div>
        <span className="mx-2 text-sm text-gray-500 dark:text-white">OR</span>
        <div className="flex-grow border-t border-gray-300 dark:border-white"></div>
      </div>


          <BhutanNDIComponent
            btnText="Receive Credentials"
            setNdiSuccess={(success) => {
              setNdiSuccess(success);
              if (success) setOpen(true);
            }}
            setNdiData={setNdiData}
          />
        </>
      )}
    </>
  )}
</CardFooter>
    </Card>
)     }
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
            <div className="h-[290px]">
              <PaymentGateway service_code={"SS"} setPaymentSuccess={setPaymentSuccess} setOrderNo ={setOrderNo} setAmount={setAmount} MERCHANT_CHECKOUT_URL={"http://localhost:3000/ourservices/online-share-statement"}/>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
