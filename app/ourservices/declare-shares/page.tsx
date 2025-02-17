"use client";
import { fetchShareDeclarations } from "@/lib/yahoo-finance/fetchShareDeclaration";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { User, Mail, Phone } from "lucide-react"; // Icons for better UI

export default function SharesDeclaration() {
  const [date, setDate] = useState<Date | undefined>();
  const [cid, setCid] = useState("");
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const { toast } = useToast();

  const validateAndProceed = () => {
    if (!date || !cid) {
      toast({
        title: "Error",
        description: "Both date and CID number are required.",
        variant: "destructive",
      });
      return;
    }

    if (cid.length>11) {
      toast({
        title: "Error",
        description: "CID should not exceed more than 11 digits",
        variant: "destructive",
      });
      return;
    }
    if (cid.length<11) {
      toast({
        title: "Error",
        description: "CID should be of 11 digits",
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

    setConfirmDialog(true);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setConfirmDialog(false);
    const formattedDate = format(date, "yyyy-MM-dd");
    const data = await fetchShareDeclarations(cid, formattedDate);
    if (!data || data.length === 0) {
      toast({
        title: "Error",
        description: "No share holding data available",
        variant: "destructive",
      });
    }
    setHoldings(data);
    setLoading(false);
  };

  const downloadStatement = () => {
    const doc = new jsPDF();
  
    // Add title
    doc.setFontSize(16);
    doc.text("Holdings Statement", 14, 20);
  
    // Ensure holdings array is not empty before accessing client details
    if (holdings.length > 0) {
      const client = holdings[0]; // Client details (same for all holdings)
  
      // Add Client Information
      doc.setFontSize(12);
      doc.text(`Client ID: ${client.ID}`, 14, 30);
      doc.text(`Name: ${client.f_name} ${client.l_name}`, 14, 40);
      doc.text(`Email: ${client.email}`, 14, 50);
      doc.text(`Phone: ${client.phone}`, 14, 60);
      
    }
  
    // Table headers
    const tableColumn = ["Symbol Name", "Total Volume"];
    const tableRows = holdings.map(holding => [holding.symbol_name, holding.total_vol]);
  
    // Add table using autoTable plugin
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 70, // Position table after client details
    });
  
    // Save the PDF
    doc.save("holdings_statement.pdf");
  };

  

  return (
    <div className="w-full flex flex-col justify-between items-center p-6 ">
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
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end">
          {/* <Button variant="outline" disabled={loading}>Cancel</Button> */}
          <Button onClick={validateAndProceed} disabled={loading}>
            {loading ? "Fetching..." : "Declare"}
          </Button>
        </CardFooter>
      </Card>
      {confirmDialog && (
        <AlertDialog open={confirmDialog} onOpenChange={setConfirmDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmation</AlertDialogTitle>
              <AlertDialogDescription>
                Declaring your shares will cost Nu 50. Do you wish to proceed?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleSubmit}>Proceed</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
      {holdings.length > 0 && (
        <Card className="mt-4 w-full mx-auto shadow-lg rounded-xl p-6">
          <CardContent>
            <h3 className="text-center text-xl font-bold mb-2">
              Royal Securities Exchange of Bhutan
            </h3>
            <p className="text-center text-gray-500 text-sm mb-4">
              Report generated on: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
            </p>
            
            <div className="bg-gray-100 p-4 rounded-lg mb-6">
              <p className="text-sm font-medium">CID/DISN/CD CODE: <span className="font-semibold">{holdings[0]?.ID}</span></p>
              <p className="text-sm font-medium">NAME: <span className="font-semibold">{holdings[0]?.f_name} {holdings[0]?.l_name}</span></p>
              <p className="text-sm font-medium">Email: <span className="font-semibold">{holdings[0]?.email}</span></p>
              <p className="text-sm font-medium">Phone: <span className="font-semibold">{holdings[0]?.phone}</span></p>
            </div>
            
            <Table className="w-full border rounded-lg overflow-hidden">
              <TableHeader className="bg-gray-200">
                <TableRow>
                  <TableHead className="text-left px-4 py-2">Sl#</TableHead>
                  <TableHead className="text-left px-4 py-2">Symbol</TableHead>
                  <TableHead className="text-left px-4 py-2">Total Volume</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {holdings.map((holding, index) => (
                  <TableRow key={index} className="border-b hover:bg-gray-100">
                    <TableCell className="px-4 py-2">{index + 1}</TableCell>
                    <TableCell className="px-4 py-2">{holding.symbol_name}</TableCell>
                    <TableCell className="px-4 py-2 font-semibold">{holding.total_vol}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            <hr className="my-6" />
            <p className="text-center text-sm text-gray-500">
              THIS IS A COMPUTER-GENERATED REPORT AND REQUIRES NO SIGNATORY
            </p>
            
            <div className="flex justify-end">
              <Button className="mt-4" onClick={downloadStatement}>Download Statement</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
