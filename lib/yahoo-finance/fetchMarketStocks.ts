import { unstable_noStore as noStore } from "next/cache";

export async function fetchMarketStock(symbol: string) {
  noStore();

  try {
    const response = await fetch(`https://rsebl.org.bt/agm/api/fetch-home-table/${symbol}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();

    return {
      symbol: data.symbol,
      regularMarketPrice: parseFloat(data.currentPrice),
      regularMarketChange: parseFloat(data.priceChange),
      regularMarketChangePercent: (parseFloat(data.priceChange) / parseFloat(data.currentPrice)) * 100,
    };
  } catch (error) {
    console.error("Failed to fetch market stock", error);
    throw new Error("Failed to fetch market stock.");
  }
}
