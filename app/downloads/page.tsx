"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type DataType = {
  year: number;
  download: string;
};

const data = {
  Annual_Reports: [
    { year: 2023, download: "Tab 1 - Download Link 1" },
    { year: 2022, download: "Tab 1 - Download Link 2" },
    { year: 2021, download: "Tab 1 - Download Link 3" },
    { year: 2018, download: "Tab 1 - Download Link 4" },
    { year: 2019, download: "Tab 1 - Download Link 5" },
    { year: 2025, download: "Tab 1 - Download Link 6" },
  ],
  Regulations: [
    { year: 2020, download: "Tab 2 - Download Link 1" },
    { year: 2019, download: "Tab 2 - Download Link 2" },
    { year: 2018, download: "Tab 2 - Download Link 3" },
  ],
  Forms: [
    { year: 2017, download: "Tab 3 - Download Link 1" },
    { year: 2016, download: "Tab 3 - Download Link 2" },
    { year: 2015, download: "Tab 3 - Download Link 3" },
  ],
};

export default function YearDownloadTabs() {
  const [activeTab, setActiveTab] = useState("Annual_Reports");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const currentData = data[activeTab];
  const filteredData = currentData.filter((row) =>
    row.year.toString().includes(searchQuery)
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to the first page on search
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="w-full p-4 max-w-full mx-auto space-y-4">
        <div className="flex flex-row justify-between items-center w-full">
                    {/* Tabs Navigation */}
      <div className="flex max-w-sm bg-muted/50 w-1/2 p-1 rounded-lg ">
        {["Annual_Reports", "Regulations", "Forms"].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setSearchQuery(""); // Reset search when switching tabs
              setCurrentPage(1); // Reset to the first page
            }}
            className={cn(
              "flex-1 py-2 text-sm font-medium text-center rounded-lg transition",
              activeTab === tab
                ? "bg-card text-foreground shadow"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab === "Annual_Reports" && "Annual Reports"}
            {tab === "Regulations" && "Regulations"}
            {tab === "Forms" && "Forms"}
            {tab === "Forms" && "Forms"}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search by year..."
          value={searchQuery}
          onChange={handleSearch}
          className="max-w-sm"
        />
      </div>


        </div>
      {/* Table */}
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Year</TableHead>
                <TableHead>Download</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.length > 0 ? (
                paginatedData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.year}</TableCell>
                    <TableCell>
                      <a
                        href="#"
                        className="text-blue-500 hover:underline"
                        onClick={(e) => e.preventDefault()}
                      >
                        {row.download}
                      </a>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={2} className="text-center">
                    No data found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        {/* Rows per page selector */}
        <div className="flex items-center space-x-2 text-sm font-medium">
          <span>Rows per page</span>
          <Select
            value={rowsPerPage.toString()}
            onValueChange={(value) => {
              setRowsPerPage(Number(value));
              setCurrentPage(1); // Reset to the first page on rows-per-page change
            }}
          >
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

        {/* Pagination controls */}
        <div className="flex items-center space-x-4">
          <Button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            variant="outline"
            size="sm"
          >
            Previous
          </Button>
          <span className="text-sm font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={handleNext}
            disabled={currentPage === totalPages || totalPages === 0}
            variant="outline"
            size="sm"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
