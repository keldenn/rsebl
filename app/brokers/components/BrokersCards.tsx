"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { Button } from "@/components/ui/button";
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";
import { IoMdPerson } from "react-icons/io";

interface BrokersCardProps {
  description: string;
  image: string;
  broker: string;
  contact: string;
  email: string;
  location: string;
}

const BrokersCards: React.FC<BrokersCardProps> = ({
  description,
  image,
  broker,
  contact,
  email,
  location,
}) => {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => setFlipped(!flipped);

  return (
    <div className="group [perspective:1000px] w-full max-w-xs md:max-w-md lg:max-w-lg mx-auto">
      {/* Card Container with 3D Flip Animation */}
      <div
        className={`relative w-full h-80 md:h-96 lg:h-[30rem] transition-transform duration-700 [transform-style:preserve-3d] ${
          flipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        {/* Front Side */}
        <Card className="absolute w-full h-full rounded-xl border bg-card text-card-foreground shadow [backface-visibility:hidden]">
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
            <p className="text-sm md:text-base lg:text-lg text-gray-600 text-center">
              {description}
            </p>
          </CardBody>

          {/* Card Footer */}
          <CardFooter className="p-4">
            <Button
              variant="outline"
              className="w-full text-sm md:text-base"
              onClick={handleFlip}
            >
              Learn More
            </Button>
          </CardFooter>
        </Card>

        {/* Back Side */}
        <Card className="absolute w-full h-full rounded-xl border bg-card text-card-foreground shadow [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <CardHeader className="p-4">
            <div className="relative w-full flex flex-col">
              <p className="text-lg md:text-xl text-center flex text-center items-center gap-2">
                {description}
              </p>
              <p className="text-sm md:text-base text-gray-600 text-left flex items-center gap-2 pt-2">
                <IoMdPerson className="text-gray-500" />
                {broker}
              </p>
              <p className="text-sm md:text-base text-gray-600 text-left flex items-center gap-2 pt-1">
                <FaPhone className="text-gray-500" />
                {contact}
              </p>
              <p className="text-sm md:text-base text-gray-600 text-left flex items-center gap-2 pt-1 break-all">
                <FaEnvelope className="text-gray-500" />
                {email}
              </p>
              <p className="text-sm md:text-base text-gray-600 text-left flex items-center gap-2 pt-2 break-all">
                <FaMapMarkerAlt className="text-gray-500" />
                {location}
              </p>
            </div>
          </CardHeader>

          {/* Card Footer */}
          <CardFooter className="p-4">
            <Button
              variant="outline"
              className="w-full text-sm md:text-base text-gray-800 bg-white hover:bg-gray-200"
              onClick={handleFlip}
            >
              Go Back
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default BrokersCards;
