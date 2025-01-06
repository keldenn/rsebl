 "use client"

import { useState } from 'react';
import Image from 'next/image';

const HeroCarousel: React.FC = () => {
  const slides = [
    {
      src: '/images/banner.png',
      alt: 'Banner 1',
      buttonText: 'Generate Online Statement',
      buttonLink: '/learn-more',
    },
    {
      src: '/images/banner1.png',
      alt: 'Banner 2',
      buttonText: 'Get Started with m CaMS',
      buttonLink: '/get-started',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className=" xl:container rounded-lg xl:mx-auto relative w-full h-64 md:h-96 overflow-hidden">
      {/* Carousel Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
           <Image
            src={slide.src}
            alt={slide.alt}
            layout="fill"
            objectFit="cover"
            priority={true}
          />
          <div className="absolute inset-0 group flex flex-col justify-center items-center bg-black bg-opacity-0 transition duration-300 hover:bg-opacity-40">
            {/* <h2 className="text-white text-2xl md:text-4xl font-bold mb-4 opacity-0 transition duration-300 group-hover:opacity-100">
              {slide.alt}
            </h2> */}
            <a
              href={slide.buttonLink}
              className="px-6 py-2 bg-custom-2 text-white rounded-full text-sm md:text-base font-medium opacity-0 transition duration-300 group-hover:opacity-100"
            >
              {slide.buttonText}
            </a>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white p-2 rounded-full "
        onClick={prevSlide}
      >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            fill="#ffffff"
            height="25px"
            width="25px"
            version="1.1"
            id="Capa_1"
            viewBox="0 0 55.753 55.753"
            xmlSpace="preserve"
            >
            <g>
                <path d="M12.745,23.915c0.283-0.282,0.59-0.52,0.913-0.727L35.266,1.581c2.108-2.107,5.528-2.108,7.637,0.001   c2.109,2.108,2.109,5.527,0,7.637L24.294,27.828l18.705,18.706c2.109,2.108,2.109,5.526,0,7.637   c-1.055,1.056-2.438,1.582-3.818,1.582s-2.764-0.526-3.818-1.582L13.658,32.464c-0.323-0.207-0.632-0.445-0.913-0.727   c-1.078-1.078-1.598-2.498-1.572-3.911C11.147,26.413,11.667,24.994,12.745,23.915z" />
            </g>
        </svg>

      </button>

      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2  text-white p-2 rounded-full "
        onClick={nextSlide}
      >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            fill="#ffffff"
            height="25px"
            width="25px"
            version="1.1"
            id="Capa_1"
            viewBox="0 0 55.752 55.752"
            xmlSpace="preserve"
            >
            <g>
                <path d="M43.006,23.916c-0.28-0.282-0.59-0.52-0.912-0.727L20.485,1.581c-2.109-2.107-5.527-2.108-7.637,0.001   c-2.109,2.108-2.109,5.527,0,7.637l18.611,18.609L12.754,46.535c-2.11,2.107-2.11,5.527,0,7.637c1.055,1.053,2.436,1.58,3.817,1.58   s2.765-0.527,3.817-1.582l21.706-21.703c0.322-0.207,0.631-0.444,0.912-0.727c1.08-1.08,1.598-2.498,1.574-3.912   C44.605,26.413,44.086,24.993,43.006,23.916z" />
            </g>
            </svg>

      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-4 w-full flex justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? 'bg-white' : 'bg-gray-400'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
