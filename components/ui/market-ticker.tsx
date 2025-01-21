import React, { useEffect, useState } from 'react';
import "tailwindcss/tailwind.css";
import "../../app/globals.css";

interface MarketData {
  symbol: string;
  price: number; // Price change
  currentPrice: number; // Current price
}

const MarketTicker: React.FC = () => {
  const [marketData, setMarketData] = useState<MarketData[]>([]);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/fetch-stock-prices`);
        if (!response.ok) {
          throw new Error('Failed to fetch market data');
        }
        const data = await response.json();

        // Ensure all numeric values are properly parsed
        const parsedData = data.map((item: { symbol: string; price: string; currentPrice: string }) => ({
          symbol: item.symbol,
          price: parseFloat(item.price), // Convert price to number
          currentPrice: parseFloat(item.currentPrice), // Convert currentPrice to number
        }));

        setMarketData(parsedData);
      } catch (error) {
        console.error('Error fetching market data:', error);
      }
    };

    fetchMarketData();
    const interval = setInterval(fetchMarketData, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-custom-1 dark:bg-black text-white dark:text-white py-2 overflow-hidden">
      <div className="flex items-center animate-marquee whitespace-nowrap">
        {marketData.map((data, index) => {
          const priceChange = data.price;
          const percentageChange = 
            data.currentPrice ? (priceChange / data.currentPrice) * 100 : 0;

          return (
            <div key={index} className="mx-4 flex items-center text-sm">
              <span className="font-semibold mr-2">{data.symbol}:</span>
              <span>{data.currentPrice.toFixed(2)} BTN</span>
              <span
                className={`ml-1 ${
                  priceChange > 0
                    ? "text-green-400"
                    : priceChange < 0
                    ? "text-red-400"
                    : "text-gray-400"
                }`}
              >    {priceChange.toFixed(2)}</span>
          
              <span
                className={`ml-1 ${
                  priceChange > 0
                    ? "text-green-400"
                    : priceChange < 0
                    ? "text-red-400"
                    : "text-gray-400"
                }`}
              >
                
                (              
                  {percentageChange === 0
                  ? ""
                  : `${percentageChange > 0 ? "+" : ""}`}
              
                {percentageChange.toFixed(2)}%)
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MarketTicker;
