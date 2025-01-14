import type { Metadata } from "next";
import BrokersCards from "./components/BrokersCards";
//import Link from "next/link";

export const metadata: Metadata = {
  title: "Finly: Stock screener",
  description: "Find the best stocks to buy now with the Finly stock screener.",
};

const BrokersData = [
  {
    description: "RICB Securities",
    image: "https://rsebl.org.bt/agm/storage/brokers/1zT59ZuPwa7m35OaAbAJHBIvgZjfoxBIKCI2krC7.png",
  },
  {
    description: "BNB Securities",
    image: "https://rsebl.org.bt/agm/storage/brokers/XJsFYGxjJMyLcN8R7mW9GP5FUEuj3ndzlVPgYuvk.jpg",
  },
  {
    description: "BOB Securities",
    image: "https://rsebl.org.bt/agm/storage/brokers/BmFZwHnbgMiYiAJvdLmXGLdszZQhMEExjPeC8kSC.png",
  },
  {
    description: "Drukyul Securities Broker Pvt. Ltd",
    image: "https://rsebl.org.bt/agm/storage/brokers/z4ix1BpZevYIWAVRadMQSO2N48XEsJ91Ch7vHtvF.png",
  },
  {
    description: "Lekpay Dolma Securities Broker Pvt. Ltd",
    image: "https://rsebl.org.bt/agm/storage/brokers/BODtPeEmwVP1OCWrZTcEMfuJ6PSA3lpWKsesUwTf.png",
  },
  {
    description: "Sershing Securities Broker Pvt Ltd",
    image: "https://rsebl.org.bt/agm/storage/brokers/P106GW5GkZv4xHIVyfFxZlcu6k0UMmuC68LtzppN.png",
  },
  {
    description: "Bhutan Post Securities",
    image: "https://rsebl.org.bt/agm/storage/brokers/YVp9LVWGRnRjBrzborgpAvQupbPjrPsyKqIONWcw.png",
  },
  {
    description: "BDB Securities",
    image: "https://rsebl.org.bt/agm/storage/brokers/IlHWuSbmqjpMWvnsGtrvnsZZsuEo80fO5rduPWDw.png",
  },
  {
    description: "Rinson Securities Pvt.Ltd",
    image: "https://rsebl.org.bt/agm/storage/brokers/OmkjehidFtFwm79fBTlP4fTZiD2YiCcedJun9wN7.png",
  },
];

export default async function BrokersPage() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-4">
      {BrokersData.map((services, index) => (
        <BrokersCards
          key={index}
          description={services.description}
          image={services.image}
        />
      ))}
    </div>
  );
}