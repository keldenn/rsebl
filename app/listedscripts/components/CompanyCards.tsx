import React from "react";
import Link from "next/link"; // Import the Link component
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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

  // Format price and priceChange to currency and number with 2 decimal points
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'BTN',
    maximumFractionDigits: 2,
  }).format(price);

  const formattedPriceChange = priceChange.toFixed(2);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "/path/to/fallback/image.png"; // Use a fallback image
  };

  return (
    <Card className="rounded-xl shadow-lg border flex-auto min-w-[300px] flex flex-col justify-between ">
      <CardHeader className="flex flex-row justify-between items-center pb-2">
        <div className="flex flex-col flex-1">
          <CardTitle className="text-base font-bold">{title}</CardTitle>
          <CardDescription className="text-xs text-default-500">{description}</CardDescription>
          <div className={`flex items-center ${isPositive ? "text-green-500" : "text-red-500"} space-x-1 pt-1`}>
            <span className="text-base font-bold">{formattedPrice}</span>
            <span className="text-xs">{isPositive ? "↑" : "↓"}</span>
          </div>
          <small className={isPositive ? "text-green-500" : "text-red-500"}>{isPositive ? "+" : ""}{formattedPriceChange}</small>
        </div>
        <div className="ml-4 flex-shrink-0">
          <img
            src={image}
            alt={`${title} Logo`}
            className="w-[130px] h-[70px] object-contain"
            onError={handleImageError} // Add fallback image handling
          />
        </div>
        
      </CardHeader>
      <div className="py-4 px-4">
        <Link href={link} passHref>
          <Button className="w-full py-2 px-4 text-sm font-medium" variant="outline">
            Tell me more
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default CompanyCards;
