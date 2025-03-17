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
  const [open, setOpen] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [orderNo, setOrderNo] = useState();
  const [amount, setAmount] = useState();
  const [downloading, setDownloading] = useState(false);
  const [ndiSuccess, setNdiSuccess] = useState(false); // State for NDI success
  const [ndiData, setNdiData] = useState(); // State for NDI data

  const { toast } = useToast();

  const validateAndProceed = async () => {
    if (!ndiData || !ndiData.idNumber) {
      toast({
        title: "Error",
        description: "CID number is required.",
        variant: "destructive",
      });
      return;
    }

    if (!date) {
      toast({
        title: "Error",
        description: "Date is required.",
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

    if (isAfter(date, new Date())) {
      toast({
        title: "Error",
        description: "Date cannot be in the future.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Directly proceed to fetch shareholding data
      await handleSubmit();
    } catch (error) {
      console.error("Validation error:", error);
    }
  };

  useEffect(() => {
    if (ndiSuccess && ndiData) {
      setCid(ndiData.idNumber); // Ensure cid is set from ndiData
    }
  }, [ndiSuccess, ndiData]);

  const handleSubmit = async () => {
    setLoading(true);
    setOpen(true);

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
    } else {
      const errorData = await response.json();
      toast(errorData.message || "An error occurred.");
    }

    setLoading(false);
  };

  useEffect(() => {
    if (paymentSuccess && orderNo) {
      setOpen(false); // Close the drawer when payment is successful
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

      updatePaymentStatus(); // Call the function
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

    document.fonts.ready
      .then(() => {
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

  return (
    <div className="w-full flex flex-col justify-between items-center p-6 ">
      {!ndiSuccess && (
        <Card>
          <CardHeader>
            <div className="flex justify-center"> 
            <img src="	https://rsebl.org.bt/agm/storage/serviceLogo/LITEBd7Ju48CHdYjXWaWqTFkIwJR4Hzve8x2lJEp.png" alt="" className="w-20 h-20"/>
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
          </CardContent>
        </Card>

      )}

      {!orderNo && ndiSuccess && ndiData && (
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
                    value={ndiData.idNumber}
                    onChange={(e) => setCid(e.target.value)}
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={validateAndProceed} disabled={loading}>
              {loading ? "Processing..." : "Proceed"}
            </Button>
          </CardFooter>
        </Card>
      )}

      {paymentSuccess && orderNo && (
        <Card className="mt-4 w-full mx-auto shadow-lg rounded-xl py-2">
          <CardContent id="pdf-content">
            <CardHeader className="flex flex-row justify-center">
              <div className="flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={113}
                  height={40}
                  viewBox="0 0 153 138"
                  fill="none"
                >
                  <path
                    d="M87.4225 91.3752L65.3705 70.9525C64.0985 69.7752 64.0985 67.8659 65.3705 66.6885L126.916 9.6912C128.187 8.51387 130.248 8.51387 131.518 9.6912L193.064 66.6885C194.336 67.8659 194.336 69.7752 193.064 70.9525L131.518 127.95C130.248 129.127 128.187 129.127 126.916 127.95L111.918 114.062"
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
                      className="stroke-[#382E7A] dark:stroke-white"
                      strokeWidth="16.6253"
                      strokeMiterlimit={10}
                    />
                  </g>
                </svg>
              </div>
              <div>
                <h3 className="text-center text-xl font-bold mb-2">
                  Royal Securities Exchange of Bhutan
                </h3>
                <p className="text-gray-500 text-sm mb-4">
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
                <div className="flex justify-center items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={113}
                    height={40}
                    viewBox="0 0 153 138"
                    fill="none"
                  >
                    <path
                      d="M87.4225 91.3752L65.3705 70.9525C64.0985 69.7752 64.0985 67.8659 65.3705 66.6885L126.916 9.6912C128.187 8.51387 130.248 8.51387 131.518 9.6912L193.064 66.6885C194.336 67.8659 194.336 69.7752 193.064 70.9525L131.518 127.95C130.248 129.127 128.187 129.127 126.916 127.95L111.918 114.062"
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
                        className="stroke-[#382E7A] dark:stroke-white"
                        strokeWidth="16.6253"
                        strokeMiterlimit={10}
                      />
                    </g>
                  </svg>
                </div>
                <div>
                  <h3 className="text-center text-xl font-bold mb-2">
                    Royal Securities Exchange of Bhutan
                  </h3>
                  <p className="text-gray-500 text-sm mb-4">
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
          <CardFooter className="flex justify-end">
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
              <PaymentGateway service_code={"DS"} setPaymentSuccess={setPaymentSuccess} setOrderNo={setOrderNo} setAmount={setAmount} MERCHANT_CHECKOUT_URL={"http://localhost:3000/ourservices/declare-shares"} />
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}