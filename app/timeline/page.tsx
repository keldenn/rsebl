"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
export default function Page() {
    const timelineData = [
        {
          date: "2023-03-23",
          title: "MoU Signing of Bhutan Commodity Exchange Initiative",
          description: "The Memorandum of Understanding was signed between the Department of Agricultural Marketing and Cooperatives, Ministry of Agriculture & Livestock, the Food Corporation of Bhutan, and Royal Securities Exchange of Bhutan on the development of the Bhutan Commodity Exchange Initiative (BCEI).",
          image: "https://rsebl.org.bt/agm/storage/timeline/1zLs33Wxo3qKecmHmCUJvmDdZMmn2DsCnpSGsNhe.jpg"
        },
        {
          date: "2022-08-11",
          title: "ACMI Launch",
          description: "RSEB with DAMC under the Ministry of Agriculture and Forests successfully launched ACMI (Agricultural Commodity Market Initiative), an online marketplace for farmers, producers, traders, and consumers to buy and sell agriculture, livestock, and Non-wood Forest Products. The MoU was signed by the CEO of RSEB and Dasho Secretary of MoAF.",
          image: "https://rsebl.org.bt/agm/storage/timeline/nndHtH0cBoh6rMuj511dDJkYxdq55baFOzL0bR7o.jpg"
        },
        {
          date: "2021-04-09",
          title: "Broker Training",
          description: "Royal Securities Exchange of Bhutan successfully conducted the brokers training for representatives from Bhutan Post from 5th to 9th April 2021.",
          image: "https://rsebl.org.bt/agm/storage/timeline/GiaCNztmlRav3ARj3uECMX1v6c4MVk8Qeo33Ilgc.jpg"
        },
        {
          date: "2020-02-21",
          title: "Tribute",
          description: "As a tribute to His Majesty's 40th birth anniversary, RSEB launched three new systems: Automated Reporting Management System (ARMs), Impact Bhutan, and Property e-Auction System (PeAS), aligning with His Majesty's vision and emphasis on technological revolution. ARMs is an upgraded version of the existing website, focused on enhancing customer experience and disseminating information to the masses. It bridges the gap between investors and listed companies, serving as a self-service portal for companies to update information in real-time.",
          image: "https://rsebl.org.bt/agm/storage/timeline/79G6RcwLEPev5ma0pAKB8gCOUe5YpkvYyHPTZNhW.png"
        },
        {
            date: "2019-12-31",
            title: "Launch of Base Divisor for BSI",
            description: `The RSEB launched the Base Divisor for Bhutan Stock Index (BSI). In his remarks during the launch, the CEO of RSEB said, "The world outside relies on stock index as performance of economy because majority of the companies which contribute to GDP are listed on the exchange. Based on their performance, to a certain extent, policymakers tend to benchmark performance of stock index while taking economic decisions."`,
            image: "https://rsebl.org.bt/agm/storage/timeline/oqpr5uMNDSBMiYFZG6zfG1p2GZFdYnZBZ2f6nT35.jpg" 
          },
          {
            date: "2019-09-04",
            title: "Bhutan Commodity Exchange",
            description: `Today, RSEBL with FCB launched e-commodity exchange (online auction) in Samdrup Jongkhar. Farmers & traders were given talks exclusively on the benefits of online auctioning, which was developed to meet a win-win situation for both business parties. Honourable CEO of RSEBL, Mr. Dorji Phuntsho, emphasized that trust is an important part of the equation to create a vibrant & sustainable business model.`,
            image: "https://rsebl.org.bt/agm/storage/timeline/Aiv3r9E3nPpG8TQePOBtwIFFPKvCiVNv0UqSsxVM.jpg" 
          },
          {
            date: "2019-07-19",
            title: "Himalayan Chips",
            description: `Himalayan Chips, a Bhutan-based food industry specializing in making chips from organic products, started by two young entrepreneurs, successfully raised Nu. 4.5 Million in one month through BhutanCrowdfunding.`,
            image: "https://rsebl.org.bt/agm/storage/timeline/H7ey9WzbSnmWrZyZKZc4e1M2vofRs4VGjbVCYyol.jpg" 
          },
          {
            date: "2019-07-17",
            title: "Bhutan Alternatives",
            description: `Bhutan Alternatives is the first campaign to successfully raise funds through the BhutanCrowdfunding portal. It raised Nu.8,340,000 in just one month. Bhutan Alternatives is a Social Entrepreneurship with a motto of attaining Zero-Waste by maximizing resource recovery to create a sustainable waste management system and protect the unique ecology.`,
            image: "https://rsebl.org.bt/agm/storage/timeline/Nz47gJGEDa6out2Ole7vV8LPOkScc3iYAPjkisYX.jpg"
          },
          {
            date: "2018-09-12",
            title: "Bhutan Commodity Exchange",
            description: `The RSEB and FCB inaugurated two potato grading machines at the FCB Auction yard in Phuentsholing today.`,
            image: "https://rsebl.org.bt/agm/storage/timeline/Nz47gJGEDa6out2Ole7vV8LPOkScc3iYAPjkisYX.jpg" 
          },
      ];
      const [visibleCount, setVisibleCount] = useState(4);

      const handleLoadMore = () => {
        setVisibleCount(prevCount => prevCount + 4);
      };
    
    return (
        <>
           <div className="relative container xl:p-5">
<div className="absolute md:left-1/2 left-4 transform md:-translate-x-1/2 translate-x-0 w-1 bg-gray-300 h-full"></div>
    <div className="timeline-container space-y-12">
    {timelineData.slice(0, visibleCount).map((item, index) => (
            <div key={index} className={`flex flex-col md:flex-row ${index % 2 === 0 ? '' : 'md:flex-row-reverse'} relative`}>
              <div className="md:w-1/2 p-4 md:m-12">
                <h2 className="py-4 text-xl font-medium ">{item.date} {item.title}</h2>
                
                <p className="mt-2">{item.description}</p>
              </div>
              <div className="md:w-1/2 p-4 md:m-12">
                <img src={item.image} alt={item.title} className="w-full h-full" />
              </div>
              <div className="absolute left md:left-1/2 md:mt-[82px] mt-[32px] transform md:-translate-x-1/2 translate-x-[-26px] bg-custom-1 w-6 h-6 rounded-full border-4 border-white"></div>
              </div>
          ))}
        </div>
    
      </div>
        
        {visibleCount < timelineData.length && (
        <div className="text-center mt-5">
       
           <Button
                      variant="outline"
                      size="sm"
                      className="my-5 "
                      onClick={handleLoadMore}
                    >
                     Load More
                    </Button>
          
        </div>
      )}
        </>
     
      
    );
  }
  