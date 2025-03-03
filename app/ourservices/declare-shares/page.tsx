"use client";

import { fetchShareDeclarations } from "@/lib/yahoo-finance/fetchShareDeclaration";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PaymentGateway from "../components/PaymentGateway";
import html2canvas from 'html2canvas';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { format, isAfter } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function SharesDeclaration() {
  const [date, setDate] = useState<Date | undefined>();
  const [cid, setCid] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [showOtpField, setShowOtpField] = useState(false)
  const [open, setOpen] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [orderNo, setOrderNo] = useState();
  const [amount, setAmount] = useState();
  const [downloading, setDownloading] = useState(false)

  const { toast } = useToast();

  const validateAndProceed = async () => {
    if (!date || !cid) {
      toast({
        title: "Error",
        description: "Both date and CID number are required.",
        variant: "destructive",
      });
      return;
    }
  
    if (cid.length !== 11) {
      toast({
        title: "Error",
        description: "CID should be exactly 11 digits",
        variant: "destructive",
      });
      return;
    }
  
    if (isAfter(date, new Date())) {
      toast({
        title: "Error",
        description: "Date cannot be in the future.",
        variant: "destructive",
      });
      return;
    }
  
    try {
      // Wait for user details before sending OTP
      await fetchUserContactDetails();
      return toast({
        title: "Success",
        description: "OTP send successfully",
      });
    } catch (error) {
      console.error("Validation error:", error);
    }
  };
  
  // useEffect(() => {
  //   if (userDetails && showOtpField) {
  //     sendOtpOperation();
  //   }
  // }, [userDetails, showOtpField]);
  
  async function sendOtpOperation(data) {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/sendOtpOperation`;
    const body = JSON.stringify({
      cidNo: cid,
      phoneNo: data?.phone,
      email: data?.email,
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
        setShowOtpField(true);
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
      cidNo: cid,
      phoneNo: userDetails?.phone,
      email: userDetails?.email,
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
      console.log(data);
      if (data.status === 200) {
        setOtpVerified(true);
        toast({
          title : "Success",
          description: data.message,
          duration: 1000
        });
        handleSubmit();
        setLoading(false);
      }
      else if(data.status == 400){
        setOpen(false);
        toast({
          description: data.message ,
          variant: "destructive",
        });
        setLoading(false);
      } 
      else {
     
        toast({
          description: data.message ,
          variant: "destructive",
        });
        setLoading(false);
      }

    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast({
        description: "Error verifying OTP. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setOpen(true); 
    setConfirmDialog(false);
    if(paymentSuccess && paymentSuccess == true){
      const formattedDate = format(date, "yyyy-MM-dd");
      const data = await fetchShareDeclarations(cid, formattedDate);
      if (!data || data.length === 0) {
        toast({
          title: "Error",
          description: "No share holding data available",
          variant: "destructive",
        });
        return;
      }
      setOpen(true);
      setHoldings(data);
      setLoading(false);
    }
    
  };
  // useEffect(() => {
  //   if (paymentSuccess && orderNo) {
  //     setOpen(false); // Close the drawer when payment is successful
  //     const formattedDate = format(date, "yyyy-MM-dd");
  
  //     fetchShareDeclarations(cid, formattedDate).then((data) => {
  //       if (!data || data.length === 0) {
  //         toast({
  //           title: "Error",
  //           description: "No share holding data available",
  //           variant: "destructive",
  //         });
  //         return;
  //       }
  //       setHoldings(data);
  //       console.log('data:', data);
  //       setLoading(false);
  //     });
  //   }
  // }, [paymentSuccess, orderNo]);

  useEffect(() => {
    if (paymentSuccess && orderNo) {
      setOpen(false); // Close the drawer when payment is successful
      const formattedDate = format(date, "yyyy-MM-dd");
  
      fetchShareDeclarations(cid, formattedDate).then(async (data) => {
        if (!data || data.length === 0) {
          toast({
            title: "Error",
            description: "No share holding data available",
            variant: "destructive",
          });
          return;
        }
  
        setHoldings(data);
        setLoading(false);
  
        // Prepare data for API
        const payloadACC = {
          name: `${data[0].f_name} ${data[0].l_name}`,  // Combine first and last name
          identity: data[0].ID,                      // ID as identity
          totalnumber: data[0].total_vol,            // Total volume
          companyname: data[0].symbol_name           // Symbol name
        };
        console.log(payloadACC);
  
        try {
          const response = await fetch("https://adsndi.itechnologies.cloud/api/push-data/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payloadACC),
          });
  
          const result = await response.json();
          console.log("API Response:", result);
        } catch (error) {
          console.error("Error posting data:", error);
        }
      });
    }
  }, [paymentSuccess, orderNo]);
  

  const downloadStatement = () => {
    setDownloading(true);
    const input = document.getElementById("pdf-content");
  
    if (!input) {
      toast({
        title: "Error",
        description: "Report content not found.",
        variant: "destructive",
        duration: 5000,
      });
      setDownloading(false);
      return;
    }
  
    const originalWidth = input.style.width;
    input.style.width = "1228px"; // Simulate a larger screen width
  
    document.fonts.ready.then(() => {
      return html2canvas(input, {
        scale: 2,
        useCORS: true,
        allowTaint: false,
        backgroundColor: "#FFFFFF",
        logging: true, // Debugging
      });
    })
      .then((canvas) => {
        if (!canvas) {
          throw new Error("Canvas is null or not created.");
        }
  
        const imgData = canvas.toDataURL("image/png");
  
        if (imgData.length < 5000) {
          throw new Error("Generated PNG is too small, possibly corrupt.");
        }
  
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: "a4",
        });
  
        const imgWidth = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
  
        const clientID = cid || "unknown-cid";
        const formattedDate = date instanceof Date ? format(date, "yyyy-MM-dd") : new Date().toISOString().split("T")[0];
  
        const filename = `Shares_Declaration_${clientID}_${formattedDate}.pdf`;
        pdf.save(filename);
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
        toast({
          title: "Error",
          description: "Failed to generate the statement. Try again.",
          variant: "destructive",
          duration: 5000,
        });
      })
      .finally(() => {
        input.style.width = originalWidth;
        setDownloading(false);
      });
  };
  
  
  const fetchUserContactDetails = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/get-user-details-acc`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cid }),
        }
      );

      const data = await response.json();

      if (data.status === "200") {

        setUserDetails(data.data);
        sendOtpOperation(data.data);
        //console.log('data', userDetails.name)
      } else {
        toast(data.message);
      }
   
    } catch (err) {
      toast(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full flex flex-col justify-between items-center p-6 ">
      {!orderNo && (
      <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl text-center">Shares Declaration</CardTitle>
        <CardDescription className="text-center">Enter details to proceed declaring your holdings</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="date">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="cid">CID Number</Label>
              <Input
                type="number"
                id="cid"
                placeholder="Enter CID Number"
                value={cid}
                onChange={(e) => setCid(e.target.value)}
              />
            </div>
          {
            showOtpField && (
              <>
                              <div className="flex flex-col space-y-1.5">
              <Label htmlFor="otp">RSEB OTP</Label>
              <Input id="otp" type="number" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
            </div>
            <Button onClick={verifyOtp} disabled={loading}>Verify OTP</Button>
            
              </>

            )
          }

          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end">
        {/* <Button variant="outline" disabled={loading}>Cancel</Button> */}
        {!showOtpField && (
    <Button onClick={validateAndProceed} disabled={loading}>
    {loading ? "Verifying..." : "Verify"}
  </Button>
        )}
  
      </CardFooter>
      </Card>
      )
      }


      {paymentSuccess && orderNo &&(
        <Card className="mt-4 w-full mx-auto shadow-lg rounded-xl py-2" >

          <CardContent id="pdf-content">
          
          <CardHeader className="flex flex-row justify-center">
            <div className="flex justify-center items-center">  <svg
                xmlns="http://www.w3.org/2000/svg"
                width={113}
                height={40}
                viewBox="0 0 153 138"
                fill="none"
              >
                <path
                  d="M87.4225 91.3752L65.3705 70.9525C64.0985 69.7752 64.0985 67.8659 65.3705 66.6885L126.916 9.6912C128.187 8.51387 130.248 8.51387 131.518 9.6912L193.064 66.6885C194.336 67.8659 194.336 69.7752 193.064 70.9525L131.518 127.95C130.248 129.127 128.187 129.127 126.916 127.95L111.918 114.062"
                  // stroke="#205A8A"
                  className="stroke-[#205A8A] dark:stroke-white"
                  strokeWidth="16.6253"
                  strokeMiterlimit={10}
                />
                <mask
                  id="mask0_2363_2582"
                  style={{ maskType: "luminance" }}
                  maskUnits="userSpaceOnUse"
                  x={0}
                  y={1}
                  width={147}
                  height={137}
                >
                  <path d="M0 0.999996H146.227V137.652H0V0.999996Z" fill="white" />
                </mask>
                <g mask="url(#mask0_2363_2582)">
                  <path
                    d="M114.908 46.7712L136.96 67.1939C138.232 68.3712 138.232 70.2805 136.96 71.4579L75.4147 128.455C74.1441 129.633 72.0827 129.633 70.8121 128.455L9.26674 71.4579C7.99474 70.2805 7.99474 68.3712 9.26674 67.1939L70.8121 10.1965C72.0827 9.01921 74.1441 9.01921 75.4147 10.1965L90.4121 24.0845"
                    // stroke="#382E7A"
                    className="stroke-[#382E7A] dark:stroke-white"
                    strokeWidth="16.6253"
                    strokeMiterlimit={10}
                  />
                </g>
              </svg></div>
            <div>
            <h3 className="text-center text-xl font-bold mb-2">
              Royal Securities Exchange of Bhutan
            </h3>
             <p className=" text-gray-500 text-sm mb-4">
              Report generated on: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
            </p>
            </div>
        
          </CardHeader>
            
            <div className="bg-gray-100 p-4 rounded-lg mb-6">
              <p className="text-sm font-medium">CID/DISN/CD CODE: <span className="font-semibold">{holdings[0]?.ID}</span></p>
              <p className="text-sm font-medium">NAME: <span className="font-semibold">{holdings[0]?.f_name} {holdings[0]?.l_name}</span></p>
              <p className="text-sm font-medium">Email: <span className="font-semibold">{holdings[0]?.email}</span></p>
              <p className="text-sm font-medium">Phone: <span className="font-semibold">{holdings[0]?.phone}</span></p>
            </div>
            
            <Table className="w-full border rounded-lg overflow-hidden">
              <TableHeader className="bg-custom-1 ">
                <TableRow>
                  <TableHead className="text-left text-white px-4 py-2">Sl#</TableHead>
                  <TableHead className="text-left text-white px-4 py-2">Symbol</TableHead>
                  <TableHead className="text-left text-white px-4 py-2">Total Volume</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {holdings.map((holding, index) => (
                  <TableRow key={index} className="border-b hover:bg-gray-100">
                    <TableCell className="px-4 py-2">{index + 1}</TableCell>
                    <TableCell className="px-4 py-2">{holding.symbol_name}</TableCell>
                    <TableCell className="px-4 py-2 font-semibold">{holding?.total_vol}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            <hr className="my-6" />
            <p className="text-center text-sm text-gray-500">
              THIS IS A COMPUTER-GENERATED REPORT AND REQUIRES NO SIGNATORY
            </p>
          
          </CardContent>

          <div className="hidden w-[1228px] mx-auto">
          <CardContent id="pdf-content-lg">
          
          <CardHeader className="flex flex-row justify-center">
            <div className="flex justify-center items-center">  <svg
                xmlns="http://www.w3.org/2000/svg"
                width={113}
                height={40}
                viewBox="0 0 153 138"
                fill="none"
              >
                <path
                  d="M87.4225 91.3752L65.3705 70.9525C64.0985 69.7752 64.0985 67.8659 65.3705 66.6885L126.916 9.6912C128.187 8.51387 130.248 8.51387 131.518 9.6912L193.064 66.6885C194.336 67.8659 194.336 69.7752 193.064 70.9525L131.518 127.95C130.248 129.127 128.187 129.127 126.916 127.95L111.918 114.062"
                  // stroke="#205A8A"
                  className="stroke-[#205A8A] dark:stroke-white"
                  strokeWidth="16.6253"
                  strokeMiterlimit={10}
                />
                <mask
                  id="mask0_2363_2582"
                  style={{ maskType: "luminance" }}
                  maskUnits="userSpaceOnUse"
                  x={0}
                  y={1}
                  width={147}
                  height={137}
                >
                  <path d="M0 0.999996H146.227V137.652H0V0.999996Z" fill="white" />
                </mask>
                <g mask="url(#mask0_2363_2582)">
                  <path
                    d="M114.908 46.7712L136.96 67.1939C138.232 68.3712 138.232 70.2805 136.96 71.4579L75.4147 128.455C74.1441 129.633 72.0827 129.633 70.8121 128.455L9.26674 71.4579C7.99474 70.2805 7.99474 68.3712 9.26674 67.1939L70.8121 10.1965C72.0827 9.01921 74.1441 9.01921 75.4147 10.1965L90.4121 24.0845"
                    // stroke="#382E7A"
                    className="stroke-[#382E7A] dark:stroke-white"
                    strokeWidth="16.6253"
                    strokeMiterlimit={10}
                  />
                </g>
              </svg></div>
            <div>
            <h3 className="text-center text-xl font-bold mb-2">
              Royal Securities Exchange of Bhutan
            </h3>
             <p className=" text-gray-500 text-sm mb-4">
              Report generated on: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
            </p>
            </div>
        
          </CardHeader>
            
            <div className="bg-gray-100 p-4 rounded-lg mb-6">
              <p className="text-sm font-medium">CID/DISN/CD CODE: <span className="font-semibold">{holdings[0]?.ID}</span></p>
              <p className="text-sm font-medium">NAME: <span className="font-semibold">{holdings[0]?.f_name} {holdings[0]?.l_name}</span></p>
              <p className="text-sm font-medium">Email: <span className="font-semibold">{holdings[0]?.email}</span></p>
              <p className="text-sm font-medium">Phone: <span className="font-semibold">{holdings[0]?.phone}</span></p>
            </div>
            
            <Table className="w-full border rounded-lg overflow-hidden">
              <TableHeader className="bg-custom-1 ">
                <TableRow>
                  <TableHead className="text-left text-white px-4 py-2">Sl#</TableHead>
                  <TableHead className="text-left text-white px-4 py-2">Symbol</TableHead>
                  <TableHead className="text-left text-white px-4 py-2">Total Volume</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {holdings.map((holding, index) => (
                  <TableRow key={index} className="border-b hover:bg-gray-100">
                    <TableCell className="px-4 py-2">{index + 1}</TableCell>
                    <TableCell className="px-4 py-2">{holding.symbol_name}</TableCell>
                    <TableCell className="px-4 py-2 font-semibold">{holding?.total_vol}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            <hr className="my-6" />
            <p className="text-center text-sm text-gray-500">
              THIS IS A COMPUTER-GENERATED REPORT AND REQUIRES NO SIGNATORY
            </p>
          
          </CardContent>
          </div>
          <CardFooter  className="flex justify-end">
  
              <Button variant={"outline"} onClick={downloadStatement}>Download Statement</Button>
      
          </CardFooter>
        </Card>
      )}
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
            <PaymentGateway service_code={"DS"} setPaymentSuccess={setPaymentSuccess} setOrderNo ={setOrderNo} setAmount={setAmount}  MERCHANT_CHECKOUT_URL={"http://localhost:3000/ourservices/declare-shares"}/>
          </div>
        </div>
      </DrawerContent>
      </Drawer>
    </div>
  );
}
