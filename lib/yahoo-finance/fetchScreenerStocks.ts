import { unstable_noStore as noStore } from "next/cache";

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

    // Function to format volume
    const formatVolume = (volume: number): string => {
      return volume >= 1000000 ? `${(volume / 1000000).toFixed(3)}M` : volume.toString();
    };

    // Function to format values to two decimal places
    const formatValue = (value: number): string => {
      return value.toFixed(2);
    };

    // Map and format the data
    const formattedData = data.map((item: any) => {
      const currentPrice = parseFloat(item.currentPrice);
      const priceChange = parseFloat(item.priceChange);
      const previousPrice = currentPrice - priceChange;
      const percentageChange = previousPrice !== 0 ? (priceChange / previousPrice) * 100 : 0;

      return {
        symbol: item.symbol,
        marketCap: item.marketCap,
        shortName: item.name,
        regularMarketPrice: currentPrice,
        regularMarketVolume: parseFloat(item.lastTradedVolume),
        regularMarketChange: priceChange, // Use priceChange directly
        regularMarketChangePercent: percentageChange, // Corrected calculation
        sector: item.sector,
        // New fields
        lastTradedVol: item.lastTradedVolume,
        lastTradedVal: item.lastTradedVal,
      };
    });

    // Handle pagination: limit the number of rows
    return count ? formattedData.slice(0, count) : formattedData.slice(0, ITEMS_PER_PAGE);
  } catch (error) {
    console.error("Failed to fetch screener stocks", error);
    throw new Error("Failed to fetch screener stocks.");
  }
}
