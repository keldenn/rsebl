import { unstable_noStore as noStore } from "next/cache"
const ITEMS_PER_PAGE = 40;
export async function fetchScreenerStocks(query: string, count?: number) {
  noStore();

  try {
    // Fetch data from the custom API
    const response = await fetch("https://rsebl.org.bt/agm/api/fetch-live-market-new", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    const formatVolume = (volume: number): string => {
      if (volume >= 1000000) {
        return `${(volume / 1000000).toFixed(3)}M`;
      } else {
        return volume.toString();
      }
    };
    
    // Format function for value (to round to two decimal places)
    const formatValue = (value: number): string => {
      return value.toFixed(2);
    };
    // Map and format the data to match table expectations
    const formattedData = data.map((item: any) => ({
      symbol: item.symbol,
      marketCap: item.marketCap,
      shortName: item.name,
      regularMarketPrice: parseFloat(item.currentPrice),
      regularMarketVolume: parseFloat(item.lastTradedVolume),
      regularMarketChange: parseFloat(item.priceChange), // Use priceChange directly
      regularMarketChangePercent:
      (parseFloat(item.priceChange) / (parseFloat(item.currentPrice))) * 100,// Corrected calculation
      sector: item.sector,
  // New fields
      lastTradedVol: item.lastTradedVolume,
      lastTradedVal: item.lastTradedVal
    }));

    // Handle pagination: limit the number of rows
    return count ? formattedData.slice(0, count) : formattedData.slice(0, ITEMS_PER_PAGE);
  } catch (error) {
    console.error("Failed to fetch screener stocks", error);
    throw new Error("Failed to fetch screener stocks.");
  }
}