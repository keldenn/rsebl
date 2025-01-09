"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"; // Reuse the provided table component

const StockTabs = () => {
  const [activeTab, setActiveTab] = useState("risers");

  const data = {
    risers: [
      { ticker: "BA.", name: "BAE SYSTEMS PLC", price: "1,190.00", change: "36.00", percent: "3.12%" },
      { ticker: "PSH", name: "PERSHING SQUARE HOLDINGS LTD", price: "4,116.00", change: "98.00", percent: "2.44%" },
      { ticker: "STAN", name: "STANDARD CHARTERED PLC", price: "1,007.50", change: "20.50", percent: "2.08%" },
    ],
    fallers: [
      { ticker: "XYZ", name: "XYZ COMPANY", price: "920.00", change: "-25.00", percent: "-2.50%" },
      { ticker: "DEF", name: "DEF CORP", price: "600.00", change: "-10.00", percent: "-1.66%" },
    ],
    volumeLeaders: [
      { ticker: "LSEG", name: "LONDON STOCK EXCHANGE GRO...", price: "11,615.00", change: "190.00", percent: "1.66%" },
      { ticker: "ANTO", name: "ANTOFAGASTA PLC", price: "1,664.00", change: "30.50", percent: "1.87%" },
    ],
  };

  return (
    <div className="w-full rounded-xl border bg-card text-card-foreground shadow p-4 max-w-full mx-auto">
      {/* Tabs Navigation */}
      <div className="flex max-w-sm bg-muted/50 p-1 rounded-lg mb-1">
        {["risers", "fallers", "volumeLeaders"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "flex-1 py-2 text-sm font-medium text-center rounded-lg transition",
              activeTab === tab
                ? "bg-card text-foreground shadow"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab === "risers" && "Risers"}
            {tab === "fallers" && "Fallers"}
            {tab === "volumeLeaders" && "Volume Leaders"}
          </button>
        ))}
      </div>

      {/* Tabs Content */}
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
            {data[activeTab].map((stock, index) => (
              <TableRow key={index}>
                <TableCell>{stock.ticker}</TableCell>
                <TableCell>{stock.name}</TableCell>
                <TableCell>{stock.price}</TableCell>
                <TableCell
                  className={cn(
                    stock.change.startsWith("-") ? "text-red-600" : "text-green-600"
                  )}
                >
                  {stock.change}
                </TableCell>
                <TableCell
                  className={cn(
                    stock.percent.startsWith("-") ? "text-red-600" : "text-green-600"
                  )}
                >
                  {stock.percent}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default StockTabs;
