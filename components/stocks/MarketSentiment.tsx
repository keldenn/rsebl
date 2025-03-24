"use client"

import { useEffect, useState } from "react"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

function getMarketSentiment(ptChange: string) {
  const change = parseFloat(ptChange)
  if (change === 0) return "Neutral"
  return change > 0 ? "increased" : "decreased"
}

export default function MarketSentiment() {
  const [marketSentiment, setMarketSentiment] = useState("Neutral")

  useEffect(() => {
    async function fetchBSIData() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/fetch-BSI`)
        const data = await response.json()
        const ptChange = data[0]?.ptChange || "0"
        setMarketSentiment(getMarketSentiment(ptChange))
      } catch (error) {
        console.error("Error fetching BSI data:", error)
      }
    }

    // Initial fetch
    fetchBSIData()

    // Set interval to fetch data every 60 seconds
    const interval = setInterval(fetchBSIData, 60000)

    return () => clearInterval(interval) // Cleanup on unmount
  }, [])

  const sentimentColor =
    marketSentiment === "increased" ? "text-green-500" :
    marketSentiment === "decreased" ? "text-red-500" :
    "text-neutral-500"

  const sentimentBackground =
    marketSentiment === "increased" ? "bg-green-500/10" :
    marketSentiment === "decreased" ? "bg-red-500/10" :
    "bg-neutral-500/10"

  return (
    <>
    <CardTitle className=" w-fit rounded-full px-4 py-2 font-medium dark:bg-neutral-100/5">
    Bhutan Stock Index <strong className={sentimentColor}>{marketSentiment}</strong>
  </CardTitle>
  <div className={`pointer-events-none absolute inset-0 z-0 h-[95%] w-[85%] -translate-x-[10%] -translate-y-[30%] rounded-full blur-3xl ${sentimentBackground}`} />
  </>
  )
}

