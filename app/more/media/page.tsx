"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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

  const renderTableContent = (items: NewsletterType[]) => {
    const filteredData = items.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
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
                    <TableHead>File</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedData.length > 0 ? (
                    paginatedData.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>
                          <a href="#" className="text-blue-500 hover:underline">
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

  const renderPressReleases = (items: PressReleaseType[]) => {
    const filteredData = items.filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredData.length > 0 ? (
          filteredData.map((item, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.date}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{item.description}</p>
                <a href="#" className="text-blue-500 hover:underline mt-2 block">
                  {item.link}
                </a>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-center w-full col-span-2">No data found.</p>
        )}
      </div>
    );
  };

  return (
    <div className="w-full p-4 max-w-full mx-auto space-y-4">
    

      <Tabs defaultValue="Newsletter" className="space-y-4">
     <div className="flex justify-between w-full">
     <TabsList className="">
          <TabsTrigger value="Newsletter">Newsletter</TabsTrigger>
          <TabsTrigger value="PressRelease">Press Release</TabsTrigger>
        </TabsList>
        <Input
        placeholder="Search by name, title, or description..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full lg:w-1/3 mb-4"
      />
     </div>
        <TabsContent value="Newsletter">
          {renderTableContent(data.Newsletter)}
        </TabsContent>

        <TabsContent value="PressRelease">
          {renderPressReleases(data.PressRelease)}
        </TabsContent>
      </Tabs>
    </div>
  );
}
