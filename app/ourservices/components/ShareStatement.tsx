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

  console.log("ShareStatement received order_nooooo:", order_no);
  const loadShareData = async () => {
    if (!order_no) {
      toast({
        title: "Error",
        description: "Invalid order number.",
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
      <h3 className="text-xl font-bold">Online Share Statement Report</h3>
      <p className="text-gray-600">This report is generated only once.</p>

      {loading ? (
        <div className="flex justify-center">
          <Loader2 className="animate-spin" />
        </div>
      ) : showShareDetails && shareData?.client ? (
        <div id="reportContent">
          <Card>
            <CardContent>
              <h3 className="text-center text-lg font-semibold">
                Royal Securities Exchange of Bhutan
              </h3>
              <p className="text-center">
                Report generated on: {reportDate} {reportLocalTime}
              </p>
              <p>
                CID/DISN/CD CODE: {shareData.client.ID}  
                <br />
                NAME: {shareData.client.f_name} {shareData.client.l_name}  
                <br />
                TPN No: {shareData.client.tpn}  
                <br />
                ADDRESS: {shareData.client.address}
              </p>
      
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sl#</TableHead>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Volume</TableHead>
                    <TableHead>Block Volume</TableHead>
                    <TableHead>Pledged Volume</TableHead>
                    <TableHead>Total Volume</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {shareData?.shares?.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item.symbol}</TableCell>
                      <TableCell>{item.volume}</TableCell>
                      <TableCell>{item.block_volume}</TableCell>
                      <TableCell>{item.pledge_volume}</TableCell>
                      <TableCell>{item.total}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
      
              <hr />
              <p className="text-center">
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
