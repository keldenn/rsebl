"use client";

import BrokersCards from "./components/BrokersCards";
import { useEffect, useState } from "react";

interface BrokerData {
  id: number;
  brokerage_name: string;
  file_path: string;
  broker_name: string;
  phone: string;
  email: string;
  address: string;
}

export default function BrokersPage() {
  const [brokersData, setBrokersData] = useState<BrokerData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrokers = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/fetch-brokerageFirms`
        );
        const data = await response.json();

        // Update file paths to include the full base URL
        const updatedData = data.map((broker: BrokerData) => ({
          ...broker,
          file_path: `${process.env.NEXT_PUBLIC_BASE_URL}${broker.file_path}`,
        }));

        setBrokersData(updatedData);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch brokers data:", error);
        setLoading(false);
      }
    };

    fetchBrokers();
  }, []);

  // if (loading) {
  //   return <p className="text-center">Loading...</p>;
  // }

  if (brokersData.length === 0) {
    return <p className="text-center">No brokers found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
      {brokersData.map((broker) => (
        <BrokersCards
          key={broker.id}
          brokerage_name={broker.brokerage_name}
          file_path={broker.file_path}
          broker_name={broker.broker_name}
          phone={broker.phone}
          email={broker.email}
          address={broker.address}
        />
      ))}
    </div>
  );
}
