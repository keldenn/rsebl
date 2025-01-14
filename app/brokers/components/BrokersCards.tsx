import React from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { Button } from "@/components/ui/button";

interface BrokersCardProps {
  description: string;
  image: string;
}

const BrokersCards: React.FC<BrokersCardProps> = ({ description, image }) => {
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
        <p className="text-sm text-gray-600 text-center">{description}</p>
      </CardBody>

      {/* Card Footer */}
      <CardFooter className="p-4">
          <Button variant="outline" className="w-full">
            Learn More
          </Button>
      </CardFooter>
    </Card>
  );
};
    
export default BrokersCards;
