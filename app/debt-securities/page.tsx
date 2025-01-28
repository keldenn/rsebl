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

type BondMarketType = {
  symbol: string;
  price: number;
  date: string;
  volume: string;
  value: string;
  currentPrice: number;
};

type BondDataType = {
  id: number;
  security_name: string;
  start_date: string;
  end_date: string;
  maturity_period: number;
  rate: string;
  amount_issued: number;
  status: number;
};

type CommercialPaperType = {
  id: number;
  security_name: string;
  start_date: string;
  end_date: string;
  maturity_period: number;
  rate: string;
  amount_issued: number;
  status: number;
};

const bondMarketColumns: ColumnDef<BondMarketType>[] = [
  { accessorKey: "symbol", header: "Symbol" },
  { accessorKey: "currentPrice", header: "Market Price" },
  {
    accessorKey: "price",
    header: "Change",
    cell: ({ row }) => {
      const price = row.getValue("price");
      const priceValue = !isNaN(Number(price)) ? Number(price) : 0;
      const priceClass =
        priceValue > 0
          ? "text-green-600"
          : priceValue < 0
          ? "text-red-600"
          : "text-gray-600";

      return (
        <span className={priceClass}>
          {priceValue > 0 ? "+" : ""}
          {priceValue.toFixed(2)}
        </span>
      );
    },
  },
  { accessorKey: "volume", header: "Volume" },
  { accessorKey: "value", header: "Value" },
  { accessorKey: "date", header: "Last Trade Date" },
];

const bondsColumns: ColumnDef<BondDataType>[] = [
  { accessorKey: "security_name", header: "Name" },
  { accessorKey: "maturity_period", header: "Maturity Period" },
  { accessorKey: "rate", header: "Rate %" },
  { accessorKey: "amount_issued", header: "Amount Issued" },
  { accessorKey: "start_date", header: "Effective Date" },
  { accessorKey: "end_date", header: "Maturity Date" },
];

const commercialPaperColumns: ColumnDef<CommercialPaperType>[] = [
  { accessorKey: "security_name", header: "Name" },
  { accessorKey: "maturity_period", header: "Maturity Period" },
  { accessorKey: "rate", header: "Discount Rate %" },
  { accessorKey: "start_date", header: "Effective Date" },
  { accessorKey: "end_date", header: "Maturity Date" },
  { accessorKey: "amount_issued", header: "Amount Issued" },
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
  const [bondMarketData, setBondMarketData] = useState<BondMarketType[]>([]);
  const [bondsData, setBondsData] = useState<BondDataType[]>([]);
  const [commercialPapersData, setCommercialPapersData] = useState<CommercialPaperType[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/fetch-live-bond-market`)
      .then((res) => res.json())
      .then((data) => setBondMarketData(data))
      .catch(console.error);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/fetch-bonds`)
      .then((res) => res.json())
      .then((data) => setBondsData(data))
      .catch(console.error);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/fetch-commercialPapers`)
      .then((res) => res.json())
      .then((data) => setCommercialPapersData(data))
      .catch(console.error);
  }, []);

  return (
    <Tabs defaultValue="bonds">
      <TabsList>
        <TabsTrigger value="bonds">Bonds</TabsTrigger>
        <TabsTrigger value="commercial-papers">Commercial Papers</TabsTrigger>
      </TabsList>
      <TabsContent value="bonds">
        <Card className="mb-4">
          <CardContent>
            <DataTable columns={bondMarketColumns} data={bondMarketData} />
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <DataTable columns={bondsColumns} data={bondsData} />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="commercial-papers">
        <Card>
          <CardContent>
            <DataTable columns={commercialPaperColumns} data={commercialPapersData} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
