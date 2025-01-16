"use client";

import { cn } from "@/lib/utils";
import AreaClosedChart from "@/components/chart/AreaClosedChart";
import { useParams } from "next/navigation";

const staticChartData = [
  { date: "2023-12-01", close: 150.0 },
  { date: "2023-12-02", close: 152.0 },
  { date: "2023-12-03", close: 155.0 },
  { date: "2023-12-04", close: 153.0 },
  { date: "2023-12-05", close: 158.0 },
];

const staticQuoteData = {
  fullExchangeName: "BSI",
  shortName: "",
  currency: "USD",
  regularMarketPrice: 158.0,
  regularMarketChange: 2.0,
  regularMarketChangePercent: 1.28,
  postMarketPrice: 157.5,
  postMarketChange: -0.5,
  postMarketChangePercent: -0.32,
  preMarketPrice: 159.0,
  preMarketChange: 1.0,
  preMarketChangePercent: 0.63,
  hasPrePostMarketData: true,
};

const staticRangeTextMapping = {
  "1d": "Today",
  "1w": "Past Week",
  "1m": "Past Month",
  "3m": "Past 3 Months",
  "1y": "Past Year",
};

export default function StaticStockChart() {
  const params = useParams();
  //const scriptId = params?.scriptId || "Unknown Script";
  const range = "1m";
  const priceChange = 5.33;

  return (
    <div className="h-auto w-full px-4 py-6 md:px-8">
      <div className="mb-4">
        <div className="flex flex-col space-y-1 md:flex-row md:items-center md:space-y-0 md:space-x-2">
          <span className="font-bold text-primary text-lg md:text-xl">Bhutan Stock Index</span>
          <span className="text-muted-foreground">·</span>
          <span className="text-muted-foreground">{staticQuoteData.fullExchangeName}</span>
          <span className="text-muted-foreground">{staticQuoteData.shortName}</span>
        </div>

        <div className="flex flex-col md:flex-row md:justify-between md:items-end mt-3">
          <div className="space-y-2">
            <span className="block text-2xl font-bold">
              {staticQuoteData.currency === "USD" ? "$" : ""}
              {staticQuoteData.regularMarketPrice.toFixed(2)}
            </span>

            <span className="font-semibold">
              {staticQuoteData.regularMarketChange > 0 ? (
                <span className="text-green-700 dark:text-green-400">
                  +{staticQuoteData.regularMarketChange.toFixed(2)} (+
                  {staticQuoteData.regularMarketChangePercent.toFixed(2)}%)
                </span>
              ) : (
                <span className="text-red-700 dark:text-red-400">
                  {staticQuoteData.regularMarketChange.toFixed(2)} (
                  {staticQuoteData.regularMarketChangePercent.toFixed(2)}%)
                </span>
              )}
            </span>

            {staticQuoteData.hasPrePostMarketData && (
              <div className="text-muted-foreground">
                <span>
                  Pre-Market: {staticQuoteData.currency === "USD" ? "$" : ""}
                  {staticQuoteData.preMarketPrice.toFixed(2)} (
                  {staticQuoteData.preMarketChange > 0 ? (
                    <span className="text-green-700 dark:text-green-400">
                      +{staticQuoteData.preMarketChange.toFixed(2)} (+
                      {staticQuoteData.preMarketChangePercent.toFixed(2)}%)
                    </span>
                  ) : (
                    <span className="text-red-700 dark:text-red-400">
                      {staticQuoteData.preMarketChange.toFixed(2)} (
                      {staticQuoteData.preMarketChangePercent.toFixed(2)}%)
                    </span>
                  )})
                </span>

                <span className="ml-4">
                  Post-Market: {staticQuoteData.currency === "USD" ? "$" : ""}
                  {staticQuoteData.postMarketPrice.toFixed(2)} (
                  {staticQuoteData.postMarketChange > 0 ? (
                    <span className="text-green-700 dark:text-green-400">
                      +{staticQuoteData.postMarketChange.toFixed(2)} (+
                      {staticQuoteData.postMarketChangePercent.toFixed(2)}%)
                    </span>
                  ) : (
                    <span className="text-red-700 dark:text-red-400">
                      {staticQuoteData.postMarketChange.toFixed(2)} (
                      {staticQuoteData.postMarketChangePercent.toFixed(2)}%)
                    </span>
                  )})
                </span>
              </div>
            )}
          </div>

          {priceChange !== 0 && staticRangeTextMapping[range] && (
            <div className="mt-4 md:mt-0 text-right">
              <span
                className={cn(
                  "text-lg font-semibold",
                  priceChange > 0
                    ? "text-green-700 dark:text-green-400"
                    : "text-red-700 dark:text-red-400"
                )}
              >
                {priceChange > 0
                  ? `+${priceChange.toFixed(2)}%`
                  : `${priceChange.toFixed(2)}%`}
              </span>
              <span className="block text-muted-foreground">
                {staticRangeTextMapping[range]}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="relative h-[300px] md:h-[400px]">
        {staticChartData.length === 0 ? (
          <div className="flex h-full items-center justify-center text-center text-neutral-500">
            No data available
          </div>
        ) : (
          <AreaClosedChart chartQuotes={staticChartData} range={range} />
        )}
      </div>
    </div>
  );
}
