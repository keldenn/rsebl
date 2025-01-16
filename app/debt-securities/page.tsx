"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type BondType = {
  name: string;
  maturityPeriod: string;
  rate: string;
  amount: string;
  effectiveDate: string;
  maturityDate: string;
};

type CommercialPaperType = {
  name: string;
  maturityPeriod: string;
  discountRate: string;
  effectiveDate: string;
  maturityDate: string;
  amountIssued: string;
  overSubscription: string;
};

type BondMarketType = {
  sym: string;
  marketPrice: string;
  change: string;
  volume: string;
  value: string;
  lastTrade: string;
};

const data = {
  Bonds: [
    {
      name: "Bond A",
      maturityPeriod: "5 years",
      rate: "5.5%",
      amount: "$1,000,000",
      effectiveDate: "2023-01-01",
      maturityDate: "2028-01-01",
    },
    {
      name: "Bond B",
      maturityPeriod: "3 years",
      rate: "4.2%",
      amount: "$500,000",
      effectiveDate: "2023-03-15",
      maturityDate: "2026-03-15",
    },
  ],
  CommercialPaper: [
    {
      name: "CP A",
      maturityPeriod: "90 days",
      discountRate: "3.5%",
      effectiveDate: "2023-02-01",
      maturityDate: "2023-05-01",
      amountIssued: "$200,000",
      overSubscription: "10%",
    },
    {
      name: "CP B",
      maturityPeriod: "180 days",
      discountRate: "4.0%",
      effectiveDate: "2023-04-01",
      maturityDate: "2023-10-01",
      amountIssued: "$300,000",
      overSubscription: "5%",
    },
  ],
  BondMarket: [
    {
      sym: "BND001",
      marketPrice: "$105.50",
      change: "+0.50%",
      volume: "1,000",
      value: "$105,500",
      lastTrade: "2023-01-15 14:30",
    },
    {
      sym: "BND002",
      marketPrice: "$98.75",
      change: "-0.25%",
      volume: "2,500",
      value: "$246,875",
      lastTrade: "2023-01-15 14:45",
    },
  ],
};

export default function FinancialPublicationPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handlePageChange = (type: "previous" | "next", totalPages: number) => {
    if (type === "previous" && currentPage > 1) setCurrentPage((prev) => prev - 1);
    if (type === "next" && currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handleRowsPerPageChange = (value: string) => {
    setRowsPerPage(Number(value));
    setCurrentPage(1); // Reset to the first page
  };

  const renderTableContent = (
    items: BondType[] | CommercialPaperType[],
    columns: string[]
  ) => {
    const filteredData = items.filter((item) =>
      Object.values(item).some((val) =>
        val.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    const paginatedData = filteredData.slice(
      (currentPage - 1) * rowsPerPage,
      currentPage * rowsPerPage
    );
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);

    return (
      <>
        <Card>
          <CardContent className="pt-4">
            <Table>
              <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Maturity Period</TableHead>
                <TableHead>Rate</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Effective Date</TableHead>
                <TableHead>Maturity Date</TableHead>
              </TableRow>
              </TableHeader>
              <TableBody>
              {paginatedData.length > 0 ? (
                  paginatedData.map((item, index) => (
                    <TableRow key={index}>
                      {columns.map((col, colIndex) => (
                        <TableCell
                          key={colIndex}
                          className={col === "name" ? "text-bold font-custom-1" : ""}
                        >
                          {(item as any)[col]}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="text-center">
                      No data found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Pagination */}
        <div className="flex items-center justify-end mt-5">
          <div className="flex items-center space-x-2 text-sm font-medium">
            <span>Rows per page</span>
            <Select value={rowsPerPage.toString()} onValueChange={handleRowsPerPageChange}>
              <SelectTrigger className="h-8 w-[70px]">
                <span>{rowsPerPage}</span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="15">15</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium ms-3">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              onClick={() => handlePageChange("previous", totalPages)}
              disabled={currentPage === 1}
              variant="outline"
              size="sm"
            >
              Previous
            </Button>

            <Button
              onClick={() => handlePageChange("next", totalPages)}
              disabled={currentPage === totalPages || totalPages === 0}
              variant="outline"
              size="sm"
            >
              Next
            </Button>
          </div>
        </div>
      </>
    );
  };

  const renderBondMarketTable = () => {
    return (
      <Card className="mb-4">
        <CardContent className="pt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sym</TableHead>
                <TableHead>Market Price</TableHead>
                <TableHead>% Change</TableHead>
                <TableHead>Volume</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Last Trade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.BondMarket.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="text-bold font-custom-1">{item.sym}</TableCell>
                  <TableCell>{item.marketPrice}</TableCell>
                  <TableCell
      
            >
              {item.change}
            </TableCell>
                  <TableCell>{item.volume}</TableCell>
                  <TableCell>{item.value}</TableCell>
                  <TableCell>{item.lastTrade}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="w-full p-4 max-w-full mx-auto space-y-4">
      <Tabs defaultValue="Bonds" className="space-y-4">
        <div className="flex justify-between w-full">
          <TabsList>
            <TabsTrigger value="Bonds">Bonds</TabsTrigger>
            <TabsTrigger value="CommercialPaper">Commercial Paper</TabsTrigger>
          </TabsList>
          <Input
            placeholder="Search by name, maturity period, or other details..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full lg:w-1/3 mb-4"
          />
        </div>
        <TabsContent value="Bonds">
          {renderBondMarketTable()}
          {renderTableContent(data.Bonds, [
            "name",
            "maturityPeriod",
            "rate",
            "amount",
            "effectiveDate",
            "maturityDate",
          ])}
        </TabsContent>

        <TabsContent value="CommercialPaper">
          {renderTableContent(data.CommercialPaper, [
            "name",
            "maturityPeriod",
            "discountRate",
            "effectiveDate",
            "maturityDate",
            "amountIssued",
            "overSubscription",
          ])}
        </TabsContent>
      </Tabs>
    </div>
  );
}
