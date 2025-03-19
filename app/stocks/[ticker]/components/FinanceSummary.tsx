
import { fetchQuoteSummaryNew } from "@/lib/yahoo-finance/fetchQuoteSummaryNew"

function formatNumber(num: number) {
  if (num >= 1e12) {
    return `${(num / 1e12).toFixed(2)}T`
  } else if (num >= 1e9) {
    return `${(num / 1e9).toFixed(2)}B`
  } else if (num >= 1e6) {
    return `${(num / 1e6).toFixed(2)}M`
  } else {
    return num.toString()
  }
}
const keysToDisplay = [
  {
    key: "open",
    title: "Open",
  },
  { key: "weekHigh", title: "High" },
  { key: "weekLow", title: "Low" },
  { key: "volume", title: "Vol", format: formatNumber },
  { key: "trailingPE", title: "P/E" },
  { key: "marketCap", title: "Mkt cap", format: formatNumber },
  { key: "fiftyTwoWeekHigh", title: "52W H" },
  { key: "fiftyTwoWeekLow", title: "52W L" },
  { key: "averageVolume", title: "Avg Vol", format: formatNumber },
  {
    key: "dividendYield",
    title: "Div yield",
    format: (data: number) => `${(data * 100).toFixed(2)}%`,
  },
  // { key: "beta", title: "Beta" },
  { key: "trailingEps", title: "EPS", section: "defaultKeyStatistics" },
]

export default async function FinanceSummary({ ticker }: { ticker: string }) {
  let financeSummaryData = await fetchQuoteSummaryNew(ticker)
  // Ensure we have marketPrice and EPS before calculating P/E
  const marketPrice = parseFloat(financeSummaryData?.marketPrice || "0")
  const eps = parseFloat(financeSummaryData?.trailingEps || "0")

  // Calculate trailingPE and append to the data
  financeSummaryData = {
    ...financeSummaryData,
    trailingPE: eps > 0 ? (marketPrice / eps).toFixed(2) : "N/A",
  }
  return (
    <div className="grid grid-flow-col grid-rows-6 gap-4 md:grid-rows-3">
      {keysToDisplay.map((item) => {  
        const data = financeSummaryData?.[item.key] ?? undefined
        let formattedData = "N/A"

        if (data !== undefined && !isNaN(data)) {
          formattedData = item.format ? item.format(data) : data
        }
        return (
          <div
            key={item.key}
            className="flex flex-row items-center justify-between font-medium"
          >
            <span className="text-muted-foreground">{item.title}</span>
            <span>{formattedData}</span>
          </div>
        )
      })}
    </div>
     
  )
}
