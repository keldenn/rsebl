"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const HeroCarousel: React.FC = () => {
  const [banners, setBanners] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/fetch-banners`
        );
        const data = await response.json();
        setBanners(data);
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };

    fetchBanners();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="xl:container rounded-lg xl:mx-auto relative w-full h-64 md:h-96 overflow-hidden">
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_URL}${banner.file_path}`}
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
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
