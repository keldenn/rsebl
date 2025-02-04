"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { Button } from "@/components/ui/button";
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";
import { IoMdPerson } from "react-icons/io";

interface BrokersCardProps {
  brokerage_name: string;
  file_path: string;
  broker_name: string;
  phone: string;
  email: string;
  address: string;
}

const BrokersCards: React.FC<BrokersCardProps> = ({
  brokerage_name,
  file_path,
  broker_name,
  phone,
  email,
  address,
}) => {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => setFlipped(!flipped);

  return (
    <div className="group [perspective:1000px] w-full max-w-xs mx-auto">
      {/* Card Container with 3D Flip Animation */}
      <div
        className={`relative w-full h-80 transition-transform duration-700 [transform-style:preserve-3d] ${
          flipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        {/* Front Side */}
        <Card className="absolute w-full h-full rounded-xl border bg-card text-card-foreground shadow [backface-visibility:hidden]">
          {/* Card Header */}
          <CardHeader className="p-6">
            <div className="relative w-full h-40">
              <img
                src={file_path}
                alt={broker_name}
                className="object-contain w-full h-full p-2"
              />
            </div>
          </CardHeader>

          {/* Card Body */}
          <CardBody className="p-4 space-y-2">
            <p className="text-sm text-gray-600 text-center">{brokerage_name}</p>
          </CardBody>

          {/* Card Footer */}
          <CardFooter className="p-4">
            <Button
              variant="outline"
              className="w-full text-sm"
              onClick={handleFlip}
            >
              Learn More
            </Button>
          </CardFooter>
        </Card>

        {/* Back Side */}
        <Card className="absolute w-full flex flex-col justify-between h-full rounded-xl border bg-card text-card-foreground shadow [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <CardHeader className="p-4">
          <div className="relative w-full flex flex-col">
        <p className="text-md mb-5 text-center">{brokerage_name}</p>

        <p className="text-sm text-gray-600 flex items-center gap-3 pt-2">
          <IoMdPerson className="w-1/8 h-5 text-custom-1" />
          <span className="w-5/6">{broker_name}</span>
        </p>

        <p className="text-sm text-gray-600 flex items-center gap-3 pt-2">
          <FaPhone className="w-1/8 h-5 text-custom-1" />
          <span className="w-5/6">{phone}</span>
        </p>

        <p className="text-sm text-gray-600 flex items-center gap-3 pt-2">
          <FaEnvelope className="w-1/8 h-5 text-custom-1" />
          <span className="break-all w-5/6">{email}</span>
        </p>

        <p className="text-sm text-gray-600 flex items-center gap-3 pt-2">
          <FaMapMarkerAlt className="w-1/8 h-5 text-custom-1" />
          <span className="break-all w-5/6">{address}</span>
        </p>
      </div>``

          </CardHeader>

          {/* Card Footer */}
          <CardFooter className="p-4">
            <Button
              variant="outline"
              className="w-full text-sm text-gray-800 bg-white hover:bg-gray-200"
              onClick={handleFlip}
            >
              Done
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default BrokersCards;
