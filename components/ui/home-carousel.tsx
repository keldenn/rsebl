"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const HeroCarousel: React.FC = () => {
  const banners = [
    {
      id: 1,
      title: "Click here for Online Share Statement",
      file_path: "/images/banner1.png",
      clickable_link: "https://rsebl.org.bt/#/OnlineShareStmt/1",
    },
    {
      id: 2,
      title: "Click here to Renew McAms",
      file_path: "/images/banner.png",
      clickable_link: "https://rsebl.org.bt/#/OnlineRenew/1",
    },
    {
      id: 3,
      title: "Click here to Register for McAms",
      file_path: "/images/banner1.png",
      clickable_link: "https://rsebl.org.bt/#/onlineTerminal/1",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Function to change slide automatically
  const autoSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  useEffect(() => {
    // Start the interval when the component mounts
    const interval = setInterval(() => {
      if (!isHovered) {
        autoSlide();
      }
    }, 7000); // Change slide every 3 seconds

    // Clear the interval when the component is unmounted or when hover occurs
    return () => clearInterval(interval);
  }, [isHovered]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1
    );
  };

  return (
    <div
      className="xl:container rounded-lg xl:mx-auto relative w-full h-64 md:h-96 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)} // Stop the animation when hovered
      onMouseLeave={() => setIsHovered(false)} // Resume the animation when mouse leaves
    >
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${
            index === currentIndex ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
          }`}
        >
          <Image
            src={banner.file_path}
            alt={banner.title}
            layout="fill"
            objectFit="cover"
            priority={true}
          />
          <div className="absolute inset-0 group flex flex-col justify-center items-center bg-black bg-opacity-0 transition duration-300 hover:bg-opacity-40">
            <a
              href={banner.clickable_link}
              className="px-6 py-2 bg-custom-2 text-white rounded-full text-sm md:text-base font-medium opacity-0 transition duration-300 group-hover:opacity-100"
            >
              {banner.title}
            </a>
          </div>
        </div>
      ))}

      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white p-2 rounded-full"
        onClick={prevSlide}
      >
        &#10094;
      </button>

      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white p-2 rounded-full"
        onClick={nextSlide}
      >
        &#10095;
      </button>

      <div className="absolute bottom-4 w-full flex justify-center space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${index === currentIndex ? "bg-white" : "bg-gray-400"}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
