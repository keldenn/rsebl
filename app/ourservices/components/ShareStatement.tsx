import { useEffect, useState } from "react";
import { fetchShareData } from "@/lib/yahoo-finance/fetchShareData";
import { Card, CardContent, CardFooter, CardHeader, CardDescription, CardTitle} from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import html2canvas from 'html2canvas';
import jsPDF from "jspdf";
import "jspdf-autotable";
import { format, isAfter } from "date-fns";

const ShareStatement = ({ order_no }) => {
  const [date, setDate] = useState<Date | undefined>();
  const [loading, setLoading] = useState(true);
  const [reportDate, setReportDate] = useState("");
  const [reportLocalTime, setReportLocalTime] = useState("");
  const [shareData, setShareData] = useState(null);
  const [showShareDetails, setShowShareDetails] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const { toast } = useToast();
 
  useEffect(() => {
    if (order_no) {
      setReportDate(new Date().toLocaleDateString());
      setReportLocalTime(new Date().toLocaleTimeString());
      loadShareData();
    }
  }, [order_no]);

  // console.log("ShareStatement received order_nooooo:", order_no);
  const loadShareData = async () => {
    if (!order_no) {
      toast({
        title: "Error",
        description: "No order number.",
        variant: "destructive",
        duration: 5000,
      });
      return;
    }
  
    setLoading(true);
  
    try {
      const fetchedData = await fetchShareData(order_no);
  
      if (fetchedData.status === 400) {
        toast({
          title: "Failed",
          description: fetchedData.message,
          variant: "destructive",
          duration: 5000,
        });
        return;
      }

      // ✅ Store both "client" & "data" properly
      setShareData({
        client: fetchedData.client, // Personal details
        shares: fetchedData.data,   // Shares list
      });

      setShowShareDetails(true);
  
      // toast({
      //   title: "Success",
      //   description: fetchedData.message || "Share details loaded successfully.",
      //   duration: 5000,
      // });
  
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to fetch report details. Please try again later.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
};
const downloadStatement = () => {
  setDownloading(true); // Start loading
  const input = document.getElementById('pdf-content');

  if (!input) {
    toast({
      title: "Error",
      description: "Report content not found.",
      variant: "destructive",
      duration: 5000,
    });
    setDownloading(false); // Start loading
    return;
  }

  // ✅ Temporarily enlarge the component
  const originalWidth = input.style.width;
  input.style.width = "1228px"; // Simulating a large-screen width

  html2canvas(input, {
    scale: 2, // Increase resolution
    useCORS: true, // Fix cross-origin issues if any images are external
    windowWidth: 1228, // Force the width of a larger screen
  })
    .then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

      const formattedDate = date ? format(date, "yyyy-MM-dd") : new Date().toISOString().split("T")[0];
      const filename = `Shares_Declaration_${shareData?.client.ID || "unknown-cid"}_${formattedDate}.pdf`;

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
      // ✅ Reset width back to original
      input.style.width = originalWidth;
      setDownloading(false); 
    });
};

  return (
<main className="container mx-auto p-6">
  {loading ? (
    <div className="flex justify-center">
      <Loader2 className="animate-spin" />
    </div>
  ) : showShareDetails && !downloading && shareData?.client ?  (
    <div id="reportContent" className="my-5">
    <Card className="w-full mt-4 mx-auto shadow-lg rounded-xl py-2">
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

      <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-6">
        <p className="text-sm font-medium text-gray-900 dark:text-gray-200">
          CID/DISN/CD CODE: <span className="font-semibold">{shareData.client.ID}</span>
        </p>
        <p className="text-sm font-medium text-gray-900 dark:text-gray-200">
          NAME: <span className="font-semibold">{shareData.client.f_name} {shareData.client.l_name}</span>
        </p>
        <p className="text-sm font-medium text-gray-900 dark:text-gray-200">
          TPN No: <span className="font-semibold">{shareData.client.tpn}</span>
        </p>
        <p className="text-sm font-medium text-gray-900 dark:text-gray-200">
          ADDRESS: <span className="font-semibold">{shareData.client.address}</span>
        </p>
      </div>

      <Table className="w-full border rounded-lg overflow-hidden">
        <TableHeader className="bg-custom-1">
          <TableRow>
            <TableHead className="text-left text-white px-4 py-2">Sl#</TableHead>
            <TableHead className="text-left text-white px-4 py-2">Symbol</TableHead>
            <TableHead className="text-left text-white px-4 py-2">Volume</TableHead>
            <TableHead className="text-left text-white px-4 py-2">Block Volume</TableHead>
            <TableHead className="text-left text-white px-4 py-2">Pledged Volume</TableHead>
            <TableHead className="text-left text-white px-4 py-2">Total Volume</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {shareData?.shares?.map((item, index) => (
            <TableRow key={index} className="border-b hover:bg-gray-100 dark:hover:bg-gray-700">
              <TableCell className="px-4 py-2 text-gray-900 dark:text-white">{index + 1}</TableCell>
              <TableCell className="px-4 py-2 text-gray-900 dark:text-white">{item.symbol}</TableCell>
              <TableCell className="px-4 py-2 text-gray-900 dark:text-white">{item.volume}</TableCell>
              <TableCell className="px-4 py-2 text-gray-900 dark:text-white">{item.block_volume}</TableCell>
              <TableCell className="px-4 py-2 text-gray-900 dark:text-white">{item.pledge_volume}</TableCell>
              <TableCell className="px-4 py-2 font-semibold text-gray-900 dark:text-white">{item.total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <hr className="my-6 border-gray-300 dark:border-gray-600" />
      <p className="text-center text-sm text-gray-500 dark:text-gray-400">
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

      <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-6">
        <p className="text-sm font-medium text-gray-900 dark:text-gray-200">
          CID/DISN/CD CODE: <span className="font-semibold">{shareData.client.ID}</span>
        </p>
        <p className="text-sm font-medium text-gray-900 dark:text-gray-200">
          NAME: <span className="font-semibold">{shareData.client.f_name} {shareData.client.l_name}</span>
        </p>
        <p className="text-sm font-medium text-gray-900 dark:text-gray-200">
          TPN No: <span className="font-semibold">{shareData.client.tpn}</span>
        </p>
        <p className="text-sm font-medium text-gray-900 dark:text-gray-200">
          ADDRESS: <span className="font-semibold">{shareData.client.address}</span>
        </p>
      </div>

      <Table className="w-full border rounded-lg overflow-hidden">
        <TableHeader className="bg-custom-1">
          <TableRow>
            <TableHead className="text-left text-white px-4 py-2">Sl#</TableHead>
            <TableHead className="text-left text-white px-4 py-2">Symbol</TableHead>
            <TableHead className="text-left text-white px-4 py-2">Volume</TableHead>
            <TableHead className="text-left text-white px-4 py-2">Block Volume</TableHead>
            <TableHead className="text-left text-white px-4 py-2">Pledged Volume</TableHead>
            <TableHead className="text-left text-white px-4 py-2">Total Volume</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {shareData?.shares?.map((item, index) => (
            <TableRow key={index} className="border-b hover:bg-gray-100 dark:hover:bg-gray-700">
              <TableCell className="px-4 py-2 text-gray-900 dark:text-white">{index + 1}</TableCell>
              <TableCell className="px-4 py-2 text-gray-900 dark:text-white">{item.symbol}</TableCell>
              <TableCell className="px-4 py-2 text-gray-900 dark:text-white">{item.volume}</TableCell>
              <TableCell className="px-4 py-2 text-gray-900 dark:text-white">{item.block_volume}</TableCell>
              <TableCell className="px-4 py-2 text-gray-900 dark:text-white">{item.pledge_volume}</TableCell>
              <TableCell className="px-4 py-2 font-semibold text-gray-900 dark:text-white">{item.total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <hr className="my-6 border-gray-300 dark:border-gray-600" />
      <p className="text-center text-sm text-gray-500 dark:text-gray-400">
        THIS IS A COMPUTER-GENERATED REPORT AND REQUIRES NO SIGNATORY
      </p>
    </CardContent>
    </div>
    <CardFooter className="flex justify-end">
      <Button variant="outline" onClick={downloadStatement} className="text-gray-700 dark:text-white">
      Download Statement
      </Button>
    </CardFooter>
    </Card>
    </div>
  ) : null}
</main>

  );
};

export default ShareStatement;
