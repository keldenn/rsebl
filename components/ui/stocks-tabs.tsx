"use client";

import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { cn } from "@/lib/utils"


const StockTabs = () => {
  const [data, setData] = useState({
    risers: [],
    fallers: [],
    volumeLeaders: [],
  });
  const [selectedTab, setSelectedTab] = useState("risers");

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [risersRes, fallersRes, volumeRes] = await Promise.all([
          fetch(`${API_URL}/fetch-top-gainers-new`).then((res) => res.json()),
          fetch(`${API_URL}/fetch-top-losers-new`).then((res) => res.json()),
          fetch(`${API_URL}/fetch-top-volume`).then((res) => res.json()),
        ]);

        setData({
          risers: risersRes.map((stock) => {
            const currentPrice = parseFloat(stock.currentPrice);
            const priceChange = parseFloat(stock.price);
            const previousPrice = currentPrice - priceChange;
            const percentageChange = previousPrice !== 0 ? (priceChange / previousPrice) * 100 : 0;

            return {
              ticker: stock.symbol,
              name: stock.name,
              price: currentPrice.toFixed(2),
              change: priceChange.toFixed(2),
              percent: `${percentageChange.toFixed(2)}%`,
            };
          }),
          fallers: fallersRes.map((stock) => {
            const currentPrice = parseFloat(stock.price);
            const priceChange = parseFloat(stock.changes);
            const previousPrice = currentPrice - priceChange;
            const percentageChange = previousPrice !== 0 ? (priceChange / previousPrice) * 100 : 0;

            return {
              ticker: stock.symbol,
              name: stock.name,
              price: currentPrice.toFixed(2),
              change: priceChange.toFixed(2),
              percent: `${percentageChange.toFixed(2)}%`,
            };
          }),
          volumeLeaders: volumeRes.map((stock) => ({
            ticker: stock.symbol,
            name: stock.name,
            price: "N/A", // Volume data does not include price
            change: stock.lot,
            percent: "N/A", // Volume data does not include percent
          })),
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [API_URL]);

  return (
    <div className="w-full rounded-xl border bg-card text-card-foreground shadow p-4 max-w-full mx-auto">
      <Tabs
        defaultValue="risers"
        onValueChange={(value) => setSelectedTab(value)} // Track selected tab
      >
        <TabsList>
          <TabsTrigger value="risers">Risers</TabsTrigger>
          <TabsTrigger value="fallers">Fallers</TabsTrigger>
          <TabsTrigger value="volumeLeaders">Volume Leaders</TabsTrigger>
        </TabsList>

        <TabsContent value="risers">
          <StockTable stocks={data.risers} selectedTab={selectedTab} />
        </TabsContent>
        <TabsContent value="fallers">
          <StockTable stocks={data.fallers} selectedTab={selectedTab} />
        </TabsContent>
        <TabsContent value="volumeLeaders">
          <StockTable stocks={data.volumeLeaders} selectedTab={selectedTab} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

const StockTable = ({ stocks, selectedTab }) => (
  <div className="p-2 rounded-xl bg-card text-card-foreground">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Sym</TableHead>
          <TableHead>Name</TableHead>
          {selectedTab !== "volumeLeaders" && <TableHead>Price</TableHead>}
          {selectedTab === "volumeLeaders" ? <TableHead>Volume</TableHead> : <TableHead>Change</TableHead>}
          {selectedTab !== "volumeLeaders" && <TableHead>% Change</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {stocks.map((stock, index) => (
          <TableRow key={index}>
            <TableCell>{stock.ticker}</TableCell>
            <TableCell>{stock.name}</TableCell>
            {selectedTab !== "volumeLeaders" && <TableCell>{stock.price}</TableCell>}
            <TableCell
              className={stock.change.startsWith("-") ? "text-red-600" : "text-green-600"}
            >
              {stock.change}
            </TableCell>
            {selectedTab !== "volumeLeaders" && (
              <TableCell>
              <div className="flex">
                <div
                  className={cn(
                    "w-[4rem] min-w-fit rounded-md px-2 py-0.5 text-right",
                    parseFloat(stock.percent) > 0
                      ? "bg-green-300 text-green-800 dark:bg-green-950 dark:text-green-400"
                      : parseFloat(stock.percent) < 0
                      ? "bg-red-300 text-red-800 dark:bg-red-950 dark:text-red-500"
                      : "bg-gray-300 text-gray-800 dark:bg-gray-900 dark:text-gray-400" // Gray if value is zero
                  )}
                >
                  {stock.percent}
                </div>
              </div>
                      </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);


export default StockTabs;
