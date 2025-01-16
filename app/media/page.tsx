"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { cn } from "@/lib/utils";

type NewsletterType = {
  name: string;
  file: string;
};

type PressReleaseType = {
  title: string;
  description: string;
  date: string;
  link: string;
};

const data = {
  Newsletter: [
    { name: "Newsletter January 2023", file: "Download Link 1" },
    { name: "Newsletter February 2023", file: "Download Link 2" },
    { name: "Newsletter March 2023", file: "Download Link 3" },
    { name: "Newsletter April 2023", file: "Download Link 4" },
    { name: "Newsletter May 2023", file: "Download Link 5" },
    { name: "Newsletter June 2023", file: "Download Link 6" },
    { name: "Newsletter July 2023", file: "Download Link 7" },
  ],
  PressRelease: [
    {
      title: "Press Release: Product Launch",
      description: "We are excited to announce the launch of our new product.",
      date: "2023-01-15",
      link: "Download Link 1",
    },
    {
      title: "Press Release: Annual Meeting",
      description: "Highlights from our annual meeting and future plans.",
      date: "2023-02-20",
      link: "Download Link 2",
    },
    {
      title: "Press Release: Partnership Announcement",
      description: "Announcing a strategic partnership with XYZ Corporation.",
      date: "2023-03-10",
      link: "Download Link 3",
    },
  ],
};

export default function PublicationPage() {
  const [activeTab, setActiveTab] = useState("Newsletter");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const currentData = data[activeTab];
  const filteredData = currentData.filter((item) => {
    if (activeTab === "Newsletter") {
      return item.name.toLowerCase().includes(searchQuery.toLowerCase());
    } else {
      return (
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  });

  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="w-full p-4 max-w-full mx-auto space-y-4">

    <div className="flex flex-col lg:flex-row justify-between items-center w-full">
        {/* Tabs Navigation */}
        <div className="flex bg-muted/50 w-full lg:w-1/3 p-1 mb-4 lg:mb-0 rounded-lg">
          {["Newsletter", "PressRelease"].map((tab) => (
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
              {tab === "Newsletter" && "Newsletter"}
              {tab === "PressRelease" && "Press Release"}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <Input
          placeholder={
            activeTab === "Newsletter" ? "Search by name..." : "Search by title or description..."
          }
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className=" w-full lg:w-1/3"
        />
   </div>
    
      {/* Content */}
      {activeTab === "Newsletter" ? (
        <div className="mb-10">
          <Card>
            <CardContent className="pt-6">
  
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>File</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.length > 0 ? (
                paginatedData.map((item: NewsletterType, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>
                      <a
                        href="#"
                        className="text-blue-500 hover:underline"
                        onClick={(e) => e.preventDefault()}
                      >
                        {item.file}
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
          <div className="flex items-center justify-between mt-5">
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
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Cards for Press Releases */}
          {filteredData.length > 0 ? (
            filteredData.map((item: PressReleaseType, index: number) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{item.description}</p>
                  <a
                    href="#"
                    className="text-blue-500 hover:underline mt-2 block"
                    onClick={(e) => e.preventDefault()}
                  >
                    {item.link}
                  </a>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-center w-full col-span-2">No data found.</p>
          )}
        </div>
      )}
    </div>
  );
}
