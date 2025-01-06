import React, { useEffect, useState } from 'react';
import "tailwindcss/tailwind.css";
import "../../app/globals.css"
interface MarketData {
  symbol: string;
  price: number;
  change: number;
}

const sampleMarketData: MarketData[] = [
  { symbol: "AAPL", price: 150.25, change: 1.2 },
  { symbol: "MSFT", price: 310.50, change: 0.5 },
  { symbol: "GOOGL", price: 2800.75, change: -0.5 },
  { symbol: "AMZN", price: 3450.1, change: 2.3 },
  { symbol: "NVDA", price: 500.0, change: 1.8 },
  { symbol: "META", price: 320.75, change: -0.3 },
  { symbol: "BRK-B", price: 470.25, change: 0.7 },
  { symbol: "TSLA", price: 850.35, change: -3.8 },
  { symbol: "LLY", price: 620.5, change: 1.4 },
  { symbol: "V", price: 235.1, change: -0.9 },
  { symbol: "TSM", price: 115.75, change: 0.6 },
  { symbol: "UNH", price: 500.2, change: -1.2 },
  { symbol: "AVGO", price: 850.5, change: 2.0 },
  { symbol: "NVO", price: 185.3, change: 0.8 },
  { symbol: "JPM", price: 155.6, change: -0.4 },
  { symbol: "WMT", price: 160.2, change: 0.3 },
  { symbol: "SPY", price: 450.0, change: -0.1 },
];

const MarketTicker: React.FC = () => {
  const [marketData, setMarketData] = useState<MarketData[]>(sampleMarketData);

  useEffect(() => {
    const updateMarketData = () => {
      setMarketData((prevData) =>
        prevData.map((item) => ({
          ...item,
          price: parseFloat((item.price + Math.random() * 2 - 1).toFixed(2)),
          change: parseFloat((Math.random() * 5 - 2.5).toFixed(2)),
        }))
      );
    };

    const interval = setInterval(updateMarketData, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-900 text-white py-2 overflow-hidden">
      <div className="flex items-center animate-marquee whitespace-nowrap">
        {marketData.map((data, index) => (
          <div
            key={index}
            className="mx-4 flex items-center"
          >
            <span className="font-bold mr-2">{data.symbol}:</span>
            <span>{data.price.toFixed(2)} USD</span>
            <span
              className={`ml-2 ${
                data.change >= 0 ? "text-green-400" : "text-red-400"
              }`}
            >
              ({data.change >= 0 ? "+" : ""}
              {data.change.toFixed(2)}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketTicker;
