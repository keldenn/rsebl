"use client";

import { useEffect, useState } from "react";
import AreaClosedChartBsi from "./AreaClosedChartBsi";
import { Button } from "@/components/ui/button";

export default function MarketsChart({ data, ticker }) {
  const [filteredData, setFilteredData] = useState(data);
  const [selectedTimeFilter, setSelectedTimeFilter] = useState("All");

  const timeFilters = ["1M", "3M", "6M", "1Y", "All"];

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
    setFilteredData(filterDataByTime(data));
  }, [selectedTimeFilter, data]);

  // Get today's date in the format "Month Day, Year"
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });


  return (
    <>
      <div className="mb-0.5 font-medium">
        {ticker} - {formattedDate} {/* Display today's date */}
      </div>
      <div className="relative h-[400px] md:h-[400px]">
        {filteredData.length > 0 ? (
          <AreaClosedChartBsi chartQuotes={filteredData} range={selectedTimeFilter} />
        ) : (
          <div className="flex h-full items-center justify-center text-center text-neutral-500">
            No data available
          </div>
        )}
        <div className="my-4">
          <div className="flex space-x-2">
            {timeFilters.map((filter) => (
              <Button
                variant={"ghost"}
                key={filter}
                onClick={() => setSelectedTimeFilter(filter)}
                className={
                  selectedTimeFilter === filter
                    ? "bg-accent font-bold text-accent-foreground"
                    : "text-muted-foreground"
                }
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
