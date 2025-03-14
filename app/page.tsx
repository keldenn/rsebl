import { DataTable } from "@/components/stocks/markets/data-table"
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
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
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
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

  const agmResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/fetch-agm-with-sym`);
  const agmData = await agmResponse.json();

  // Filter and sort AGMs to find the nearest upcoming one
  const now = new Date(); // Current date and time
  // Function to create Date object with end of day if time is missing
  const parseAGMDate = (dateString: string) => {
    if (dateString.includes("AM") || dateString.includes("PM")) {
      return new Date(dateString);
    } else {
      // No time specified, set to end of day
      return new Date(`${dateString} 23:59:59`);
    }
  };
  const upcomingAGMs = agmData
  .filter((agm: { date: string }) => {
    const agmDate = parseAGMDate(agm.date);
    return agmDate > now;
  })
  .sort((a, b) => parseAGMDate(a.date).getTime() - parseAGMDate(b.date).getTime());

// Filter past AGMs
const pastAGMs = agmData
  .filter(agm => new Date(agm.date).getTime() < now.getTime()) // Keep only past AGMs
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Sort by latest date first
  
const latestFinishedAGM = pastAGMs.length > 0 ? pastAGMs[0] : null;

  const nearestAGM = upcomingAGMs.length > 0 ? upcomingAGMs[0] : latestFinishedAGM;

// Function to calculate the difference in days
const getDaysDifference = (dateString: string) => {
  const agmDate = new Date(dateString);
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0); // Normalize current date to start of day
  agmDate.setHours(0, 0, 0, 0); // Normalize AGM date to start of day

  const timeDifference = agmDate.getTime() - currentDate.getTime();
  const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  return daysDifference;
};

// Function to get the label based on the date difference
const getBadgeLabel = (dateString: string) => {
  const daysDifference = getDaysDifference(dateString);

  if (daysDifference < 0) {
    return "Completed";
  } else if (daysDifference === 0) {
    return "Today";
  } else if (daysDifference === 1) {
    return "Tomorrow";
  } else if (daysDifference === 2) {
    return "In two days";
  } else if (daysDifference === 3) {
    return "In three days";
  } else {
    return "Upcoming";
  }
};

// Function to get the badge variant and class based on the date difference
const getBadgeVariantAndClass = (dateString: string) => {
  const daysDifference = getDaysDifference(dateString);

  if (daysDifference < 0) {
    return {
      variant: "destructive" as const,
      className: "bg-gray-500 dark:text-gray-500 hover:bg-gray-600",
    };
  } else if (daysDifference === 0) {
    return {
      variant: "default" as const,
      className: "bg-blue-500 dark:text-blue-500 hover:bg-blue-600",
    };
  } else if (daysDifference === 1) {
    return {
      variant: "default" as const,
      className: "bg-green-500 dark:text-green-500 hover:bg-green-600",
    };
  } else if (daysDifference === 2) {
    return {
      variant: "default" as const,
      className: "bg-yellow-500 dark:text-yellow-500 hover:bg-yellow-600",
    };
  }else if (daysDifference === 3) {
    return {
      variant: "default" as const,
      className: "bg-custom-2 dark:text-custom-2 hover:bg-custom-2",
    };
  } else {
    return {
      variant: "default" as const,
      className: "bg-custom-1 dark:text-custom-1 hover:bg-custom-1",
    };
  }
};


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
              {nearestAGM && (
                <CardFooter className="flex-col items-start">
                  <div className="mb-2 text-sm font-semibold text-neutral-500 dark:text-neutral-500">What you need to know</div>
                 <div className="text-base font-semibold me-2">
                    {nearestAGM.agm_name + "             "} 
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <span>
                          <Badge variant={getBadgeVariantAndClass(nearestAGM.date).variant} className={cn(getBadgeVariantAndClass(nearestAGM.date).className)}>
                            {getBadgeLabel(nearestAGM.date)}
                          </Badge>
                        </span>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-100">
                          <div className="space-y-2">
                            {upcomingAGMs.length > 0 ? (
                              upcomingAGMs.slice(1).map((agm) => (
                                <Link key={agm.symbol} href={`/stocks/${agm.symbol}`} passHref>
                                <div className="flex items-center justify-between py-1 cursor-pointer">
                                  <span className="text-sm font-semibold text-custom-1 dark:text-white">{agm.symbol}</span>
                                  <span className="text-sm font-medium mx-4">{agm.agm_name}</span>
                                  <Badge variant={getBadgeVariantAndClass(agm.date).variant} className={cn(getBadgeVariantAndClass(agm.date).className)}>
                                    {getBadgeLabel(agm.date)}
                                  </Badge>
                                </div>
                              </Link>
                              ))
                            ) : (
                              <div className="text-sm text-neutral-500 dark:text-neutral-400">
                                No Upcoming AGMs
                              </div>
                            )}
                          </div>
                        </HoverCardContent>
                    </HoverCard>
                  </div>
                  <Link prefetch={false} href={`/stocks/${encodeURIComponent(nearestAGM.symbol)}`} className="text-sm font-medium">
                    {nearestAGM.name}
                  </Link>
                  <p className="text-sm text-neutral-700 dark:text-neutral-400">{nearestAGM.venue}</p>
                  <p className="text-sm text-neutral-700 dark:text-neutral-400">{nearestAGM.date}</p>
                 
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
