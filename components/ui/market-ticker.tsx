import React, { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import "../../app/globals.css";

interface MarketData {
  symbol: string;
  price: number; // Price change
  currentPrice: number; // Current price
  percentageChange: number; // Percentage change
}

const MarketTicker: React.FC = () => {
  const [marketData, setMarketData] = useState<MarketData[]>([]);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/fetch-live-market`);
        if (!response.ok) {
          throw new Error("Failed to fetch market data");
        }
        const data = await response.json();

        // Ensure all numeric values are properly parsed
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

    fetchMarketData();
    const interval = setInterval(fetchMarketData, 60000);
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

      {/* Marquee Animation */}
      <style jsx>{`
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 35s linear infinite;
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
