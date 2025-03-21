"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import React, { useState, useEffect } from "react";

const sectors = {
  Banking: ["BNBL", "TBL", "DPNB"],
  Insurance: ["RICBL", "BIL"],
  Manufacturing: ["BFAL", "DFAL", "BPCL", "DPL", "BCCL"],
};

const apiEndpoints = {
  BNBL: `${process.env.NEXT_PUBLIC_API_URL}/fetch-price-movement/BNBL`,
  TBL: `${process.env.NEXT_PUBLIC_API_URL}/fetch-price-movement/TBL`,
  DPNB: `${process.env.NEXT_PUBLIC_API_URL}/fetch-price-movement/DPNB`,
  RICBL: `${process.env.NEXT_PUBLIC_API_URL}/fetch-price-movement/RICB`,
  BIL: `${process.env.NEXT_PUBLIC_API_URL}/fetch-price-movement/BIL`,
  BFAL: `${process.env.NEXT_PUBLIC_API_URL}/fetch-price-movement/BFAL`,
  DFAL: `${process.env.NEXT_PUBLIC_API_URL}/fetch-price-movement/DFAL`,
  BPCL: `${process.env.NEXT_PUBLIC_API_URL}/fetch-price-movement/BPCL`,
  DPL: `${process.env.NEXT_PUBLIC_API_URL}/fetch-price-movement/DPL`,
  BCCL: `${process.env.NEXT_PUBLIC_API_URL}/fetch-price-movement/BCCL`,
};

export default function PriceComparison() {
  const [selectedSector, setSelectedSector] = useState("Banking");
  const [selectedTimeFilter, setSelectedTimeFilter] = useState("All");
  const [sectorData, setSectorData] = useState([]);

  const timeFilters = ["1M", "3M", "6M", "1Y", "All"];

  useEffect(() => {
    const fetchData = async () => {
      const companies = sectors[selectedSector];
      const dataPromises = companies.map(async (company) => {
        const response = await fetch(apiEndpoints[company]);
        const rawData = await response.json();
        const data = Array.isArray(rawData) ? rawData : [];
        return {
          company,
          data: data.map(([timestamp, price]) => ({
            date: new Date(timestamp),
            price,
          })),
        };
      });
      const results = await Promise.all(dataPromises);
      setSectorData(results);
    };
    fetchData();
  }, [selectedSector]);

  const handleSectorChange = (event) => {
    setSelectedSector(event.target.value);
  };

  const handleTimeFilterChange = (filter) => {
    setSelectedTimeFilter(filter);
  };

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
      const differenceInDays = (today - point.date) / (1000 * 60 * 60 * 24);
      return differenceInDays <= daysToInclude;
    });
  };

  const filteredData = sectorData.map((company) => ({
    ...company,
    data: filterDataByTime(company.data),
  }));

  const chartDataMap = new Map();
  filteredData.forEach((company) => {
    company.data.forEach(({ date, price }) => {
      const formattedDate = date.toLocaleDateString(undefined, { month: "short", year: "numeric" });
      if (!chartDataMap.has(formattedDate)) {
        chartDataMap.set(formattedDate, { month: formattedDate });
      }
      chartDataMap.get(formattedDate)[company.company] = price;
    });
  });
  const chartData = Array.from(chartDataMap.values());

  const chartConfig = {
    BNBL: { label: "BNBL", color: "#3A2A76" },
    TBL: { label: "TBL", color: "#205A8A" },
    DPNB: { label: "DPNB", color: "#7E3BF2" },
    RICBL: { label: "RICBL", color: "#73D13D" },
    BIL: { label: "BIL", color: "#F4A300" },
    BFAL: { label: "BFAL", color: "#FF5A5F" },
    DFAL: { label: "DFAL", color: "#00D1C1" },
    BPCL: { label: "BPCL", color: "#4ECDC4" },
    DPL: { label: "DPL", color: "#FF6F61" },
    BCCL: { label: "BCCL", color: "#FFB6C1" },
};

  return (
    <div className="flex flex-col gap-4 mt-6 px-4 md:px-8 lg:px-16">
      <div className="rounded-xl border bg-card shadow p-4">
        <label className="text-sm font-medium">Select Sector</label>
        <select
          value={selectedSector}
          onChange={handleSectorChange}
          className="w-full rounded-md border text-xs bg-background px-3 py-2 mt-2 mb-4"
        >
          {Object.keys(sectors).map((sector) => (
            <option key={sector} value={sector}>{sector}</option>
          ))}
        </select>
        <div className="flex flex-wrap gap-2">
          {timeFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => handleTimeFilterChange(filter)}
              className={`px-3 py-2 rounded-md text-xs ${selectedTimeFilter === filter ? "bg-custom-1 text-white" : "border"}`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
      <Card>
        <ChartContainer config={chartConfig}>
          <AreaChart data={chartData} className="w-full">
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" tickFormatter={(value) => value.slice(0, 3)} />
            <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
            {filteredData.map((company) => (
              <Area key={company.company} dataKey={company.company} stroke={chartConfig[company.company]?.color} fill={chartConfig[company.company]?.color} fillOpacity={0.4} />
            ))}
          </AreaChart>
        </ChartContainer>
      </Card>
    </div>
  );
}
