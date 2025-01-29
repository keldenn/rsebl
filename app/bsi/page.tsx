"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import AreaClosedChartBsi from "@/components/chart/AreaClosedChartBsi";

export default function DynamicStockChart() {
  const [chartData, setChartData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTimeFilter, setSelectedTimeFilter] = useState("All");
  const [bsi, setBsi] = useState(null);
  const [ptChange, setPtChange] = useState(null);
  const [percentageChange, setPercentageChange] = useState(null);

  const timeFilters = ["1M", "3M", "6M", "1Y", "All"];

  // Fetch BSI and point change
  useEffect(() => {
    async function fetchBsiData() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/fetch-BSI`);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        if (data.length > 0) {
          const index = parseFloat(data[0].index);
          const change = parseFloat(data[0].ptChange);
          setBsi(index.toFixed(2));
          setPtChange(change.toFixed(2));

          // Calculate percentage change
          if (index !== 0) {
            const percentChange = ((change / index) * 100).toFixed(2);
            setPercentageChange(percentChange);
          }
        }
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    }

    fetchBsiData();
  }, []);

  // Fetch chart data
  useEffect(() => {
    async function fetchChartData() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/fetch-indices`);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        const transformedData = data.map(([timestamp, index]) => ({
          date: new Date(timestamp).toISOString().split("T")[0],
          close: index,
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
  }, []);

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

  const handleTimeFilterChange = (filter) => {
    setSelectedTimeFilter(filter);
  };

  return (
    <div className="h-auto w-full px-4 py-6 md:px-8">
      <div className="mb-4">
        <div className="flex flex-col space-y-1 md:flex-row md:items-center md:space-y-0 md:space-x-2">
          <span className="font-bold text-primary text-lg md:text-xl">Bhutan Stock Index</span>
          <span className="text-muted-foreground">·</span>
          <span className="text-muted-foreground">BSI</span>
        </div>

        <div className="flex flex-col md:flex-row md:justify-between md:items-end mt-3">
          <div className="space-y-2">
            <span className="block text-base text-muted-foreground">
              BSI: {bsi || "N/A"}{" "}
              <span
                className={cn(
                  "font-semibold",
                  ptChange > 0 ? "text-green-600" : ptChange < 0 ? "text-red-600" : "text-muted-foreground"
                )}
              >
                {ptChange || "N/A"} pts{" "}
                ({percentageChange !== null ? `${percentageChange}%` : "N/A"})
              </span>
            </span>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex space-x-2">
          {timeFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => handleTimeFilterChange(filter)}
              className={cn(
                "px-4 py-2 rounded-md font-semibold border",
                selectedTimeFilter === filter
                  ? "bg-custom-1 text-white"
                  : "bg-background hover:bg-blue-100"
              )}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

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
      </div>
    </div>
  );
}

