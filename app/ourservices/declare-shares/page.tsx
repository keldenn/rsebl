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
import BhutanNDIComponent from "@/components/ndi/ndi-modal";

export default function SharesDeclaration() {
  const [date, setDate] = useState<Date | undefined>();
  const [cid, setCid] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [showOtpField, setShowOtpField] = useState(false);
  const [open, setOpen] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [orderNo, setOrderNo] = useState();
  const [amount, setAmount] = useState();
  const [downloading, setDownloading] = useState(false);
  const [ndiSuccess, setNdiSuccess] = useState(false);
  const [ndiData, setNdiData] = useState();
  const [useNDI, setUseNDI] = useState(true); // State to track authentication method

  const { toast } = useToast();

  const validateAndProceed = async () => {
    if (!date) {
      toast({
        title: "Error",
        description: "Date is required.",
        variant: "destructive",
      });
      return;
    }

    if (useNDI) {
      // NDI validation
      if (!ndiData || !ndiData.idNumber) {
        toast({
          title: "Error",
          description: "CID number is required.",
          variant: "destructive",
        });
        return;
      }

      if (ndiData.idNumber.length !== 11) {
        toast({
          title: "Error",
          description: "CID should be exactly 11 digits",
          variant: "destructive",
        });
        return;
      }
    } else {
      // OTP validation
      if (!cid) {
        toast({
          title: "Error",
          description: "CID number is required.",
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
      if (useNDI) {
        await handleSubmit();
      } else {
        await fetchUserContactDetails();
      }
    } catch (error) {
      console.error("Validation error:", error);
    }
  };

  useEffect(() => {
    if (ndiSuccess && ndiData) {
      setCid(ndiData.idNumber);
    }
  }, [ndiSuccess, ndiData]);

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
        toast({
          title: "Success",
          description: "OTP sent successfully",
        });
        return data;
      } else if (response.status === 204) {
        toast({
          title: "Error",
          description: "No share holding data available",
          variant: "destructive"
        });
      } else {
        throw new Error(data.message || "Error sending OTP");
      }
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  const verifyOtp = async () => {
    if (!otp) {
      toast({
        description: "Please enter the OTP.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    const stmnt = {
      cidNo: cid,
      phoneNo: userDetails?.phone,
      email: userDetails?.email,
      otpNo: otp,
    };

    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/verify_otp_for_sharestatement`;
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
        setOtpVerified(true);
        toast({
          title: "Success",
          description: data.message,
          duration: 1000
        });
        handleSubmit();
      } else if (data.status == 400) {
        setOpen(false);
        toast({
          description: data.message,
          variant: "destructive",
        });
      } else {
        toast({
          description: data.message,
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
    setLoading(true);

    const formattedDate = format(date, "yyyy-MM-dd");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/check-client-holdings/${cid}/${formattedDate}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      setOpen(true);
      const data = await response.json();
      setHoldings(Array.isArray(data) ? data : [data]);

      const holding = data;

      const payload = {
        cidNo: holding.cidNo,
        date: holding.date,
        phoneNo: holding.phone,
        email: holding.email,
        amount: amount,
        status: 0,
        orderNo: orderNo,
      };

      if ((orderNo !== undefined && orderNo !== null) && (amount !== undefined && amount !== null)) {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/insert-share-data`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });

          const result = await response.json();

          if (response.status === 200) {
            toast({
              title: "Success",
              description: result.message || "Data inserted successfully.",
            });
          } else {
            toast({
              title: "Error",
              description: result.message || "Failed to insert data.",
              variant: "destructive",
            });
          }
        } catch (error) {
          console.error("Error inserting shareholding data:", error);
          toast({
            title: "Error",
            description: "Failed to insert data. Please try again.",
            variant: "destructive",
          });
        }
      }
    } else if (response.status === 204) {
      toast({
        description: "No shareholding data found.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    } else {
      const errorData = await response.json();
      toast(errorData.message || "An error occurred.");
    }

    setLoading(false);
  };

  useEffect(() => {
    if (paymentSuccess && orderNo) {
      setOpen(false);
      const formattedDate = format(date, "yyyy-MM-dd");

      const updatePaymentStatus = async () => {
        try {
          const paymentResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/update-payment-status-DS`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ orderNo }),
          });

          const paymentResult = await paymentResponse.json();

          if (paymentResult.status !== 200) {
            toast({
              title: "Payment Update Failed",
              description: paymentResult.message || "Something went wrong",
              variant: "destructive",
            });
            return;
          }

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

            const payloadACC = {
              name: `${data[0].f_name} ${data[0].l_name}`,
              cid: data[0].ID,
              data: data.map(item => ({
                symbol: item.symbol,
                companyname: item.symbol_name,
                total_vol: item.total_vol,
              })),
            };

            try {
              const response = await fetch("https://ads.acc.org.bt/api/push-data/", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(payloadACC),
              });

              const result = await response.json();
            } catch (error) {
              console.error("Error posting data:", error);
            }
          });
        } catch (error) {
          console.error("Error updating payment status:", error);
          toast({
            title: "Network Error",
            description: "Failed to update payment status",
            variant: "destructive",
          });
        }
      };

      updatePaymentStatus();
    }
  }, [paymentSuccess, orderNo]);

  const fetchUserContactDetails = async () => {
    setLoading(true);
  
    try {
      if (!cid || !date) {
        toast({
          description: "Please enter CID and select a date.",
          variant: "destructive"
        });
        setLoading(false);
        return;
      }
  
      const formattedDate = format(date, "yyyy-MM-dd");
  
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/check-client-holdings/${cid}/${formattedDate}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.status === 200) {
        const data = await response.json();
        setUserDetails(data);
        sendOtpOperation(data);
      } else if (response.status === 204) {
        toast({
          description: "No shareholding data found.",
          variant: "destructive"
        });
      } else {
        const errorData = await response.json();
        toast(errorData.message || "An error occurred.");
      }
    } catch (err) {
      toast(err.message);
    } finally {
      setLoading(false);
    }
  };

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
    input.style.width = "1228px";

    document.fonts.ready
      .then(() => {
        return html2canvas(input, {
          scale: 2,
          useCORS: true,
          allowTaint: false,
          backgroundColor: "#FFFFFF",
          logging: true,
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

  return (
    <div className="w-full flex flex-col justify-between items-center p-6">
      {!ndiSuccess && !orderNo && useNDI && (
        <Card>
          <CardHeader>
            <div className="flex justify-center"> 
              <img src="https://rsebl.org.bt/agm/storage/serviceLogo/LITEBd7Ju48CHdYjXWaWqTFkIwJR4Hzve8x2lJEp.png" alt="" className="w-20 h-20"/>
            </div>
            <CardTitle className="flex justify-center">
              Asset Declaration (ACC)
            </CardTitle>
            <CardDescription className="flex justify-center">Declare your shares</CardDescription>
          </CardHeader>
          <CardContent>
            <BhutanNDIComponent
              btnText={"Receive Credentials"}
              setNdiSuccess={setNdiSuccess}
              setNdiData={setNdiData}
            />
            <CardDescription className="flex justify-center pt-3">
              Don't have the NDI App? 
              <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault(); // Prevent default anchor behavior
                setUseNDI(false);
              }} 
              className="px-1 text-blue-600 underline hover:text-blue-800"
            >
              Click here.
            </a>
            </CardDescription>
          </CardContent>
        </Card>
      )}

      {!orderNo && (!useNDI || (ndiSuccess && ndiData)) && (
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-xl text-center">Shares Declaration</CardTitle>
            <CardDescription className="text-center">
              Enter details to proceed declaring your holdings
            </CardDescription>
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
                    value={useNDI ? ndiData?.idNumber : cid}
                    onChange={(e) => setCid(e.target.value)}
                    disabled={useNDI}
                  />
                </div>
                {!useNDI && showOtpField && (
                  <>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="otp">RSEB OTP</Label>
                      <Input 
                        id="otp" 
                        type="number" 
                        placeholder="Enter OTP" 
                        value={otp} 
                        onChange={(e) => setOtp(e.target.value)} 
                      />
                    </div>
                  </>
                )}
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end">
            {(!useNDI && !showOtpField) && (
              <Button onClick={validateAndProceed} disabled={loading}>
                {loading ? "Verifying..." : "Verify"}
              </Button>
            )}
            {(!useNDI && showOtpField) && (
              <Button onClick={verifyOtp} disabled={loading}>
                {loading ? "Verifying OTP..." : "Verify OTP"}
              </Button>
            )}
            {useNDI && (
              <Button onClick={validateAndProceed} disabled={loading}>
                {loading ? "Processing..." : "Proceed"}
              </Button>
            )}
          </CardFooter>
        </Card>
      )}

      {paymentSuccess && orderNo && (
        <Card className="mt-4 w-full mx-auto shadow-lg rounded-xl py-2">
          {/* PDF content and download button - same as before */}
          <CardContent id="pdf-content">
            {/* ... existing PDF content ... */}
          </CardContent>
          <div className="hidden w-[1228px] mx-auto">
            <CardContent id="pdf-content-lg">
              {/* ... existing PDF content for larger screens ... */}
            </CardContent>
          </div>
          <CardFooter className="flex justify-end">
            <Button variant={"outline"} onClick={downloadStatement}>
              Download Statement
            </Button>
          </CardFooter>
        </Card>
      )}

      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent>
          <div className="mx-auto w-full max-w-lg p-5 p-0-md">
            <DrawerHeader className="m-0 px-0 flex flex-col justify-center items-center">
              <DrawerTitle>Payment Portal</DrawerTitle>
              <DrawerDescription>Royal Securities Exchange of Bhutan</DrawerDescription>
            </DrawerHeader>
            <div className="h-[290px]">
              <PaymentGateway 
                service_code={"DS"} 
                setPaymentSuccess={setPaymentSuccess} 
                setOrderNo={setOrderNo} 
                setAmount={setAmount}  
                MERCHANT_CHECKOUT_URL={"http://localhost:3000/ourservices/declare-shares"}
              />
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}