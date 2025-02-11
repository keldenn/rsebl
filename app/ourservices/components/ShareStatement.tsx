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
    setReportDate(new Date().toLocaleDateString());
    setReportLocalTime(new Date().toLocaleTimeString());
    loadShareData();
  }, []);
  console.log("ShareStatement received order_no:", order_no);
  const loadShareData = async () => {
    try {
    //   if (data.successCode === 200 && data.http_code === 200 && data.bfs_code === "00") {
        const fetchedData = await fetchShareData(order_no);
        setShareData(fetchedData);
        if(fetchedData.status == 400){
          toast({
            title: "Failed",
            description: fetchedData.message,
            variant:  "destructive",

             duration: 5000,
          });
          return;
        }
        setShowShareDetails(true);

        toast({
          title: "Success",
          description: fetchedData.message,
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
      ) : showShareDetails && shareData ? (
        <div id="reportContent">
          <Card>
            <CardContent>
              <h3 className="text-center text-lg font-semibold">Royal Securities Exchange of Bhutan</h3>
              <p className="text-center">
                Report generated on: {reportDate} {reportLocalTime}
              </p>
              <p>
                CID/DISN/CD CODE: {shareData.cid_no}
                <br />
                NAME: {shareData.full_name}
                <br />
                TPN No: {shareData.tpn_no}
                <br />
                ADDRESS: {shareData.address}
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
                  {shareData.shareLists.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item.symbol}</TableCell>
                      <TableCell>{item.volume}</TableCell>
                      <TableCell>{item.block_volume.toLocaleString()}</TableCell>
                      <TableCell>{item.pledge_volume.toLocaleString()}</TableCell>
                      <TableCell>{item.total.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <hr />
              <p className="text-center">THIS IS A COMPUTER-GENERATED REPORT AND REQUIRES NO SIGNATORY</p>
            </CardContent>
          </Card>
        </div>
      ) : null}
    </main>
  );
};

export default ShareStatement;
