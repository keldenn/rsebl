import { unstable_noStore as noStore } from "next/cache"

export async function fetchQuoteSummaryNew(ticker: string) {
    noStore()

    try {
        const response = await fetch(`https://rsebl.org.bt/agm/api/fetch-market-data/${ticker}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`)
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error("Failed to fetch market data:", error)
        throw new Error("Could not fetch market data.")
    }
}
