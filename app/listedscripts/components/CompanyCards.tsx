import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Image } from "@nextui-org/react";

interface CompanyCardProps {
  title: string;
  description: string;
  image: string;
  price: number;
  priceChange: number;
}

const CompanyCards: React.FC<CompanyCardProps> = ({
  title,
  description,
  image,
  price,
  priceChange,
}) => {
  const isPositive = priceChange >= 0;

  return (
    <Card className="max-w-sm rounded-xl shadow-lg border group relative transition-transform duration-300 hover:scale-105 hover:bg-gray-100">
      <div className="absolute inset-0 bg-transparent group-hover:bg-gray-900 group-hover:bg-opacity-10 transition-colors duration-300 rounded-xl"></div>
      <CardHeader className="flex justify-between pb-0 pt-2 px-4 z-10 relative">
        <div className="flex flex-col">
          <p className="text-base font-bold">{title}</p>
          <small className="text-xs text-default-500">{description}</small>
        </div>
        <div className="flex flex-col items-end text-right">
          <div
            className={`flex items-center ${
              isPositive ? "text-green-500" : "text-red-500"
            } space-x-1`}
          >
            <span className="text-large font-bold">Nu. {price.toFixed(2)}</span>
            <span className="text-sm">{isPositive ? "↑" : "↓"}</span>
          </div>
          <small className={isPositive ? "text-green-500" : "text-red-500"}>
            {isPositive ? "+" : ""}
            {priceChange.toFixed(2)}
          </small>
        </div>
      </CardHeader>
      <CardBody className="flex justify-center items-center py-6 z-10 relative">
        <Image
          src={image}
          alt={`${title} Logo`}
          width={120}
          height={120}
          className="rounded-full"
        />
      </CardBody>
      <CardFooter className="py-4 px-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-10 relative">
        <button className="w-full py-2 px-4 text-sm font-medium text-purple-600 border border-purple-600 rounded-md hover:bg-purple-50">
          Tell me more
        </button>
      </CardFooter>
    </Card>
  );
};

export default CompanyCards;
