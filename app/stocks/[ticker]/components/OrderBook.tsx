"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

interface OrderBookProps {
  symbol: string;
}

const OrderBook: React.FC<OrderBookProps> = ({ symbol }) => {
  const [orderBook, setOrderBook] = useState<any[]>([]);

  useEffect(() => {
    const fetchOrderBook = async () => {
      try {
        const response = await fetch("https://cms.rsebl.org.bt/RSEB2020/api2/MarketWatch.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            OrderForEachSymbol: "OrderForEachSymbol",
            Symbol: symbol,
          }),
        });

        const data = await response.json();
        setOrderBook(data || []);
      } catch (error) {
        console.error("Error fetching order book:", error);
      }
    };

    fetchOrderBook();
  }, [symbol]);

  return (
    <>
      <div className="text-sm font-medium text-custom-1 mb-5">Order Book</div>
      <Card className="w-full h-fit pt-5 mt-0">
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-left font-semibold text-sm">Bid</TableHead>
                <TableHead className="text-center font-semibold text-sm">Price(Nu)</TableHead>
                <TableHead className="text-right font-semibold text-sm">Ask</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orderBook.length > 0 ? (
                orderBook.map((order, index) => (
                  <TableRow key={index}>
                    <TableCell className={`text-left ${order.BuyVol > 0 ? "text-green-800 dark:text-green-400" : "text-gray-400"} ${
                        order.Discovered == order.Price ? "bg-custom-1  text-white dark:bg-custom-1 dark:text-white font-bold" : ""
                      }`}>
                      {order.BuyVol}
                    </TableCell>
                    <TableCell
                      className={`text-center ${
                        order.Discovered == order.Price ? "bg-custom-1  text-white dark:bg-custom-1 font-bold" : ""
                      } `}
                    >
                      {order.Price}
                    </TableCell>
                    <TableCell className={`text-right ${order.SellVol > 0 ? "text-red-800 dark:text-red-400" : "text-gray-400"} ${
                        order.Discovered == order.Price ? "bg-custom-1  text-white dark:bg-custom-1 dark:text-white font-bold" : ""
                      }`}>
                      {order.SellVol}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-4 text-gray-500">
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
};

export default OrderBook;
