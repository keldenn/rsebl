"use client"

import { CellContext, ColumnDef } from "@tanstack/react-table"

import type { ScreenerQuote } from "@/node_modules/yahoo-finance2/dist/esm/src/modules/screener"
import { cn } from "@/lib/utils"
import Link from "next/link"

export const columns: ColumnDef<ScreenerQuote>[] = [
  {
    accessorKey: "symbol",
    meta: "Symbol",
    header: "Symbol",
    cell: (props: CellContext<ScreenerQuote, unknown>) => {
      const { row } = props
      const symbol: string = row.getValue("symbol")
      return (
        <Link
          prefetch={false}
          href={`/stocks/${symbol}`}
          className="font-bold text-custom-1 hover:underline"
        >
          {symbol}
        </Link>
      )
    },
    enableHiding: false,
  },
  {
    accessorKey: "shortName",
    meta: "Company",
    header: "Company",
  },
  {
    accessorKey: "P/E",
    meta: "P/E",
    sortUndefined: -1,
    header: ({ column }) => {
      return <div className="text-right">P/E</div>
    },
    cell: (props: CellContext<ScreenerQuote, unknown>) => {
      const { row } = props

      const regularMarketPrice = row.original.regularMarketPrice
      const trailingEps = row.original.trailingEps || 0

      if (
        regularMarketPrice === undefined ||
        trailingEps === undefined ||
        regularMarketPrice === null ||
        trailingEps === null ||
        trailingEps === 0
      ) {
        return <div className="text-right">N/A</div>
      }

      const pe = regularMarketPrice / trailingEps
      if (pe < 0) {
        return <div className="text-right">N/A</div>
      }

      return <div className="text-right">{pe.toFixed(2)}</div>
    },
  },
  {
    accessorKey: "regularMarketPrice",
    meta: "Price",
    header: () => <div className="text-right">Price</div>,
    cell: (props: CellContext<ScreenerQuote, unknown>) => {
      const { row } = props
      const price = parseFloat(row.getValue("regularMarketPrice"))
      return <div className="text-right">{price.toFixed(2)}</div>
    },
  },
  {
    accessorKey: "regularMarketChange",
    meta: "Change (BTN)",
    header: () => <div className="text-right">Change</div>,
    cell: (props: CellContext<ScreenerQuote, unknown>) => {
      const { row } = props;
      const marketChange = parseFloat(row.getValue("regularMarketChange"));
      return (
        <div className="flex justify-end">
          <div
            className={cn(
              "text-right",
              marketChange > 0
                ? "text-green-800 dark:text-green-400"
                : marketChange < 0
                ? "text-red-800 dark:text-red-500"
                : "text-gray-500 dark:text-gray-400" // Add gray for zero
            )}
          >
            {marketChange > 0 ? "+" : marketChange < 0 ? "" : ""}
            {marketChange.toFixed(2)}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "regularMarketChangePercent",
    meta: "Change (%)",
    header: () => <div className="text-right">% Change</div>,
    cell: (props: CellContext<ScreenerQuote, unknown>) => {
      const { row } = props;
      const marketChangePercent = parseFloat(row.getValue("regularMarketChangePercent"));
      return (
        <div className="flex justify-end">
          <div
            className={cn(
              "w-[4rem] min-w-fit rounded-md px-2 py-0.5 text-right",
              marketChangePercent > 0
                ? "bg-green-300 text-green-800 dark:bg-green-950 dark:text-green-400"
                : marketChangePercent < 0
                ? "bg-red-300 text-red-800 dark:bg-red-950 dark:text-red-500"
                : "bg-gray-300 text-gray-800 dark:bg-gray-950 dark:text-gray-400" // Add gray background for zero
            )}
          >
            {marketChangePercent > 0 ? "+" : marketChangePercent  < 0 ? "" : ""}
            {marketChangePercent.toFixed(2)}%
          </div>
        </div>
      );
    },
  },
  
  {
    accessorKey: "lastTradedVol",
    meta: "Last Traded Vol",
    header: () => <div className="text-right">Last Traded Vol</div>,
    cell: (props: CellContext<ScreenerQuote, unknown>) => {
      const { row } = props
      const volume = row.getValue("lastTradedVol")
      function convertToIntegerWithComma(value: string): string {
        // Remove the ".00" part but keep the commas
        return value.replace('.00', '');
      }
      
      return <div className="text-right">{ convertToIntegerWithComma(volume)}</div>
    },
  },
  {
    accessorKey: "lastTradedVal",
    meta: "Last Traded Val",
    header: () => <div className="text-right">Last Traded Val</div>,
    cell: (props: CellContext<ScreenerQuote, unknown>) => {
      const { row } = props
      const volume = row.getValue("lastTradedVal")

      return <div className="text-right">{volume}</div>
    },
  },
  {
    accessorKey: "marketCap",
    meta: "Market Cap",
    header: () => <div className="text-right">Market Cap</div>,
    cell: (props: CellContext<ScreenerQuote, unknown>) => {
      const { row } = props
      const marketCap = parseFloat(row.getValue("marketCap"))
      const formatMarketCap = (marketCap: number): string => {
        if (marketCap >= 1_000_000_000_000) {
          return `${(marketCap / 1_000_000_000_000).toFixed(3)}T`
        } else if (marketCap >= 1_000_000_000) {
          return `${(marketCap / 1_000_000_000).toFixed(3)}B`
        } else {
          return `${(marketCap / 1_000_000).toFixed(3)}M`
        }
      }

      return <div className="text-right">{formatMarketCap(marketCap)}</div>
    },
  },
]
