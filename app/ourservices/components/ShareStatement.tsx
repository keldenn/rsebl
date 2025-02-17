import { useEffect, useState } from "react";
import { fetchShareData } from "@/lib/yahoo-finance/fetchShareData";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ShareStatement = ({ order_no }) => {
  const [loading, setLoading] = useState(true);
  const [reportDate, setReportDate] = useState("");
  const [reportLocalTime, setReportLocalTime] = useState("");
  const [shareData, setShareData] = useState(null);
  const [showShareDetails, setShowShareDetails] = useState(false);
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
  
      toast({
        title: "Success",
        description: fetchedData.message || "Share details loaded successfully.",
        duration: 5000,
      });
  
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

  

  return (
<main className="container mx-auto p-6">
  <div className="flex flex-col">
    <h3 className="text-xl font-bold text-center text-gray-900 dark:text-white">Online Share Statement Report</h3>
    <p className="text-gray-600 text-center dark:text-gray-300">This report is generated only once.</p>
  </div>

  {loading ? (
    <div className="flex justify-center">
      <Loader2 className="animate-spin" />
    </div>
  ) : showShareDetails && shareData?.client ? (
    <div id="reportContent" className="my-5">
      <Card className="max-w-3xl mx-auto shadow-lg rounded-xl p-6 bg-white">
        <CardContent>
          <h3 className="text-center text-xl font-bold mb-2 text-gray-900 dark:text-white">
            Royal Securities Exchange of Bhutan
          </h3>
          <p className="text-center text-gray-500 text-sm mb-4 dark:text-gray-400">
            Report generated on: {reportDate} {reportLocalTime}
          </p>

          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-6">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-200">CID/DISN/CD CODE: <span className="font-semibold">{shareData.client.ID}</span></p>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-200">NAME: <span className="font-semibold">{shareData.client.f_name} {shareData.client.l_name}</span></p>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-200">TPN No: <span className="font-semibold">{shareData.client.tpn}</span></p>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-200">ADDRESS: <span className="font-semibold">{shareData.client.address}</span></p>
          </div>

          <Table className="w-full border rounded-lg overflow-hidden">
            <TableHeader className="bg-gray-200 dark:bg-gray-700">
              <TableRow>
                <TableHead className="text-left px-4 py-2 text-gray-900 dark:text-white">Sl#</TableHead>
                <TableHead className="text-left px-4 py-2 text-gray-900 dark:text-white">Symbol</TableHead>
                <TableHead className="text-left px-4 py-2 text-gray-900 dark:text-white">Volume</TableHead>
                <TableHead className="text-left px-4 py-2 text-gray-900 dark:text-white">Block Volume</TableHead>
                <TableHead className="text-left px-4 py-2 text-gray-900 dark:text-white">Pledged Volume</TableHead>
                <TableHead className="text-left px-4 py-2 text-gray-900 dark:text-white">Total Volume</TableHead>
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
      </Card>
    </div>
  ) : null}
</main>

  );
};

export default ShareStatement;
