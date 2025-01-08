import React from "react";
import Link from "next/link"; // Import the Link component
import { Card, CardHeader, CardBody, CardFooter, Image } from "@nextui-org/react";

interface CompanyCardProps {
  title: string;
  description: string;
  image: string;
  price: number;
  priceChange: number;
  link: string; // Add a link prop for navigation
}

const CompanyCards: React.FC<CompanyCardProps> = ({
  title,
  description,
  image,
  price,
  priceChange,
  link, // Destructure the link prop
}) => {
  const isPositive = priceChange >= 0;

  return (
    <Card className="rounded-xl shadow-lg border group relative transition-transform duration-300 hover:scale-105 hover:bg-gray-100 flex-auto min-w-[300px]">
      <div className="absolute inset-0 bg-transparent transition-colors duration-300 rounded-xl"></div>

      {/* Card content */}
      <CardHeader className="flex justify-between pb-0 pt-2 px-4 z-10 relative items-center">
        <div className="flex flex-col flex-1">
          <p className="text-base font-bold">{title}</p>
          <small className="text-xs text-default-500 ">
            {description}
          </small>
          <div
            className={`flex items-center ${
              isPositive ? "text-green-500" : "text-red-500"
            } space-x-1`}
          >
            <span className="text-base font-bold">Nu. {price.toFixed(2)}</span>
            <span className="text-xs">{isPositive ? "↑" : "↓"}</span>
          </div>
          <small className={isPositive ? "text-green-500" : "text-red-500"}>
            {isPositive ? "+" : ""}
            {priceChange.toFixed(2)}
          </small>
        </div>
        <div className="flex flex-col items-end text-right ml-4">
          <Image
            src={image}
            alt={`${title} Logo`}
            width={130}
            height={70}
          />
        </div>
      </CardHeader>

      {/* Button below card */}
      <div className="py-4 px-4 opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-fit group-hover:mt-2 transition-all duration-300 z-10 relative">
        <Link href={link} passHref>
          <button className="w-full py-2 px-4 text-sm font-medium text-purple-600 border border-purple-600 rounded-md hover:bg-purple-50">
            Tell me more
          </button>
        </Link>
      </div>
    </Card>
  );
};

export default CompanyCards;
