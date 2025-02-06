import StockChart from "@/components/chart/StockChart"
import CompanySummaryCard from "@/app/stocks/[ticker]/components/CompanySummaryCard"
import FinanceSummary from "@/app/stocks/[ticker]/components/FinanceSummary"
import News from "@/app/stocks/[ticker]/components/News"
import { Card, CardContent } from "@/components/ui/card"
import { DEFAULT_INTERVAL, DEFAULT_RANGE } from "@/lib/yahoo-finance/constants"
import {
  validateInterval,
  validateRange,
} from "@/lib/yahoo-finance/fetchChartData"
import { Interval } from "@/types/yahoo-finance"
import { Suspense } from "react"
import OrderBook from "./components/OrderBook"
import CorporateDetails from "./components/CorporateDetails"


type Props = {
  params: {
    ticker: string
  }
  searchParams?: {
    ticker?: string
    range?: string
    interval?: string
  }
}


export default async function StocksPage({ params, searchParams }: Props) {
  const ticker = params.ticker
  const range = validateRange(searchParams?.range || DEFAULT_RANGE)
  const interval = validateInterval(
    range,
    (searchParams?.interval as Interval) || DEFAULT_INTERVAL
  )

  return (
    <div className="">
      <Card>
        <CardContent className="space-y-10 pt-6 lg:px-40 lg:py-14">
          <Suspense
            fallback={
              <div className="flex h-[27.5rem] items-center justify-center text-muted-foreground ">
                Loading...
              </div>
            }
          >
            <StockChart ticker={ticker}/>
          </Suspense>
          <Suspense
            fallback={
              <div className="flex h-[10rem] items-center justify-center text-muted-foreground ">
                Loading...
              </div>
            }
          >
            <FinanceSummary ticker={ticker} />
          </Suspense>
          <Suspense
            fallback={
              <div className="flex h-[10rem] items-center justify-center text-muted-foreground ">
                Loading...
              </div>
            }
          >
            <CompanySummaryCard ticker={ticker} />
          </Suspense>
        
          <Suspense
            fallback={
              <div className="flex h-[20rem] items-center justify-center text-muted-foreground ">
                Loading...
              </div>
            }
          >
          <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/2">
            <News ticker={ticker} />
          </div>
          <div className="w-full md:w-1/2">
            <OrderBook symbol={ticker} />
          </div>
        </div>
           
          </Suspense>
          <Suspense
            fallback={
              <div className="flex h-[10rem] items-center justify-center text-muted-foreground ">
                Loading...
              </div>
            }
          >
            <CorporateDetails ticker={ticker} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  )
}
