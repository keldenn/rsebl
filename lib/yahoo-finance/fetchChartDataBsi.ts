"use client"

import { unstable_noStore as noStore } from "next/cache"
import type {
  ChartOptions,
  ChartResultArray,
} from "@/node_modules/yahoo-finance2/dist/esm/src/modules/chart"
import type { Interval, Range } from "@/types/yahoo-finance"
import { DEFAULT_RANGE, INTERVALS_FOR_RANGE, VALID_RANGES } from "./constants"
import { CalculateRange } from "@/lib/utils"
import yahooFinance from "yahoo-finance2"

export const validateRange = (range: string): Range =>
  VALID_RANGES.includes(range as Range) ? (range as Range) : DEFAULT_RANGE

export const validateInterval = (range: Range, interval: Interval): Interval =>
  INTERVALS_FOR_RANGE[range].includes(interval)
    ? interval
    : INTERVALS_FOR_RANGE[range][0]
    export async function fetchChartDataBsi(
      range: Range,
      interval: Interval
    ) {
      noStore()
    
      try {
        const response = await fetch(
          `https://rsebl.org.bt/agm/api/fetch-indices`
        )
        if (!response.ok) throw new Error("Failed to fetch chart data")
    
        const rawData: [number, number][] = await response.json()
    
        // Convert timestamps to Date objects
        const formattedData = rawData.map(([timestamp, close]) => ({
          date: new Date(timestamp),
          close,
        }))
    
        // Calculate start date based on range
        const now = new Date()
        let startDate: Date
    
        switch (range) {
          case "1d":
            startDate = new Date(now)
            startDate.setDate(now.getDate() - 1)
            break
          case "1w":
            startDate = new Date(now)
            startDate.setDate(now.getDate() - 7)
            break
          case "1m":
            startDate = new Date(now)
            startDate.setMonth(now.getMonth() - 1)
            break
          case "3m":
            startDate = new Date(now)
            startDate.setMonth(now.getMonth() - 3)
            break
          case "1y":
            startDate = new Date(now)
            startDate.setFullYear(now.getFullYear() - 1)
            break
          default:
            startDate = new Date(0) // Fetch all data if range is invalid
        }
    
        // Filter data within the selected range
        const filteredData = formattedData.filter((entry) => entry.date >= startDate)
    
        // Aggregate data based on interval
        const intervalMapping: Record<Interval, number> = {
          "1m": 60 * 1000,
          "2m": 2 * 60 * 1000,
          "5m": 5 * 60 * 1000,
          "15m": 15 * 60 * 1000,
          "30m": 30 * 60 * 1000,
          "60m": 60 * 60 * 1000,
          "90m": 90 * 60 * 1000,
          "1h": 60 * 60 * 1000,
          "1d": 24 * 60 * 60 * 1000,
          "5d": 5 * 24 * 60 * 60 * 1000,
          "1wk": 7 * 24 * 60 * 60 * 1000,
          "1mo": 30 * 24 * 60 * 60 * 1000,
          "3mo": 90 * 24 * 60 * 60 * 1000,
        }
    
        const intervalMillis = intervalMapping[interval] || 60 * 1000 // Default to 1-minute interval
    
        const aggregatedData: { date: string; close: number }[] = []
        let lastTimestamp = 0
    
        for (const entry of filteredData) {
          const timestamp = entry.date.getTime()
          if (timestamp - lastTimestamp >= intervalMillis) {
            aggregatedData.push({
              date: entry.date.toISOString(),
              close: entry.close,
            })
            lastTimestamp = timestamp
          }
        }
    
        // Return transformed data
        return {
          quotes: aggregatedData,
          meta: {
            regularMarketPrice: aggregatedData.length
              ? aggregatedData[aggregatedData.length - 1].close
              : null,
          },
        }
      } catch (error) {
        console.log("Failed to fetch chart data", error)
        throw new Error("Failed to fetch chart data.")
      }
    }