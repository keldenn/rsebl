"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"; // Reuse the provided table component

const StockTabs = () => {
  const data = {
    risers: [
      { ticker: "BA.", name: "BAE SYSTEMS PLC", price: "1,190.00", change: "36.00", percent: "3.12%" },
      { ticker: "PSH", name: "PERSHING SQUARE HOLDINGS LTD", price: "4,116.00", change: "98.00", percent: "2.44%" },
      { ticker: "STAN", name: "STANDARD CHARTERED PLC", price: "1,007.50", change: "20.50", percent: "2.08%" },
    ],
    fallers: [
      { ticker: "XYZ", name: "XYZ COMPANY", price: "920.00", change: "-25.00", percent: "-2.50%" },
      { ticker: "DEF", name: "DEF CORP", price: "600.00", change: "-10.00", percent: "-1.66%" },
      { ticker: "BJG", name: "BJG CORP", price: "200.00", change: "-110.00", percent: "-20.66%" },
    ],
    volumeLeaders: [
      { ticker: "LSEG", name: "LONDON STOCK EXCHANGE GRO...", price: "11,615.00", change: "190.00", percent: "1.66%" },
      { ticker: "ANTO", name: "ANTOFAGASTA PLC", price: "1,664.00", change: "30.50", percent: "1.87%" },
      { ticker: "BJD", name: "BJKLSKD PLC", price: "1,264.00", change: "39.50", percent: "4.87%" },
    ],
  };

  return (
    <div className="w-full rounded-xl border bg-card text-card-foreground shadow p-4 max-w-full mx-auto">
      <Tabs defaultValue="risers" >
        {/* Tabs Navigation */}
        <TabsList className="">
          <TabsTrigger value="risers">Risers</TabsTrigger>
          <TabsTrigger value="fallers">Fallers</TabsTrigger>
          <TabsTrigger value="volumeLeaders">Volume Leaders</TabsTrigger>
        </TabsList>

        {/* Tabs Content */}
        <TabsContent value="risers">
          <StockTable stocks={data.risers} />
        </TabsContent>
        <TabsContent value="fallers">
          <StockTable stocks={data.fallers} />
        </TabsContent>
        <TabsContent value="volumeLeaders">
          <StockTable stocks={data.volumeLeaders} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

const StockTable = ({ stocks }) => (
  <div className="p-2 rounded-xl bg-card text-card-foreground">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Ticker</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Change</TableHead>
          <TableHead>%</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {stocks.map((stock, index) => (
          <TableRow key={index}>
            <TableCell>{stock.ticker}</TableCell>
            <TableCell>{stock.name}</TableCell>
            <TableCell>{stock.price}</TableCell>
            <TableCell
              className={stock.change.startsWith("-") ? "text-red-600" : "text-green-600"}
            >
              {stock.change}
            </TableCell>
            <TableCell
              className={stock.percent.startsWith("-") ? "text-red-600" : "text-green-600"}
            >
              {stock.percent}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

export default StockTabs;
