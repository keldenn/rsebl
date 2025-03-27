import React, { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import "../../app/globals.css";

interface MarketData {
  symbol: string;
  price: number;
  currentPrice: number;
  percentageChange: number;
}

const MarketTicker: React.FC = () => {
  const [marketData, setMarketData] = useState<MarketData[]>([]);

  // Dhaka Standard Time (UTC+6) fetch times in 24-hour format
  const FETCH_TIMES = [10.05, 11.05, 12.05, 14.05, 15.05];

  const fetchMarketData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/fetch-live-market`);
      if (!response.ok) {
        throw new Error("Failed to fetch market data");
      }
      const data = await response.json();

      const parsedData = data.map((item: { symbol: string; price: string; currentPrice: string }) => {
        const currentPrice = parseFloat(item.currentPrice);
        const priceChange = parseFloat(item.price);
        const previousPrice = currentPrice - priceChange;
        const percentageChange = previousPrice !== 0 ? (priceChange / previousPrice) * 100 : 0;

        return {
          symbol: item.symbol,
          price: priceChange,
          currentPrice,
          percentageChange,
        };
      });

      setMarketData(parsedData);
    } catch (error) {
      console.error("Error fetching market data:", error);
    }
  };

  useEffect(() => {
    // Get current time in Bhutan (UTC+6)
    const getBhutanTime = () => {
      const now = new Date();
      // Get current UTC time and add 6 hours for Bhutan time
      const utcHours = now.getUTCHours();
      const utcMinutes = now.getUTCMinutes();
      const bhutanHours = (utcHours + 6) % 24;
      
      // Convert to decimal time (e.g., 10.05 for 10:05 AM)
      return bhutanHours + utcMinutes / 100;
    };

    // Check if current time matches any fetch time
    const checkFetchTime = () => {
      const currentTime = getBhutanTime();
 
      
      // Check if current time matches any fetch time exactly (within 1 minute)
      const shouldFetch = FETCH_TIMES.some(time => {
        const timeDiff = Math.abs(currentTime - time);
        return timeDiff < 0.0167; // ~1 minute tolerance (1/60)
      });
      
      if (shouldFetch) {
        fetchMarketData();
      }
    };

    // Initial fetch
    fetchMarketData();
    
    // Set up interval to check time every minute
    const interval = setInterval(checkFetchTime, 60000);
    
    return () => clearInterval(interval);
}, []);

  return (
    <div className="bg-custom-1 text-white py-2 overflow-hidden">
      <div className="flex items-center animate-marquee whitespace-nowrap">
        {[...marketData, ...marketData].map((data, index) => (
          <div key={index} className="mx-4 flex items-center text-sm">
            <span className="font-semibold mr-2">{data.symbol}:</span>
            <span>{data.currentPrice.toFixed(2)} BTN</span>
            <span
              className={`ml-1 ${
                data.price > 0 ? "text-green-400" : data.price < 0 ? "text-red-400" : "text-gray-400"
              }`}
            >
              {data.price.toFixed(2)}
            </span>
            <span
              className={`ml-1 ${
                data.percentageChange > 0 ? "text-green-400" : data.percentageChange < 0 ? "text-red-400" : "text-gray-400"
              }`}
            >
              ({data.percentageChange === 0 ? "" : `${data.percentageChange > 0 ? "+" : ""}`}
              {data.percentageChange.toFixed(2)}%)
            </span>
          </div>
        ))}
      </div>

      <style jsx>{`
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 95s linear infinite;
        }

        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
};

export default MarketTicker;