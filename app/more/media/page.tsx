"use client";

import React, { useState, useEffect } from "react";
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
  id: number;
  name: string;
  file_path: string;
  status: number;
  created_at: string;
};

type PressReleaseType = {
  id: number;
  title: string;
  description: string;
  date: string;
  link: string;
};

export default function PublicationPage() {
  const [newsletters, setNewsletters] = useState<NewsletterType[]>([]);
  const [pressReleases, setPressReleases] = useState<PressReleaseType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    // Fetch newsletters
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/fetch-news-letters`)
      .then((response) => response.json())
      .then((data) => {
        const formattedNewsletters = data.map((item: any) => ({
          id: item.id,
          name: item.name,
          file_path: item.file_path,
          status: item.status,
          created_at: item.created_at,
        }));
        setNewsletters(formattedNewsletters);
      })
      .catch((error) => console.error("Error fetching newsletters:", error));

    // Fetch press releases
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/fetch-press-release`)
      .then((response) => response.json())
      .then((data) => {
        setPressReleases(data); // Assuming API data matches `PressReleaseType` structure
      })
      .catch((error) => console.error("Error fetching press releases:", error));
  }, []);

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
                  paginatedData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>
                        <a href={`${process.env.NEXT_PUBLIC_BASE_URL}/${item.file_path}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                          Read More
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
    const filteredData = items.filter((item) => {
      const name = item.name || ""; // Fallback to an empty string if undefined
      //const path = item.file_path || ""; // Fallback to an empty string if undefined
      return (
        name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
    

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <CardTitle>{item.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{item.description}</p>
                <a href={`${process.env.NEXT_PUBLIC_BASE_URL}/${item.file_path}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mt-2 block">
                  Read more
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
          {renderTableContent(newsletters)}
        </TabsContent>
        <TabsContent value="PressRelease">
          {renderPressReleases(pressReleases)}
        </TabsContent>
      </Tabs>
    </div>
  );
}
