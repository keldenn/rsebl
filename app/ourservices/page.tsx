// import type { Metadata } from "next";
import ServicesCards from "./components/ServicesCards";
//import Link from "next/link";
const servicesData = [
  {
    description: "Online Client Terminal(mCaMs)",
    image: `${process.env.NEXT_PUBLIC_BASE_URL}/serviceLogo/acIVXa07xjQtrDGxNNWBS7B92PbGXaIC6ghdSRnx.png`,
    link: "/ourservices/m-cams",
  },
  {
    description: "Bhutan CrowdFunding",
    image: `${process.env.NEXT_PUBLIC_BASE_URL}/serviceLogo/m3nZXM2akeYjqnW4LJfYc70imFhQrxxElJE0F6AZ.png`,
    link: "https://bhutancrowdfunding.rsebl.org.bt/",
  },
  { 
    description: "Agricultural Commodities Market Initiative",
    image: `${process.env.NEXT_PUBLIC_BASE_URL}/serviceLogo/XSwvhhZIi5gvwXjnJVlsMVPdTnIETI3hjTmZfmnB.png`,
    link: "https://www.services.rsebl.org.bt/BCMI/public/index.php",
  },
  {
    description: "Bhutan Commodity Exchange",
    image: `${process.env.NEXT_PUBLIC_BASE_URL}/serviceLogo/BP0ZllBQcwcEDiw4ufjITCwU1cXULc3fSYpFIxHs.png`,
    link: "https://www.services.rsebl.org.bt/BCE/login.php",
  },
  {
    description: "e-Property Auction",
    image: `${process.env.NEXT_PUBLIC_BASE_URL}/serviceLogo/IV9Fn6XC66KtZOKEvsAvWyv1GAFuRY54H0LPweha.png`,
    link: "https://www.services.rsebl.org.bt/auction/index.php",
  },
  {
    description: "Online Share Statement",
    image: `${process.env.NEXT_PUBLIC_BASE_URL}/serviceLogo/ailCgaN14Y12UzZefNYlHhLW3AgIO0gYrOCCmGSu.png`,
    link: "/ourservices/online-share-statement",
  }
];

export default async function ServicesPage() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-4">
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

// "use client"

// import { useEffect, useState } from "react";
// import ServicesCards from "./components/ServicesCards";

// export default function ServicesPage() {
//   const [servicesData, setServicesData] = useState([]);

//   useEffect(() => {
//     const fetchServices = async () => {
//       try {
//         const response = await fetch("process.env.NEXT_PUBLIC_API_URL}//fetch-active-services");
//         const data = await response.json();

//         const formattedData = data.map((service: any) => ({
//           description: service.name,
//           image: `{process.env.NEXT_PUBLIC_BASE_URL}/${service.logo}`,
//           link: service.link,
//         }));

//         setServicesData(formattedData);
//       } catch (error) {
//         console.error("Error fetching services:", error);
//       }
//     };

//     fetchServices();
//   }, []);

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-4">
//       {servicesData.map((service, index) => (
//         <ServicesCards
//           key={index}
//           description={service.description}
//           image={service.image}
//           link={service.link}
//         />
//       ))}
//     </div>
//   );
// }
