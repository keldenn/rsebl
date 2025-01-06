import type { Metadata } from "next";
import CompanyCards from "./components/CompanyCards";

export const metadata: Metadata = {
  title: "Finly: Stock screener",
  description: "Find the best stocks to buy now with the Finly stock screener.",
};

const companyData = [
  {
    title: "BBPL",
    description: "BHUTAN BOARD PRODUCTS LTD.",
    image: "https://rsebl.org.bt/online/assets/img/companies/BBPL.png",
    price: 24.1,
    priceChange: -1.4,
  },
  {
    title: "BCCL",
    description: "BHUTAN CARBIDE & CHEMICALS LTD.",
    image: "https://rsebl.org.bt/online/assets/img/companies/BCCL.png",
    price: 48.2,
    priceChange: 2.1,
  },
  {
    title: "BFAL",
    description: "BHUTAN FERRO ALLOYS LTD.",
    image: "https://rsebl.org.bt/online/assets/img/companies/BFAL.png",
    price: 31.5,
    priceChange: -0.9,
  },
  {
    title: "BIL",
    description: "BHUTAN INSURANCE LTD.",
    image: "https://rsebl.org.bt/online/assets/img/companies/BIL.png",
    price: 31.5,
    priceChange: -0.9,
  },
  {
    title: "BNBL",
    description: "BHUTAN NATIONAL BANK LTD.",
    image: "https://rsebl.org.bt/online/assets/img/companies/BNB.png",
    price: 31.5,
    priceChange: -0.9,
  },
  {
    title: "BPCL",
    description: "BHUTAN POLYMERS COMPANY LTD.",
    image: "https://rsebl.org.bt/online/assets/img/companies/BPCL.png",
    price: 31.5,
    priceChange: -0.9,
  },
  {
    title: "BTCL",
    description: "BHUTAN TOURISM CORPORATION LTD.",
    image: "https://rsebl.org.bt/online/assets/img/companies/BTCL.png",
    price: 31.5,
    priceChange: -0.9,
  },
  {
    title: "DFAL",
    description: "DRUK FERROS ALLOYS LTD.",
    image: "	https://rsebl.org.bt/online/assets/img/companies/DFAL.png",
    price: 31.5,
    priceChange: -0.9,
  },
  {
    title: "DPL",
    description: "DUNGSAM POLYMERS LTD.",
    image: "https://rsebl.org.bt/online/assets/img/companies/DPL.png",
    price: 31.5,
    priceChange: -0.9,
  },
  {
    title: "DPNB",
    description: "BHUTAN TOURISM CORPORATION LTD.",
    image: "https://rsebl.org.bt/online/assets/img/companies/DPNB.png",
    price: 31.5,
    priceChange: -0.9,
  },
  {
    title: "DWAL",
    description: "DRUK WANG ALLOYS LTD.",
    image: "https://rsebl.org.bt/online/assets/img/companies/DWAL.png",
    price: 31.5,
    priceChange: -0.9,
  },
  {
    title: "GICB",
    description: "GIC BHUTAN REINSURANCE CO. LTD.",
    image: "https://rsebl.org.bt/online/assets/img/companies/GBRL.png",
    price: 31.5,
    priceChange: -0.9,
  },
  {
    title: "KCL",
    description: "KUENSEL CORPORATION LTD.",
    image: "https://rsebl.org.bt/online/assets/img/companies/KCL.png",
    price: 31.5,
    priceChange: -0.9,
  },
  {
    title: "PCAL",
    description: "PENDEN CEMENT AUTHORITY LTD.",
    image: "https://rsebl.org.bt/online/assets/img/companies/PCAL.png",
    price: 31.5,
    priceChange: -0.9,
  },
  {
    title: "RICBL",
    description: "ROYAL INSURANCE COPORATION OF BHUTAN LTD.",
    image: "https://rsebl.org.bt/online/assets/img/companies/RICB.png",
    price: 31.5,
    priceChange: -0.9,
  },
  {
    title: "STCBL",
    description: "STATE TRADING CORPORATION OF BHUTAN LTD.",
    image: "https://rsebl.org.bt/online/assets/img/companies/STCB.png",
    price: 31.5,
    priceChange: -0.9,
  },
  {
    title: "SVL",
    description: "SHERZA VENTURES LTD.",
    image: "https://rsebl.org.bt/online/assets/img/companies/SVLlogo.png",
    price: 31.5,
    priceChange: -0.9,
  },
  {
    title: "TBL",
    description: "T BANK LTD.",
    image: "https://rsebl.org.bt/online/assets/img/companies/TBL.png",
    price: 31.5,
    priceChange: -0.9,
  },
];

export default async function ListedScriptsPage() {
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
        />
      ))}
    </div>
  );
}
