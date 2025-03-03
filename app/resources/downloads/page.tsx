"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type OfficeReportsType = {
  year: string;
  file_path: string;
};

type RegulationsType = {
  file_name: string;
  file_path: string;
};

type FormsType = {
    file_name: string;
    file_path: string;
};

type AuditReportType = {
    year: string;
    file_path: string;
};


const officeReportsColumns: ColumnDef<OfficeReportsType>[] = [
  { accessorKey: "year", header: "Year" },
  {
    accessorKey: "file_path",
    header: "File",
    cell: ({ row }) => (
      <Button
        variant="outline"
        size="sm"
        onClick={() => window.open(`${process.env.NEXT_PUBLIC_BASE_URL}${row.original.file_path}`, "_blank")}
      >
        View
      </Button>
    ),
  },
];

const regulationsColumns: ColumnDef<RegulationsType>[] = [
  { accessorKey: "file_name", header: "Name" },
  {
    accessorKey: "file_path",
    header: "File",
    cell: ({ row }) => (
      <Button
        variant="outline"
        onClick={() => window.open(`${process.env.NEXT_PUBLIC_BASE_URL}${row.original.file_path}`, "_blank")}
      >
        View
      </Button>
    ),
  },
];

const formsColumns: ColumnDef<FormsType>[] = [
  { accessorKey: "file_name", header: "Name" },
  {
    accessorKey: "file_path",
    header: "File",
    cell: ({ row }) => (
      <Button
        variant="outline"
        size="sm"
        onClick={() => window.open(`${process.env.NEXT_PUBLIC_BASE_URL}${row.original.file_path}`, "_blank")}
      >
        View
      </Button>
    ),
  },
];

const auditReportsColumns: ColumnDef<AuditReportType>[] = [
  { accessorKey: "year", header: "Year" },
  {
    accessorKey: "file_path",
    header: "File",
    cell: ({ row }) => (
      <Button
        variant="outline"
        size="sm"
        onClick={() => window.open(`${process.env.NEXT_PUBLIC_BASE_URL}${row.original.file_path}`, "_blank")}
      >
        View
      </Button>
    ),
  },
];


function DataTable<TData>({
  columns,
  data,
  globalFilter,
  setPaginationInfo, // New Prop
}: {
  columns: ColumnDef<TData>[];
  data: TData[];
  globalFilter: string;
  setPaginationInfo: (pagination: { pageIndex: number; pageCount: number; canNext: boolean; canPrev: boolean; nextPage: () => void; prevPage: () => void }) => void;
}) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: (row, columnId, filterValue) => {
      return Object.values(row.original)
        .join(" ")
        .toLowerCase()
        .includes(filterValue.toLowerCase());
    },
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  // Send pagination info to parent
  useEffect(() => {
    setPaginationInfo({
      pageIndex: table.getState().pagination.pageIndex + 1,
      pageCount: table.getPageCount(),
      canNext: table.getCanNextPage(),
      canPrev: table.getCanPreviousPage(),
      nextPage: table.nextPage,
      prevPage: table.previousPage,
    });
  }, [table.getState().pagination]);

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}



export default function FinancialPublicationPage() {
  const [officeReportsData, setOfficeReportsData] = useState<OfficeReportsType[]>([]);
  const [regulationsData, setRegulationsData] = useState<RegulationsType[]>([]);
  const [formsData, setFormsData] = useState<FormsType[]>([]);
  const [auditReportsData, setAuditReportsData] = useState<AuditReportType[]>([]);
  const [globalFilter, setGlobalFilter] = useState(""); // Centralized search state
  const [paginationInfo, setPaginationInfo] = useState({
    pageIndex: 1,
    pageCount: 1,
    canNext: false,
    canPrev: false,
    nextPage: () => {},
    prevPage: () => {},
  });
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollTabs = (offset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += offset;
    }
  };
  
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/fetch-office-reports`)
      .then((res) => res.json())
      .then((data) => setOfficeReportsData(data))
      .catch(console.error);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/fetch-regulations`)
      .then((res) => res.json())
      .then((data) => setRegulationsData(data))
      .catch(console.error);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/fetch-Forms`)
      .then((res) => res.json())
      .then((data) => setFormsData(data))
      .catch(console.error);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/fetch-audit-reports`)
      .then((res) => res.json())
      .then((data) => setAuditReportsData(data))
      .catch(console.error);
  }, []);

  return (
    <Tabs defaultValue="annual-reports">

     <div className="header">
     <div className="relative flex items-center w-full">
      {/* Left Scroll Button (Hidden on large screens) */}
      <button className="absolute left-0  rounded-lg hover:bg-gray-300 block sm:hidden w-6 h-6 bg-opacity-50 backdrop-blur-lg"
        onClick={() => document.getElementById("tabs-container")?.scrollBy({ left: -100, behavior: "smooth" })}
      >
        ‹
      </button>

        {/* Scrollable Tabs Container */}
        <div id="tabs-container" className="w-full overflow-x-auto scroll-smooth flex space-x-2 px-2">
          <TabsList className="flex w-max items-center space-x-2">
            <TabsTrigger value="annual-reports" className="text-xs sm:text-sm">
              Annual Reports
            </TabsTrigger>
            <TabsTrigger value="regulations" className="text-xs sm:text-sm">
              Regulations
            </TabsTrigger>
            <TabsTrigger value="forms" className="text-xs sm:text-sm">
              Forms
            </TabsTrigger>
            <TabsTrigger value="audit-reports" className="text-xs sm:text-sm">
              Audited Reports
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Right Scroll Button (Hidden on large screens) */}
        <button  className="absolute right-0  rounded-lg hover:bg-gray-300 block sm:hidden w-6 h-6 bg-opacity-50 backdrop-blur-lg"
          onClick={() => document.getElementById("tabs-container")?.scrollBy({ left: 100, behavior: "smooth" })}
        >
          ›
        </button>
      </div>
      {/* Search Input - Placed above the card */}
      <div className="flex justify-between items-center my-4">
        <Input
          placeholder="Search..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="max-w-md"
        />
      </div>
     </div>

      {/* Annual Reports Tab */}
      <TabsContent value="annual-reports">
        <Card>
          <CardContent>
            <DataTable columns={officeReportsColumns} data={officeReportsData} globalFilter={globalFilter} setPaginationInfo={setPaginationInfo} />
          </CardContent>
        </Card>
      </TabsContent>

      {/* Regulations Tab */}
      <TabsContent value="regulations">
        <Card>
          <CardContent>
            <DataTable columns={regulationsColumns} data={regulationsData} globalFilter={globalFilter} setPaginationInfo={setPaginationInfo} />
          </CardContent>
        </Card>
      </TabsContent>

      {/* Forms Tab */}
      <TabsContent value="forms">
        <Card>
          <CardContent>
            <DataTable columns={formsColumns} data={formsData} globalFilter={globalFilter} setPaginationInfo={setPaginationInfo} />
          </CardContent>
        </Card>
      </TabsContent>

      {/* Audited Reports Tab */}
      <TabsContent value="audit-reports">
        <Card>
          <CardContent>
            <DataTable columns={auditReportsColumns} data={auditReportsData} globalFilter={globalFilter} setPaginationInfo={setPaginationInfo} />
          </CardContent>
        </Card>
      </TabsContent>

      {/* Pagination - Placed outside the card */}
      <div className="flex items-center justify-end gap-2 mt-4">
        <span className="text-sm text-gray-600">
          Page {paginationInfo.pageIndex} of {paginationInfo.pageCount}
        </span>
        <Button variant="outline" size="sm" onClick={paginationInfo.prevPage} disabled={!paginationInfo.canPrev}>
          Previous
        </Button>
        <Button variant="outline" size="sm" onClick={paginationInfo.nextPage} disabled={!paginationInfo.canNext}>
          Next
        </Button>
      </div>
    </Tabs>
  );
}


