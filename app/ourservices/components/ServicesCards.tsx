import React from "react";
import Link from "next/link";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { Button } from "@/components/ui/button";

interface ServicesCardProps {
  description: string;
  image: string;
  link: string;
}

const ServicesCards: React.FC<ServicesCardProps> = ({ description, image, link }) => {
  return (
    <Card
      className="rounded-xl border bg-card text-card-foreground shadow"
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
        <p className="text-sm text-gray-600 dark:text-gray-400 text-center">{description}</p>
      </CardBody>

      {/* Card Footer */}
      <CardFooter className="p-4">
        <Link href={link} passHref>
          <Button variant="outline" >
            Learn More
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ServicesCards;
