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
    broker: "Pasuram Tirwa / Sangay Tenzin/ Sarita Poudel",
    contact: "17612015/ 77487283/ 17970963",
    email: "sangay_tenzin2@ricb.bt/sarita_poudel@ricb.bt/pasuram_tirwa@ricb.bt",
    location: "RICB, RICBL Building, Thimphu"
    
  },
  
  {
    description: "BNB Securities",
    image: "https://rsebl.org.bt/agm/storage/brokers/XJsFYGxjJMyLcN8R7mW9GP5FUEuj3ndzlVPgYuvk.jpg",
    broker: "Kesang Deki Dukpa/ Karma Choden",
    contact: "77117479/ 17434138",
    email: "kesdeki@bnb.bt/ karmachoden@bnb.bt",
    location: "BNBL Building, Thimphu"
  },
  {
    description: "BOB Securities",
    image: "https://rsebl.org.bt/agm/storage/brokers/BmFZwHnbgMiYiAJvdLmXGLdszZQhMEExjPeC8kSC.png",
    broker: "Sonam Peldon",
    contact: "77789206",
    email: "sonam.peldon2956@bob.bt",
    location: "BoBL, Corporate Office, Norzin Lam, Thimphu"
  },
  {
    description: "Drukyul Securities Broker Pvt. Ltd",
    image: "https://rsebl.org.bt/agm/storage/brokers/z4ix1BpZevYIWAVRadMQSO2N48XEsJ91Ch7vHtvF.png",
    broker: "Tshering Chophel",
    contact: "77142330",
    email: "drukyulsecurities@gmail.com",
    location: "Room No 301, Karsang Building, Jangchub Lam, Thimphu"
  },
  {
    description: "Lekpay Dolma Securities Broker Pvt. Ltd",
    image: "https://rsebl.org.bt/agm/storage/brokers/BODtPeEmwVP1OCWrZTcEMfuJ6PSA3lpWKsesUwTf.png",
    broker: "Tashi Wangchen",
    contact: "77108828",
    email: "lekpaydolmashares@gmail.com",
    location: "Post Box No 761, Namgyel Plaza Building, Thimphu"
  },
  {
    description: "Sershing Securities Broker Pvt Ltd",
    image: "https://rsebl.org.bt/agm/storage/brokers/P106GW5GkZv4xHIVyfFxZlcu6k0UMmuC68LtzppN.png",
    broker: "Kinley Pem",
    contact: "17955891",
    email: "sershingsecurities@gmail.com",
    location: "Yangchen Lam, Post Box No 369, Thimphu"
  },
  {
    description: "Bhutan Post Securities",
    image: "https://rsebl.org.bt/agm/storage/brokers/YVp9LVWGRnRjBrzborgpAvQupbPjrPsyKqIONWcw.png",
    broker: "Ugyen Tshomo",
    contact: "17248632",
    email: "ugyen.tshomo@bhutanpost.bt",
    location: "Bhutan Post Head Quater, Chang Lam, Thimphu, Bhutan"
  },
  {
    description: "BDB Securities",
    image: "https://rsebl.org.bt/agm/storage/brokers/IlHWuSbmqjpMWvnsGtrvnsZZsuEo80fO5rduPWDw.png",
    broker: "Kencho Wangmo",
    contact: "17455833",
    email: "kencho.wangmo@bdb.bt",
    location: "BDBL, BDBL Building, Thimphu"
  },
  {
    description: "Rinson Securities Pvt.Ltd",
    image: "https://rsebl.org.bt/agm/storage/brokers/OmkjehidFtFwm79fBTlP4fTZiD2YiCcedJun9wN7.png",
    broker: "Anisha Gurung",
    contact: "77642981",
    email: "rinsecurities@gmail.com",
    location: "Soenamling Building, Jangchub lam, P.O. Box 987, Thim Throm, Thimphu"
  },
];

export default async function BrokersPage() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-4">
      {BrokersData.map((brokers, index) => (
        <BrokersCards
          key={index}
          description={brokers.description}
          image={brokers.image}
          broker={brokers.broker}
          contact={brokers.contact}
          email={brokers.email}
          location={brokers.location}
        />
      ))}
    </div>
  );
}