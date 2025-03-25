import { fetchQuoteSummaryNew } from "@/lib/yahoo-finance/fetchQuoteSummaryNew";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

function formatNumber(num: number) {
  if (num >= 1e12) {
    return `${(num / 1e12).toFixed(2)}T`;
  } else if (num >= 1e9) {
    return `${(num / 1e9).toFixed(2)}B`;
  } else if (num >= 1e6) {
    return `${(num / 1e6).toFixed(2)}M`;
  }
  return num.toString();
}

const keysToDisplay = [
  { key: "open", title: "Open", description: "The opening price of the day." },
  { key: "weekHigh", title: "High", description: "Highest price of the stock this week." },
  { key: "weekLow", title: "Low", description: "Lowest price of the stock this week." },
  { key: "volume", title: "Vol", format: formatNumber, description: "Total shares traded this week." },
  { key: "trailingPE", title: "P/E", description: "Price-to-Earnings ratio." },
  { key: "marketCap", title: "Mkt cap", format: formatNumber, description: "Market capitalization." },
  { key: "fiftyTwoWeekHigh", title: "52W H", description: "Highest price in the last 52 weeks." },
  { key: "fiftyTwoWeekLow", title: "52W L", description: "Lowest price in the last 52 weeks." },
  { key: "averageVolume", title: "Avg Vol", format: formatNumber, description: "Average daily trading volume over last 30 days." },
  {
    key: "dividendYield",
    title: "Div yield",
    format: (data: number) => `${data}%`,
    description: "Annual dividend yield percentage."
  },
  { key: "beta", title: "Book Val", description: "Annual Book Value" },
  { key: "trailingEps", title: "EPS", description: "Earnings per share." },
];

interface FinanceSummaryProps {
  ticker: string;
}

export default async function FinanceSummary({ ticker }: FinanceSummaryProps) {
  let financeSummaryData = await fetchQuoteSummaryNew(ticker);
  const marketPrice = parseFloat(financeSummaryData?.marketPrice || "0");
  const eps = parseFloat(financeSummaryData?.trailingEps || "0");

  financeSummaryData = {
    ...financeSummaryData,
    trailingPE: eps > 0 ? (marketPrice / eps).toFixed(2) : "N/A",
  };

  return (
    <div className="grid grid-flow-col grid-rows-6 gap-4 md:grid-rows-3">
      {keysToDisplay.map((item) => {
        const data = financeSummaryData?.[item.key] ?? undefined;
        let formattedData = "N/A";

        if (data !== undefined && !isNaN(Number(data))) {
          const numValue = Number(data);
          if (numValue === 0) {
            formattedData = "N/A";
          } else {
            formattedData = item.format ? item.format(numValue) : numValue.toString();
          }
        }

        return (
          <HoverCard key={item.key}>
            <HoverCardTrigger className="flex flex-row items-center justify-between font-medium cursor-pointer">
              <span className="text-muted-foreground">{item.title}</span>
              <span>{formattedData}</span>
            </HoverCardTrigger>
            <HoverCardContent className="p-2 text-sm text-muted-foreground bg-white shadow-lg rounded-lg">
              {item.description}
            </HoverCardContent>
          </HoverCard>
        );
      })}
    </div>
  );
}