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
    setHoldings(data);
    setLoading(false);
  };

  const downloadStatement = () => {
    const csvContent = [
      ["Symbol Name", "Total Volume"],
      ...holdings.map(holding => [holding.symbol_name, holding.total_vol]),
    ].map(e => e.join(",")).join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "holdings_statement.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full flex flex-col justify-between items-center p-6 ">
      <Card className="w-[600px]">
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
                  type="text"
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
                Declaring your shares will cost 50 BTN. Do you wish to proceed?
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
        <Card className="mt-4 w-[600px]">
          <CardContent className="p-6">
           
          <CardTitle>Your Shares</CardTitle>
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
            <div className="flex justify-end">
            <Button className="mt-4" onClick={downloadStatement}>Download Statement</Button>
            </div>
            
          </CardContent>
        </Card>
      )}
    </div>
  );
}
