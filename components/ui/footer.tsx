"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Footer() {
  const [logos, setLogos] = useState([]);

  useEffect(() => {
    fetch("https://rsebl.org.bt/agm/api/fetch-listed-scripts")
      .then((response) => response.json())
      .then((data) => setLogos(data.map((item) => item.logo)));
  }, []);

  return (
    <footer className="py-16" role="contentinfo" aria-label="Site footer">
      <div className="container mx-auto px-6 flex flex-col space-y-10">
        {/* Carousel Section */}
        <div className="overflow-hidden relative">
          <div
            className="flex items-center space-x-6 animate-marquee"
            style={{
              animationDuration: `${logos.length * 0.5}s`,
            }}
          >
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
        </div>

        {/* Navigation Sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 text-center sm:text-left">
          {/* Logo Section */}
          <div className="flex justify-center">
            <a href="/" aria-label="Home">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={113}
                height={40}
                viewBox="0 0 153 138"
                fill="none"
              >
                <path
                  d="M87.4225 91.3752L65.3705 70.9525C64.0985 69.7752 64.0985 67.8659 65.3705 66.6885L126.916 9.6912C128.187 8.51387 130.248 8.51387 131.518 9.6912L193.064 66.6885C194.336 67.8659 194.336 69.7752 193.064 70.9525L131.518 127.95C130.248 129.127 128.187 129.127 126.916 127.95L111.918 114.062"
                  stroke="#205A8A"
                  strokeWidth="16.6253"
                  strokeMiterlimit={10}
                />
                <mask
                  id="mask0_2363_2582"
                  style={{ maskType: "luminance" }}
                  maskUnits="userSpaceOnUse"
                  x={0}
                  y={1}
                  width={147}
                  height={137}
                >
                  <path d="M0 0.999996H146.227V137.652H0V0.999996Z" fill="white" />
                </mask>
                <g mask="url(#mask0_2363_2582)">
                  <path
                    d="M114.908 46.7712L136.96 67.1939C138.232 68.3712 138.232 70.2805 136.96 71.4579L75.4147 128.455C74.1441 129.633 72.0827 129.633 70.8121 128.455L9.26674 71.4579C7.99474 70.2805 7.99474 68.3712 9.26674 67.1939L70.8121 10.1965C72.0827 9.01921 74.1441 9.01921 75.4147 10.1965L90.4121 24.0845"
                    stroke="#382E7A"
                    strokeWidth="16.6253"
                    strokeMiterlimit={10}
                  />
                </g>
              </svg>
            </a>
          </div>

          {/* Company Section */}
          <div>
            <h2 className="text-lg font-semibold text-custom-1">Company</h2>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/company/profile" className="text-gray-600 hover:text-blue-500">
                  Profile
                </Link>
              </li>
              <li>
                <Link href="/company/organogram" className="text-gray-600 hover:text-blue-500">
                  Organogram
                </Link>
              </li>
              <li>
                <Link href="/company/timeline" className="text-gray-600 hover:text-blue-500">
                  Timeline
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Section */}
          <div>
            <h2 className="text-lg font-semibold text-custom-1">Resources</h2>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/resources/debt" className="text-gray-600 hover:text-blue-500">
                  Debt
                </Link>
              </li>
              <li>
                <Link href="/resources/finances" className="text-gray-600 hover:text-blue-500">
                  Finances
                </Link>
              </li>
              <li>
                <Link href="/resources/equity" className="text-gray-600 hover:text-blue-500">
                  Equity
                </Link>
              </li>
              <li>
                <Link href="/resources/indices" className="text-gray-600 hover:text-blue-500">
                  Indices
                </Link>
              </li>
            </ul>
          </div>

          {/* Charts & Metrics Section */}
          <div>
            <h2 className="text-lg font-semibold text-custom-1">Charts & Metrics</h2>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/bsi" className="text-gray-600 hover:text-blue-500">
                  Bhutan Stock Index
                </Link>
              </li>
              <li>
                <Link href="/price-comparison" className="text-gray-600 hover:text-blue-500">
                  Price Comparison
                </Link>
              </li>
            </ul>
          </div>

          {/* More Section */}
          <div>
            <h2 className="text-lg font-semibold text-custom-1">More</h2>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/more/contact" className="text-gray-600 hover:text-custom-3">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/more/media" className="text-gray-600 hover:text-custom-3">
                  Media
                </Link>
              </li>
              <li>
                <Link href="/more/literacy" className="text-gray-600 hover:text-custom-3">
                  Literacy
                </Link>
              </li>
              <li>
                <Link href="/more/faqs" className="text-gray-600 hover:text-custom-3">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-300" />

        {/* Footer Bottom */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
          <p>
            Copyright © 2025{" "}
            <a href="www.rsebl.org.bt" className="text-custom-1 hover:underline">
              Royal Securities Exchange of Bhutan
            </a>
            . All rights reserved.
          </p>
          <ul className="flex space-x-4 mt-4 sm:mt-0">
            <li>
              <Link href="/privacy-policy" className="text-gray-600 hover:text-custom-3">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="https://rsebl.org.bt/agm/" className="text-gray-600 hover:text-custom-3">
                Staff Login
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <style jsx>{`
        .animate-marquee {
          display: flex;
          animation: marquee linear infinite;
        }

        @keyframes marquee {
          from {
            transform: translateX(0%);
          }
          to {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </footer>
  );
}