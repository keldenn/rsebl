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
      <Card>
        <CardHeader>
          <CardTitle>Shares Declaration</CardTitle>
          <CardDescription>Enter details to proceed declaring your holdings</CardDescription>
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
        <Card className="mt-4">
          <CardContent className="p-6">

          <div className="w-full flex flex-row justify-between items-center">
            <div className="flex justify-between items-center w-full">
              {/* Left: "Your Shares" */}
              <div className="flex justify-start w-1/2">
                <CardTitle>Your Shares</CardTitle>
              </div>

              {/* Right: Client Details HoverCard */}
              <div className="flex justify-end w-1/2">
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <div className="flex text-sm cursor-pointer pb-2 mt-2">
                      <span className="text-xs font-bold">View Client Details</span>
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold">Client Information</h4>
                      <p className="text-sm flex items-center">
                        <User className="mr-2 h-4 w-4 opacity-70" />
                        <strong>CID:</strong> {holdings[0]?.ID}
                      </p>
                      <p className="text-sm flex items-center">
                        <User className="mr-2 h-4 w-4 opacity-70" />
                        <strong>Name:</strong> {holdings[0]?.f_name} {holdings[0]?.l_name}
                      </p>
                      <p className="text-sm flex items-center">
                        <Mail className="mr-2 h-4 w-4 opacity-70" />
                        <strong>Email:</strong> {holdings[0]?.email}
                      </p>
                      <p className="text-sm flex items-center">
                        <Phone className="mr-2 h-4 w-4 opacity-70" />
                        <strong>Phone:</strong> {holdings[0]?.phone}
                      </p>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </div>
            </div>
          </div>
            {/* Display Holdings Table */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Symbol Name</TableHead>
                  <TableHead>Total Volume</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {holdings.map((holding, index) => (
                  <TableRow key={index}>
                    <TableCell>{holding.symbol_name}</TableCell>
                    <TableCell>{holding.total_vol}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Download Button */}
            <div className="flex justify-end">
              <Button className="mt-4" onClick={downloadStatement}>Download Statement</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
