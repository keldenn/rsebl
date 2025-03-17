'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import PaymentGateway from '../components/PaymentGateway';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from '@/components/ui/label';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import BhutanNDIComponent from "@/components/ndi/ndi-modal"; // Import Bhutan NDI Component

export default function Page() {
  const [cid, setCid] = useState('');
  const [selectedBroker, setSelectedBroker] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [orderNo, setOrderNo] = useState();
  const [amount, setAmount] = useState();
  const [open, setOpen] = useState(false);
  const [renewopen, setRenewOpen] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    cd_code: "",
    user_name: "",
  });
  const [userDetailsRenew, setUserDetailsRenew] = useState({
    name: "",
    cid: "",
    phone: "",
    email: "",
    address: "",
    client_code: "",
    username: "",
    participant_code: ""
  });
  const [username, setUsername] = useState('');
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [isCheckboxCheckedRenew, setIsCheckboxCheckedRenew] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [detailsError, setDetailsError] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [brokerageFirms, setBrokerageFirms] = useState();
  const [ndiSuccess, setNdiSuccess] = useState(false); // State for NDI success
  const [ndiData, setNdiData] = useState(); // State for NDI data

  const { toast } = useToast();

  // Fetch user details after NDI verification
  const handleFetchDetails = async () => {
    if (!ndiData || !ndiData.idNumber) {
      toast({
        title: "Error",
        description: "CID number is required.",
        variant: "destructive",
      });
      return;
    }

    if (!selectedBroker) {
      toast({
        description: "Please select a brokerage firm.",
        variant: "destructive",
      });
      return;
    }

    setDetailsError(null);
    setDetailsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/getUserDetails?cidNo=${ndiData.idNumber}&broker=${selectedBroker}`
      );
      const data = await response.json();

      if (data.status === "400" && data.message === "Please open a CD account with the selected Brokerage Firm.") {
        toast({
          description: "Please open a CD account with the selected Brokerage Firm.",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      } else if (data.status === "200" && data.data.length > 0) {
        const user = data.data[0];
        setUserDetails({
          name: `${user.f_name} ${user.l_name}`,
          phone: user.phone || "Not Available",
          email: user.email || "Not Available",
          address: user.address || "Not Available",
          cd_code: user.cd_code || "Not Available",
          user_name: user.user_name || "Not Available"
        });
        toast({
          description: "This is the email registered with Broker, please update if it is incorrect.",
        });
      } else if (data.status === "100" && data.message === "The mCaMS account already exists with the chosen Brokerage Firm.") {
        toast({
          description: "The mCaMS account already exists with the chosen Brokerage Firm.",
          variant: "destructive",
        });
      } else {
        toast({
          description: "No user details found for the provided CID and Brokerage firm.",
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        description: "Failed to fetch user details. Please try again.",
        variant: "destructive",
      });
    } finally {
      setDetailsLoading(false);
    }
  };

  // Handle final submission (skip OTP and proceed to payment)
  const handleFinalSubmit = () => {
    if (!isCheckboxChecked) {
      toast({
        description: "Please agree to the terms and conditions before submitting.",
        variant: "destructive",
      });
      return;
    }

    // Open the payment drawer
    setOpen(true);
  };

  // Handle payment success
  useEffect(() => {
    if (paymentSuccess && orderNo) {
      const payload = {
        orderNo: orderNo,
        cidNo: ndiData.idNumber,
        cd_code: userDetails.cd_code,
        broker: selectedBroker,
        name: userDetails.name,
        phoneNo: userDetails.phone,
        email: userDetails.email,
        address: userDetails.address,
        declaration: true,
        userName: userDetails.user_name,
        status: "SUB",
        fee: amount,
      };

      const submitPaymentSuccess = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/paymentSuccessOT`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          });

          const data = await response.json();

          if (response.ok && data.status === '200') {
            toast({
              description: "Payment processed successfully.",
              variant: "success",
            });
          } else {
            toast({
              description: data.message || "Failed to process payment.",
              variant: "destructive",
            });
          }
        } catch (err) {
          toast({
            description: "An error occurred while processing the payment.",
            variant: "destructive",
          });
        }
      };

      submitPaymentSuccess();
      setOpen(false); // Close the drawer after payment
    }
  }, [paymentSuccess, orderNo]);

  // Fetch brokerage firms
  useEffect(() => {
    const fetchBrokerageFirms = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/getBrokerList`
        );
        if (!response.ok) throw new Error("Failed to fetch brokerage firms");
        const data = await response.json();
        setBrokerageFirms(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBrokerageFirms();
  }, []);

  const handleFetchDetailsRenew = async () => {
    if (!username) {
      toast({
        description: "Please enter your username",
        variant: "destructive",
      });
      return;
    }
    setDetailsError(null);
    setDetailsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/getUserDetailsByUsername?userName=${username}`
      );
      const data = await response.json();
  
      if (data.status === "100" && data.message === "Please enter a valid username.") {
        toast({
          description: "Please enter a valid username.",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      } else if (data.status === "200" && data.data.length > 0) {
        const user = data.data[0];
        setUserDetailsRenew({
          name: user.name || "Not Avaliable",
          phone: user.phone || "Not Available",
          email: user.email || "Not Available",
          address: user.address || "Not Available",
          client_code: user.client_code || "Not Available",
          username: user.username || "Not Avaliable",
          cid: user.cid || "Not Avaliable",
          participant_code: user.participant_code || "Not Avaliable"
        });
        toast({
          description: "This is the email registered with Broker, please update if it is incorrect.",
        });
        
      }else if (data.status === "100" && data.message === "Your mCaMS account is still active. Cannot renew before expires."){
        toast({
          description: "Your mCaMS account is still active. Cannot renew before expires.",
          variant: "destructive",
        });
      }
      
      else {
        //setDetailsError("No user details found for the provided username.");
        toast({
          description: "No user details found for the provided username.",
          variant: "destructive",
        });
      }
    } catch (err) {
      //setDetailsError("Failed to fetch user details. Please try again.");
      toast({
        description: "Failed to fetch user details. Please try again.",
        variant: "destructive",
      });
    } finally {
      setDetailsLoading(false);
    }
  };
  const handleFinalSubmitRenew = () => {
    if (!isCheckboxCheckedRenew) {
      toast({
        description: "Please agree to the terms and conditions before submitting.",
        variant: "destructive",
      });
      return;
    }
  
    // Open the drawer first (no API call yet)
    setRenewOpen(true);
  };
  
  useEffect(() => {
    if (renewopen && orderNo) { // Ensure orderNo is available
      const submitUserDetailsRenew = async () => {
        const payload = {
          cidNo: cid,
          address: userDetailsRenew.address,
          cdCode: userDetailsRenew.client_code,
          declaration: true,
          email: userDetailsRenew.email,
          fee: 500,
          name: userDetailsRenew.name,
          phoneNo: userDetailsRenew.phone,
          userName: userDetailsRenew.username,
          orderNo: orderNo, // Add the orderNo here to be passed to the backend
        };
  
        console.log(payload);
  
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/submitFormCaMSRenewalNew`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(payload),
            }
          );
  
          const data = await response.json();
  
          if (response.ok && data.status === "200") {
          } else {
            toast({
              description: data.message || "Failed to submit application. Please try again.",
              variant: "destructive",
            });
          }
        } catch (err) {
          toast({
            description: "An error occurred while submitting the application. Please try again.",
            variant: "destructive",
          });
        }
      };
  
      // Trigger the submission when the drawer opens and orderNo is set
      submitUserDetailsRenew();
    }
  }, [renewopen, orderNo]);

  return (
    <div className="p-6 md:p-8 rounded-xl border bg-card text-card-foreground shadow">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Mobile App Mockup */}
        <div className="flex justify-center items-center">
          <Image
            src="/images/mcams-removebg-preview.png"
            alt="Mobile App Mockup"
            width={350}
            height={700}
            className="rounded-lg transform rotate-3"
          />
        </div>

        {/* Text Section */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <h1 className="text-4xl font-bold text-custom-1 dark:text-white">m-CaMS</h1>
          <h2 className="text-2xl font-bold my-4">Trading on your fingertips</h2>
          <ul className="text-lg space-y-3 mb-6">
            <li>✔ Order Manager</li>
            <li>✔ Executed Orders</li>
            <li>✔ Market</li>
            <li>✔ Listed Companies</li>
            <li>✔ And many more...</li>
          </ul>
          <div className="flex flex-wrap justify-center lg:justify-start gap-4">
            <a href="https://play.google.com/store/apps/details?id=mcmsrseb.rsebl.org.mcms_rseb" target="_blank" rel="noopener noreferrer">
              <Image src="/images/apl.png" alt="App Store Badge" width={150} height={50} />
            </a>
            <a href="https://apps.apple.com/us/app/mcams/id1457797916" target="_blank" rel="noopener noreferrer">
              <Image src="/images/gpl.png" alt="Google Play Badge" width={150} height={50} />
            </a>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mt-6">
        {/* Register Section */}
        <div className="flex-1">
          {!orderNo && (
            <Card>
              <CardHeader>
                <CardTitle className='flex justify-center text-lg'>Register For mCaMs</CardTitle>
                <CardDescription className='flex justify-center text-base'>Trading on your fingertips</CardDescription>
              </CardHeader>
              <CardContent>
                {!ndiSuccess && (
                  <BhutanNDIComponent
                    btnText={"Register with Bhutan NDI"}
                    setNdiSuccess={setNdiSuccess}
                    setNdiData={setNdiData}
                  />
                )}

                {ndiSuccess && ndiData && (
                  <>
                    <Input
                      placeholder="Enter your CID number"
                      type="number"
                      value={ndiData.idNumber}
                      disabled
                      className="mb-4"
                    />
                    <Select onValueChange={setSelectedBroker} value={selectedBroker}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Brokerage Firm" />
                      </SelectTrigger>
                      <SelectContent>
                        {brokerageFirms && brokerageFirms.map((firm) => (
                          <SelectItem key={firm.participant_id} value={firm.participant_code}>
                            {firm.name || firm.participant_code}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button className="w-full mt-4" variant={'outline'} onClick={handleFetchDetails}>
                      Fetch Details
                    </Button>
                    {userDetails.name && (
                      <>
                        <Label>Name:</Label>
                        <Input className="w-full border p-2 my-2" value={userDetails.name} disabled />
                        <Label>Phone Number:</Label>
                        <Input className="w-full border p-2 my-2" value={userDetails.phone} disabled />
                        <Label>Email:</Label>
                        <Input className="w-full border p-2 my-2" value={userDetails.email} disabled />
                        <Label>Address:</Label>
                        <Input className="w-full border p-2 my-2" value={userDetails.address} disabled />
                        <div className="flex items-center space-x-2 mt-4">
                          <Checkbox
                            checked={isCheckboxChecked}
                            onCheckedChange={setIsCheckboxChecked}
                            id="terms"
                          />
                          <Label
                            htmlFor="terms"
                            className="text-xs leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            I agree to the <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                              terms and conditions
                            </a>{" "} of RSEB for processing Online Terminal.
                          </Label>
                        </div>
                        <Button className="w-full mt-4" variant={'outline'} onClick={handleFinalSubmit}>
                          Submit
                        </Button>
                      </>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          )}

          {/* Payment Drawer */}
          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerContent>
              <div className="mx-auto w-full max-w-lg p-5 p-0-md">
                <DrawerHeader className="m-0 px-0 flex flex-col justify-center items-center">
                  <DrawerTitle>Payment Portal</DrawerTitle>
                  <DrawerDescription>Royal Securities Exchange of Bhutan</DrawerDescription>
                </DrawerHeader>
                <div className="h-[290px]">
                  <PaymentGateway
                    service_code={"OT"}
                    setPaymentSuccess={setPaymentSuccess}
                    setOrderNo={setOrderNo}
                    setAmount={setAmount}
                    MERCHANT_CHECKOUT_URL={"http://localhost:3000/ourservices/m-cams"}
                  />
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </div>

        {/* Renew Section */}
        <div className="flex-1">
          {!orderNo && (
            <Card>
              <CardHeader>
                <CardTitle className='flex justify-center'>Renew my mCaMs account</CardTitle>
              </CardHeader>
              <CardContent>
                <Input placeholder="Enter your Username" value={username} onChange={(e) => setUsername(e.target.value)} className="mb-4" />
                <Button className="w-full" variant={'outline'} onClick={handleFetchDetailsRenew}>Fetch Details</Button>
                {userDetailsRenew.name && (
                  <>
                    <Label>Name:</Label>
                    <Input className="w-full border p-2 my-2" value={userDetailsRenew.name} disabled />
                    <Label>CID:</Label>
                    <Input className="w-full border p-2 my-2" value={userDetailsRenew.cid} disabled />
                    <Label>CD Code:</Label>
                    <Input className="w-full border p-2 my-2" value={userDetailsRenew.client_code} disabled />
                    <Label>Phone Number:</Label>
                    <Input className="w-full border p-2 my-2" value={userDetailsRenew.phone} disabled />
                    <Label>Email:</Label>
                    <Input className="w-full border p-2 my-2" value={userDetailsRenew.email} disabled />
                    <div className="flex items-center space-x-2 mt-4">
                      <Checkbox
                        checked={isCheckboxCheckedRenew}
                        onCheckedChange={setIsCheckboxCheckedRenew}
                        id="terms"
                      />
                      <Label
                        htmlFor="terms"
                        className="text-xs leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        I agree to the <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                          terms and conditions
                        </a>{" "} of RSEB for processing Online Terminal.
                      </Label>
                    </div>
                    <Button className="w-full mt-4" variant={'outline'} onClick={handleFinalSubmitRenew}>Submit</Button>
                  </>
                )}
              </CardContent>
            </Card>
          )}

          {/* Renew Payment Drawer */}
          <Drawer open={renewopen} onOpenChange={setRenewOpen}>
            <DrawerContent>
              <div className="mx-auto w-full max-w-lg p-5 p-0-md">
                <DrawerHeader className="m-0 px-0 flex flex-col justify-center items-center">
                  <DrawerTitle>Payment Portal</DrawerTitle>
                  <DrawerDescription>Royal Securities Exchange of Bhutan</DrawerDescription>
                </DrawerHeader>
                <div className="h-[290px]">
                  <PaymentGateway
                    service_code={"OR"}
                    setPaymentSuccess={setPaymentSuccess}
                    setOrderNo={setOrderNo}
                    setAmount={setAmount}
                    MERCHANT_CHECKOUT_URL={"http://localhost:3000/ourservices/m-cams"}
                  />
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </div>
  );
}