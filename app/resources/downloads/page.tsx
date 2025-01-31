"use client";

import React, { useEffect, useState, useCallback } from "react";
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
}: {
  columns: ColumnDef<TData>[];
  data: TData[];
}) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [globalFilter, setGlobalFilter] = useState("");

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
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, columnId, filterValue) => {
      return Object.values(row.original)
        .join(" ")
        .toLowerCase()
        .includes(filterValue.toLowerCase());
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center justify-between pb-4 mt-4">
        <Input
          placeholder="Search..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="max-w-md"
        />
      </div>
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
      <div className="flex items-center justify-between mt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <span className="text-sm text-gray-600">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default function FinancialPublicationPage() {
  const [officeReportsData, setOfficeReportsData] = useState<OfficeReportsType[]>([]);
  const [regulationsData, setRegulationsData] = useState<RegulationsType[]>([]);
  const [formsData, setFormsData] = useState<FormsType[]>([]);
  const [auditReportsData, setAuditReportsData] = useState<AuditReportType[]>([]);

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
      <TabsList>
        <TabsTrigger value="annual-reports">Annual Reports</TabsTrigger>
        <TabsTrigger value="regulations">Regulations</TabsTrigger>
        <TabsTrigger value="forms">Forms</TabsTrigger>
        <TabsTrigger value="audit-reports">Audited Reports</TabsTrigger>
      </TabsList>

      {/* Annual Reports Tab */}
      <TabsContent value="annual-reports">
        <Card>
          <CardContent>
            <DataTable columns={officeReportsColumns} data={officeReportsData} />
          </CardContent>
        </Card>
      </TabsContent>

      {/* Regulations Tab */}
      <TabsContent value="regulations">
        <Card>
          <CardContent>
            <DataTable columns={regulationsColumns} data={regulationsData} />
          </CardContent>
        </Card>
      </TabsContent>

      {/* Forms Tab */}
      <TabsContent value="forms">
        <Card>
          <CardContent>
            <DataTable columns={formsColumns} data={formsData} />
          </CardContent>
        </Card>
      </TabsContent>

      {/* Audited Reports Tab (Fix: Corrected value from `audit-reports` to match the trigger) */}
      <TabsContent value="audit-reports">
        <Card>
          <CardContent>
            <DataTable columns={auditReportsColumns} data={auditReportsData} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

