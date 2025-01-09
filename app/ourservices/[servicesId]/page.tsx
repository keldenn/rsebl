"use client"
import { cn } from "@/lib/utils";
import AreaClosedChart from "../../../components/chart/AreaClosedChart";
import { useParams } from "next/navigation";

const staticChartData = [
  { date: "2023-12-01", close: "150.00" },
  { date: "2023-12-02", close: "152.00" },
  { date: "2023-12-03", close: "155.00" },
  { date: "2023-12-04", close: "153.00" },
  { date: "2023-12-05", close: "158.00" },
];

const staticQuoteData = {
  fullExchangeName: "NASDAQ",
  shortName: "Apple Inc.",
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
  "1d": "",
  "1w": "Past Week",
  "1m": "Past Month",
  "3m": "Past 3 Months",
  "1y": "Past Year",
};

export default function StaticStockChart() {
  const params = useParams();
  const scriptId = params?.scriptId;
  const range = "1m";
  const priceChange = 5.33;

  return (
    <div className="h-[27.5rem] w-full">
      <div>
        <div className="space-x-1 text-muted-foreground">
          <span className="font-bold text-primary">{scriptId}</span>
          <span>·</span>
          <span>{staticQuoteData.fullExchangeName}</span>
          <span>{staticQuoteData.shortName}</span>
        </div>

        <div className="flex flex-row items-end justify-between">
          <div className="space-x-1">
            <span className="text-nowrap">
              <span className="text-xl font-bold">
                {staticQuoteData.currency === "USD" ? "$" : ""}
                {staticQuoteData.regularMarketPrice.toFixed(2)}
              </span>
              <span className="font-semibold">
                {staticQuoteData.regularMarketChange > 0 ? (
                  <span className="text-green-800 dark:text-green-400">
                    +{staticQuoteData.regularMarketChange.toFixed(2)} (+
                    {staticQuoteData.regularMarketChangePercent.toFixed(2)}%)
                  </span>
                ) : (
                  <span className="text-red-800 dark:text-red-500">
                    {staticQuoteData.regularMarketChange.toFixed(2)} (
                    {staticQuoteData.regularMarketChangePercent.toFixed(2)}%)
                  </span>
                )}
              </span>
            </span>
            <span className="inline space-x-1 font-semibold text-muted-foreground">
              {staticQuoteData.hasPrePostMarketData && staticQuoteData.postMarketPrice && (
                <>
                  <span>·</span>
                  <span>
                    Post-Market: {staticQuoteData.currency === "USD" ? "$" : ""}
                    {staticQuoteData.postMarketPrice.toFixed(2)}
                  </span>
                  <span>
                    {staticQuoteData.postMarketChange > 0 ? (
                      <span className="text-green-800 dark:text-green-400">
                        +{staticQuoteData.postMarketChange.toFixed(2)} (+
                        {staticQuoteData.postMarketChangePercent.toFixed(2)}%)
                      </span>
                    ) : (
                      <span className="text-red-800 dark:text-red-500">
                        {staticQuoteData.postMarketChange.toFixed(2)} (
                        {staticQuoteData.postMarketChangePercent.toFixed(2)}%)
                      </span>
                    )}
                  </span>
                </>
              )}
              {staticQuoteData.hasPrePostMarketData && staticQuoteData.preMarketPrice && (
                <>
                  <span>·</span>
                  <span>
                    Pre-Market: {staticQuoteData.currency === "USD" ? "$" : ""}
                    {staticQuoteData.preMarketPrice.toFixed(2)}
                  </span>
                  <span>
                    {staticQuoteData.preMarketChange > 0 ? (
                      <span className="text-green-800 dark:text-green-400">
                        +{staticQuoteData.preMarketChange.toFixed(2)} (+
                        {staticQuoteData.preMarketChangePercent.toFixed(2)}%)
                      </span>
                    ) : (
                      <span className="text-red-800 dark:text-red-500">
                        {staticQuoteData.preMarketChange.toFixed(2)} (
                        {staticQuoteData.preMarketChangePercent.toFixed(2)}%)
                      </span>
                    )}
                  </span>
                </>
              )}
            </span>
          </div>
          <span className="space-x-1 whitespace-nowrap font-semibold">
            {priceChange !== 0 && staticRangeTextMapping[range] !== "" && (
              <span
                className={cn(
                  priceChange > 0
                    ? "text-green-800 dark:text-green-400"
                    : "text-red-800 dark:text-red-500"
                )}
              >
                {priceChange > 0
                  ? `+${priceChange.toFixed(2)}%`
                  : `${priceChange.toFixed(2)}%`}
              </span>
            )}
            <span className="text-muted-foreground">
              {staticRangeTextMapping[range]}
            </span>
          </span>
        </div>
      </div>
      {staticChartData.length === 0 && (
        <div className="flex h-full items-center justify-center text-center text-neutral-500">
          No data available
        </div>
      )}
      {staticChartData.length > 0 && (
        <AreaClosedChart chartQuotes={staticChartData} range={range} />
      )}
    </div>
  );
}
