"use client";

import { useEffect, useState } from "react";

export default function LogoCarousel() {
  const [logos, setLogos] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/fetch-listed-scripts`)
      .then((response) => response.json())
      .then((data) => setLogos(data.map((item) => item.logo)));
  }, []);

  return (
    <div className="overflow-hidden relative w-full py-4">
      <div className="flex items-center space-x-6 marquee">
        {[...logos, ...logos].map((logo, index) => (
          <div
            key={index}
            className="flex-shrink-0 p-1 hover:scale-110 transition-transform duration-300 ease-in-out"
          >
            <img
              src={logo}
              alt={`Logo ${index + 1}`}
              className="w-24 h-20 object-contain"
            />
          </div>
        ))}
      </div>

      <style jsx>{`
        .marquee {
          display: flex;
          width: max-content;
          animation: marquee 15s linear infinite;
        }

        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
