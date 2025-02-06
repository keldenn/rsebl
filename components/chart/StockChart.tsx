"use client";

import { useEffect, useState } from "react";
import AreaClosedChartBsi from "@/components/chart/AreaClosedChartBsi";
import { Button } from "@/components/ui/button";

export default function StockChart({ ticker }) {
  const [chartData, setChartData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTimeFilter, setSelectedTimeFilter] = useState("All");
  const [stockInfo, setStockInfo] = useState(null);

  const timeFilters = ["1M", "3M", "6M", "1Y", "All"];

  useEffect(() => {
    async function fetchStockInfo() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/fetch-listed-scripts`);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        const matchedStock = data.find((stock) => stock.symbol === ticker);
        if (matchedStock) {
          const currentPrice = matchedStock.currentPrice;
          const priceChange = matchedStock.price;
          const previousPrice = currentPrice - priceChange;
        
          // Correct percentage calculation
          const percentageChange = previousPrice !== 0 
            ? ((priceChange / previousPrice) * 100).toFixed(2)
            : "0.00";
        
          // Add the "+" sign for positive percentage change
          matchedStock.percentageChange = percentageChange > 0 
            ? `+${percentageChange}`
            : percentageChange;
        
          setStockInfo(matchedStock);
        }
        
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    }

    fetchStockInfo();
  }, [ticker]);

  useEffect(() => {
    async function fetchChartData() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/fetch-price-movement/${ticker}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        const transformedData = data.map(([timestamp, price]) => ({
          date: new Date(timestamp).toISOString().split("T")[0],
          close: price,
        }));
        setChartData(transformedData);
        setFilteredData(transformedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchChartData();
  }, [ticker]);

  const filterDataByTime = (data) => {
    const today = new Date();
    const timePeriods = {
      "1M": 30,
      "3M": 90,
      "6M": 180,
      "1Y": 365,
      All: Infinity,
    };

    const daysToInclude = timePeriods[selectedTimeFilter];
    return data.filter((point) => {
      const differenceInDays = (today - new Date(point.date)) / (1000 * 60 * 60 * 24);
      return differenceInDays <= daysToInclude;
    });
  };

  useEffect(() => {
    if (chartData.length > 0) {
      const filtered = filterDataByTime(chartData);
      setFilteredData(filtered);
    }
  }, [selectedTimeFilter, chartData]);

  return (
    <div className="h-auto w-full">
      {stockInfo && (
        <div className="mb-4">
          <div className="flex flex-col space-y-1 md:flex-row md:items-center md:space-y-0 md:space-x-2">
            <span className="font-bold text-primary text-lg">{stockInfo.symbol}</span>
            <span className="text-muted-foreground">·</span>
            <span className="text-muted-foreground text-sm">{stockInfo.name}</span>
          </div>
          <div className="flex flex-col md:flex-row md:justify-between md:items-end">
            <div className="space-y-2">
              <span className="font-bold text-primary">
                {stockInfo.currentPrice} {" "}
                <span
                  className={
                    stockInfo.price > 0
                      ? "text-green-600 font-semibold text-sm"
                      : stockInfo.price < 0
                      ? "text-red-600 font-semibold text-sm"
                      : "text-muted-foreground font-semibold text-sm"
                  }
                >
                  {stockInfo.price > 0 ? `+${stockInfo.price}` : stockInfo.price} ({stockInfo.percentageChange}%)
                </span>
              </span>
            </div>
          </div>
        </div>
      )}
      <div className="relative h-[300px] md:h-[400px]">
        {isLoading ? (
          <div className="flex h-full items-center justify-center text-center text-neutral-500">
            Loading data...
          </div>
        ) : error ? (
          <div className="flex h-full items-center justify-center text-center text-red-500">
            {error}
          </div>
        ) : filteredData.length === 0 ? (
          <div className="flex h-full items-center justify-center text-center text-neutral-500">
            No data available
          </div>
        ) : (
          <AreaClosedChartBsi chartQuotes={filteredData} range={selectedTimeFilter} />
        )}
        <div className="my-4">
          <div className="flex space-x-2">
            {timeFilters.map((filter) => (
              <Button
                variant={"ghost"}
                key={filter}
                onClick={() => setSelectedTimeFilter(filter)}
                className={selectedTimeFilter === filter ? "bg-accent font-bold text-accent-foreground" : "text-muted-foreground"}
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
