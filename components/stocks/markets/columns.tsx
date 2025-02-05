"use client"

import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import { cn } from "@/lib/utils"

// Define a new type that matches your API data structure
type StockData = {
  symbol: string
  shortName: string
  price: number | string
  previousPrice: number | string
  priceChange: number | string
  percentageChange: number | string
}

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "shortName",
    header: "Title",
    cell: (props) => {
      const { row } = props
      const title = row.getValue("shortName") as string
      const symbol = row.original.symbol

      return (
        <Link
          prefetch={false}
          href={{ pathname: "/", query: { ticker: symbol } }}
          className="font-medium"
        >
          {title}
        </Link>
      )
    },
  },
  {
    accessorKey: "price",
    header: () => <div className="text-right">Latest Price</div>,
    cell: (props) => {
      const { row } = props
      const price = row.getValue("price") as number | string
      return <div className="text-right">{price !== "N/A" ? price : "--"}</div>
    },
  },
  {
    accessorKey: "priceChange",
    header: () => <div className="text-right">$ Change</div>,
    cell: (props) => {
      const { row } = props
      const priceChange = row.getValue("priceChange") as number | string
      const numericValue = Number(priceChange)
  
      return (
        <div
          className={cn(
            "text-right",
            numericValue > 0
              ? "text-green-500"
              : numericValue < 0
              ? "text-red-500"
              : "text-gray-500" // Gray if value is zero
          )}
        >
          {priceChange !== "N/A" ? (numericValue > 0 ? `+${priceChange}` : priceChange) : "--"}
        </div>
      )
    },
  },
  {
    accessorKey: "percentageChange",
    header: () => <div className="text-right">% Change</div>,
    cell: (props) => {
      const { row } = props
      let percentageChange = row.getValue("percentageChange") as number | string
  
      // Ensure it's a number (strip non-numeric characters like `%` if present)
      const numericValue =
        typeof percentageChange === "string"
          ? Number(percentageChange.replace("%", "").trim())
          : Number(percentageChange)
  
      return (
        <div className="flex justify-end">
          <div
            className={cn(
              "w-[4rem] min-w-fit rounded-md px-2 py-0.5 text-right",
              numericValue > 0
                ? "bg-green-300 text-green-800 dark:bg-green-950 dark:text-green-400"
                : numericValue < 0
                ? "bg-red-300 text-red-800 dark:bg-red-950 dark:text-red-500"
                : "bg-gray-300 text-gray-800 dark:bg-gray-900 dark:text-gray-400" // Gray if value is zero
            )}
          >
            {percentageChange !== "N/A" ? `${percentageChange}%` : "--"}
          </div>
        </div>
      )
    },
  }
  
]
