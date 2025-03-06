import { DataTable } from "@/components/stocks/markets/data-table"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import HeroCarousel from "@/components/ui/home-carousel"
import { Suspense } from "react"
import MarketsChart from "@/components/chart/MarketsChart"
import Link from "next/link"
import { columns } from "@/components/stocks/markets/columns"
import SectorPerformance from "@/components/stocks/SectorPerformance"
import NewsSection from "@/components/ui/news-section"
import StatsSection from "@/components/ui/stats-section"
import StockTabs from "@/components/ui/stocks-tabs"
import LogoCarousel from "@/components/ui/logo-carousel"
import MarketSentiment from "@/components/stocks/MarketSentiment"  // ✅ Import new component

function isMarketOpen() {
  const now = new Date()
  const options: Intl.DateTimeFormatOptions = {
    timeZone: "America/New_York",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }
  const formatter = new Intl.DateTimeFormat([], options)
  const timeString = formatter.format(now)
  const [hour, minute] = timeString.split(":").map(Number)
  const timeInET = hour + minute / 60
  const dayInET = new Date(
    now.toLocaleString("en-US", { timeZone: "America/New_York" })
  ).getDay()

  return dayInET >= 1 && dayInET <= 5 && timeInET >= 9.5 && timeInET < 16
}

async function fetchTickers() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/fetch-topbottom-volume`);
    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
      return [];
    }

    return data.slice(0, 10).map(({ symbol, name, currentPrice, price }) => {
      if (price === undefined || price === 0) {
        return { symbol, shortName: name, price: currentPrice, priceChange: price, percentageChange: 0 };
      }

      const previousPrice = currentPrice - price;
      const percentageChange = (price / previousPrice) * 100;

      return {
        symbol,
        shortName: name,
        price: currentPrice, // Latest price
        priceChange: price,
        previousPrice,
        percentageChange: percentageChange.toFixed(2), // Rounded to 2 decimal places
      };
    });
  } catch (error) {
    console.error("Error fetching tickers:", error);
    return [];
  }
}

async function fetchStockData(symbol: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/fetch-price-movement/${symbol}`)
    const data = await response.json()

    if (!Array.isArray(data) || data.length === 0) {
      return { symbol, history: [] }
    }

    const priceHistory = data.map(([timestamp, price]) => ({
      date: new Date(timestamp).toISOString(),
      close: price.toFixed(2),
    }))

    return { symbol, history: priceHistory }
  } catch (error) {
    console.error(`Error fetching data for ${symbol}:`, error)
    return { symbol, history: [] }
  }
}

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    ticker?: string
    range?: string
    interval?: string
  }
}) {
  const tickers = await fetchTickers()

  if (tickers.length === 0) {
    return <div>Error loading tickers. Please try again later.</div>
  }

  const ticker = searchParams?.ticker?.toUpperCase() || tickers[0]?.symbol

  const stockDataPromises = tickers.map(({ symbol }) => fetchStockData(symbol))
  const stockDataResults = await Promise.all(stockDataPromises)

  const resultsWithTitles = tickers.map((tickerData) => {
    const stockData = stockDataResults.find((stock) => stock.symbol === tickerData.symbol) || { history: [] }
    return {
      ...tickerData,
      history: stockData.history,
    }
  })

  const selectedStock = resultsWithTitles.find((stock) => stock.symbol === ticker)
  const selectedStockHistory = selectedStock?.history || []

  const agmResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/fetch-agm-with-sym`)
  const agmData = await agmResponse.json()
  const latestAGM = agmData.length > 0 ? agmData[0] : null


  return (
    <div className="flex flex-col gap-4">
      <HeroCarousel />
      <StatsSection />

      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="w-full lg:w-1/2">
          <Card className="relative flex h-full min-h-[15rem] flex-col justify-between overflow-hidden">
            <CardHeader>
              <MarketSentiment />  {/* ✅ Replace old sentiment logic with the new component */}
            </CardHeader>

            {latestAGM && (
              <CardFooter className="flex-col items-start">
                <p className="mb-2 text-sm font-semibold text-neutral-500 dark:text-neutral-500">What you need to know</p>
                <p className="text-base font-semibold">{latestAGM.agm_name}</p>
                <Link prefetch={false} href={`/stocks/${encodeURIComponent(latestAGM.symbol)}`} className="text-sm font-medium">
                  {latestAGM.name}
                </Link>
                <p className="text-sm text-neutral-700 dark:text-neutral-400">{latestAGM.venue}</p>
                <p className="text-sm text-neutral-700 dark:text-neutral-400">{latestAGM.date}</p>
              </CardFooter>
            )}
          </Card>
        </div>

        <div className="w-full lg:w-1/2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Sector Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<div>Loading...</div>}>
                <SectorPerformance />
              </Suspense>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex items-center justify-between py-4">
        <h2 className="text-xl font-medium">Stocks</h2>
        <Link className="text-custom-1 hover:underline text-sm font-medium" href="/screener">
          View all
        </Link>
      </div>

      <div className="flex flex-col gap-4">
        <Card className="flex flex-col gap-4 p-6 lg:flex-row">
          <div className="w-full lg:w-1/2">
            <Suspense fallback={<div>Loading...</div>}>
              <DataTable columns={columns} data={resultsWithTitles} />
            </Suspense>
          </div>
          <div className="w-full lg:w-1/2">
            <Suspense fallback={<div>Loading...</div>}>
              <MarketsChart data={selectedStockHistory} ticker={ticker} />
            </Suspense>
          </div>
        </Card>
      </div>

      <div className="flex items-center justify-between py-4">
        <h2 className="text-xl font-medium">News & Announcements</h2>
        <Link className="text-custom-1 hover:underline text-sm font-medium" href="/news-and-announcements">
          View more
        </Link>
      </div>

      <NewsSection />
      <h2 className="text-xl font-medium py-4">Stock Highlights</h2>
      <StockTabs />
      <LogoCarousel />
    </div>
  )
}
