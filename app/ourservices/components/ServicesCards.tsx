import React from "react";
import Link from "next/link";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";

interface ServicesCardProps {
  description: string;
  image: string;
  link: string;
}

const ServicesCards: React.FC<ServicesCardProps> = ({ description, image, link }) => {
  return (
    <Card
      isHoverable
      isPressable
      className="rounded-lg transition-transform hover:scale-105 group"
    >
      {/* Card Header with Consistent Aspect Ratio */}
      <CardHeader className="p-0">
        <div className="relative w-full h-40">
          <img
            src={image}
            alt={description}
            className="object-contain w-full h-full p-2"
          />
        </div>
      </CardHeader>

      {/* Card Body */}
      <CardBody className="p-4 space-y-2">
        <p className="text-sm text-gray-600 text-center">{description}</p>
      </CardBody>

      {/* Card Footer */}
      <CardFooter className="p-4">
        <Link href={link} passHref>
          <button className="w-full py-2 px-4 text-sm font-medium text-purple-600 border border-purple-600 rounded-md hover:bg-purple-50">
            Learn More
          </button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ServicesCards;
