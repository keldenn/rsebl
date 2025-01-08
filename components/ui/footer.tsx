"use client"

import Link from "next/link"

export default function Footer() {
  return (
    <footer className="py-16 bg-gray-50" role="contentinfo" aria-label="Site footer">
    <div className="container mx-auto px-6 flex flex-col space-y-10">
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
          <h2 className="text-lg font-semibold">Company</h2>
          <ul className="mt-4 space-y-2">
            <li><a href="#" className=" text-gray-600 hover:text-blue-500 ">Profile</a></li>
            <li><a href="#" className=" text-gray-600 hover:text-blue-500 ">Organogram</a></li>
            {/* <li><a href="#" className=" text-gray-600 hover:text-blue-500 ">Careers</a></li>
            <li><a href="#" className=" text-gray-600 hover:text-blue-500 ">Partners</a></li> */}
          </ul>
        </div>

        {/* Resources Section */}
        <div>
          <h2 className="text-lg font-semibold">Resources</h2>
          <ul className="mt-4 space-y-2">
            <li><a href="#" className=" text-gray-600 hover:text-blue-500 ">Debt</a></li>
            <li><a href="#" className=" text-gray-600 hover:text-blue-500 ">Finances</a></li>
            <li><a href="#" className=" text-gray-600 hover:text-blue-500 ">Equity</a></li>
            <li><a href="#" className=" text-gray-600 hover:text-blue-500 ">Indices</a></li>
          </ul>
        </div>

        {/* Account Section */}
        <div>
          <h2 className="text-lg font-semibold">Downloads</h2>
          <ul className="mt-4 space-y-2">
            <li><a href="#" className=" text-gray-600 hover:text-blue-500 ">Forms</a></li>
            <li><a href="#" className=" text-gray-600 hover:text-blue-500 ">Regulations</a></li>
            <li><a href="#" className=" text-gray-600 hover:text-blue-500 ">Reports</a></li>
            {/* <li><a href="#" className=" text-gray-600 hover:text-blue-500 ">Terms</a></li> */}
          </ul>
        </div>

        {/* media */}
        <div>
          <h2 className="text-lg font-semibold">Media</h2>
          <ul className="mt-4 space-y-2">
            <li><a href="#" className=" text-gray-600 hover:text-blue-500 ">Press Release</a></li>
            <li><a href="#" className=" text-gray-600 hover:text-blue-500 ">Newsletter</a></li>
            {/* <li><a href="#" className=" text-gray-600 hover:text-blue-500 ">Help Articles</a></li>
            <li><a href="#" className=" text-gray-600 hover:text-blue-500 ">Feedback Form</a></li> */}
          </ul>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-gray-300" />

      {/* Footer Bottom */}
      <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
        <p>
          Copyright © 2025 <a href="www.rsebl.org.bt" className="text-blue-500 hover:underline">Royal Securities Exchange of Bhutan</a>. All rights reserved.
        </p>
        <ul className="flex space-x-4 mt-4 sm:mt-0">
          <li><a href="#" className=" text-gray-600 hover:text-blue-500 ">Privacy Policy</a></li>
          <li><a href="#" className=" text-gray-600 hover:text-blue-500 ">Terms of Service</a></li>
          <li><a href="#" className=" text-gray-600 hover:text-blue-500 ">Staff Login</a></li>
        </ul>
      </div>
    </div>
  </footer>
  )
}
