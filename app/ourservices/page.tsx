import type { Metadata } from "next";
import ServicesCards from "./components/ServicesCards";
//import Link from "next/link";

export const metadata: Metadata = {
  title: "Finly: Stock screener",
  description: "Find the best stocks to buy now with the Finly stock screener.",
};

const servicesData = [
  {
    description: "Online Client Terminal(mCaMs)",
    image: "	https://rsebl.org.bt/agm/storage/serviceLogo/acIVXa07xjQtrDGxNNWBS7B92PbGXaIC6ghdSRnx.png",
    link: "/ourservices/mCaMs",
  },
  {
    description: "Bhutan CrowdFunding",
    image: "https://rsebl.org.bt/agm/storage/serviceLogo/m3nZXM2akeYjqnW4LJfYc70imFhQrxxElJE0F6AZ.png",
    link: "https://bhutancrowdfunding.rsebl.org.bt/",
  },
  {
    description: "Agricultural Commodities Market Initiative",
    image: "https://rsebl.org.bt/agm/storage/serviceLogo/XSwvhhZIi5gvwXjnJVlsMVPdTnIETI3hjTmZfmnB.png",
    link: "https://www.services.rsebl.org.bt/BCMI/public/index.php",
  },
  {
    description: "Bhutan Commodity Exchange",
    image: "https://rsebl.org.bt/agm/storage/serviceLogo/BP0ZllBQcwcEDiw4ufjITCwU1cXULc3fSYpFIxHs.png",
    link: "https://www.services.rsebl.org.bt/BCE/login.php",
  },
  {
    description: "e-Property Auction",
    image: "https://rsebl.org.bt/agm/storage/serviceLogo/IV9Fn6XC66KtZOKEvsAvWyv1GAFuRY54H0LPweha.png",
    link: "https://www.services.rsebl.org.bt/auction/index.php",
  },
  {
    description: "Online Share Statement",
    image: "https://rsebl.org.bt/agm/storage/serviceLogo/ailCgaN14Y12UzZefNYlHhLW3AgIO0gYrOCCmGSu.png",
    link: "/ourservices/OnlineShareStmt",
  },
  {
    description: "Online Registration For Bhutanese Living Aboard (BLA)",
    image: "https://rsebl.org.bt/agm/storage/serviceLogo/ailCgaN14Y12UzZefNYlHhLW3AgIO0gYrOCCmGSu.png",
    link: "/ourservices/OnlineRegNRB",
  },
];

export default async function ListedScriptsPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {servicesData.map((services, index) => (
        <ServicesCards
          key={index}
          description={services.description}
          image={services.image}
          link={services.link}
        />
      ))}
    </div>
  );
}
