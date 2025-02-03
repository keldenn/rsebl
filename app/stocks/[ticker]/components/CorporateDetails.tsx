import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import DataTable from "./DataTable"; // Import the client component

async function fetchDirectors(ticker: string) {
  try {
    const response = await fetch(`https://rsebl.org.bt/agm/api/fetch-script-director/${ticker}`, { cache: "no-store" });
    if (!response.ok) throw new Error("Failed to fetch directors");
    return (await response.json()).reverse();
  } catch (error) {
    console.error("Error fetching directors:", error);
    return [];
  }
}

async function fetchCorporateActions(ticker: string) {
  try {
    const response = await fetch(`https://rsebl.org.bt/agm/api/fetch-corporateActions/${ticker}`, { cache: "no-store" });
    if (!response.ok) throw new Error("Failed to fetch corporate actions");
    return (await response.json()).reverse();
  } catch (error) {
    console.error("Error fetching corporate actions:", error);
    return [];
  }
}

async function fetchInterimReports(ticker: string) {
  try {
    const response = await fetch(`https://rsebl.org.bt/agm/api/fetch-script-IR/${ticker}`, { cache: "no-store" });
    if (!response.ok) throw new Error("Failed to fetch interim reports");
    return (await response.json()).reverse();
  } catch (error) {
    console.error("Error fetching interim reports:", error);
    return [];
  }
}

export default async function ScriptDirectorsTable({ ticker }: { ticker: string }) {
  const [directors, corporateActions, interimReports] = await Promise.all([
    fetchDirectors(ticker),
    fetchCorporateActions(ticker),
    fetchInterimReports(ticker),
  ]);

  const directorColumns = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "designation", header: "Designation" },
    { accessorKey: "address", header: "Address" },
  ];

  const corporateActionColumns = [
    { accessorKey: "year", header: "Year" },
    { accessorKey: "corporate_action", header: "Action" },
    { accessorKey: "amount", header: "Amount" },
    { accessorKey: "remarks", header: "Remarks" },
  ];

  const interimReportColumns = [
    { accessorKey: "year", header: "Year" },
    { accessorKey: "file_path", header: "File" }, // Pass raw file_path data
  ];
  

  return (
    <Card className="w-full h-fit pt-5 mt-0">
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="directors">
            <AccordionTrigger>Board of Directors</AccordionTrigger>
            <AccordionContent>
              <DataTable data={directors} columns={directorColumns} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="corporateActions">
            <AccordionTrigger>Corporate Actions</AccordionTrigger>
            <AccordionContent>
              <DataTable data={corporateActions} columns={corporateActionColumns} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="interimReports">
            <AccordionTrigger>Interim Reports</AccordionTrigger>
            <AccordionContent>
              <DataTable data={interimReports} columns={interimReportColumns} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
