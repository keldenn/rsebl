"use client"

import { useEffect, useState } from "react";
import CompanyCards from "./components/CompanyCards";

export default function ListedScriptsPage() {
  const [companyData, setCompanyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/fetch-listed-scripts`);
        const data = await response.json();
        const formattedData = data.map((item: any) => ({
          title: item.symbol,
          description: item.name,
          image: item.logo,
          price: parseFloat(item.currentPrice),
          priceChange: parseFloat(item.price),
          percentageChange:
            ((parseFloat(item.price) / (parseFloat(item.currentPrice) - parseFloat(item.price))) * 100).toFixed(2),
          link: `/stocks/${item.symbol}`,
        }));
        setCompanyData(formattedData);
      } catch (error) {
        console.error("Error fetching company data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyData();
  }, []);

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {companyData.map((company, index) => (
        <CompanyCards
          key={index}
          title={company.title}
          description={company.description}
          image={company.image}
          price={company.price}
          priceChange={company.priceChange}
          percentageChange={company.percentageChange}
          link={company.link}
        />
      ))}
    </div>
  );
}
