"use client";

import Image from "next/image";
import { useParams } from "next/navigation";

const ServicesIdPage = () => {
  const params = useParams();
  const servicesId = params?.servicesId;

  // Define UI for each service ID
  const renderContent = () => {
    switch (servicesId) {
      case "mCaMs":
        return (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 md:p-8 rounded-xl border bg-card text-card-foreground shadow">
              {/* Mobile App Mockup */}
              <div className="flex justify-center items-center">
                <Image
                  src="/images/mcams-removebg-preview.png"
                  alt="Mobile App Mockup"
                  width={350}
                  height={700}
                  className="rounded-lg transform rotate-3"
                />
              </div>

              {/* Text and Details Section */}
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                {/* Logo and Title */}
                <div className="flex items-center justify-center lg:justify-start mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={113}
                  height={40}
                  viewBox="0 0 153 138"
                  fill="none"
                  className="mr-4"
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
                  <h1 className="text-4xl font-bold text-[#3B3A73]">{servicesId}</h1>
                </div>

                {/* Tagline */}
                <h2 className="text-2xl font-bold mb-6">Convenience at your fingertips</h2>

                {/* Features List */}
                <ul className="text-lg space-y-3 mb-6">
                  <li>✔ Immediate fund transfers</li>
                  <li>✔ Transfer funds using mobile number</li>
                  <li>✔ Pay utility bills</li>
                  <li>✔ Recharge your phones</li>
                  <li>✔ And many more...</li>
                </ul>

                {/* App Store and Play Store Buttons */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                  <a
                    href="https://play.google.com/store/apps/details?id=mcmsrseb.rsebl.org.mcms_rseb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-transform transform hover:scale-105"
                  >
                    <Image
                      src="/images/apl.png"
                      alt="App Store Badge"
                      width={150}
                      height={50}
                    />
                  </a>
                  <a
                    href="https://apps.apple.com/us/app/mcams/id1457797916"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-transform transform hover:scale-105"
                  >
                    <Image
                      src="/images/gpl.png"
                      alt="Google Play Badge"
                      width={150}
                      height={50}
                    />
                  </a>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {/* Register Section */}
              <div className="rounded-xl h-auto border bg-card text-card-foreground shadow p-4">
                <h2 className="py-4 text-xl font-medium text-center">Register For mCaMs</h2>
                <label className="text-sm font-medium">CID</label>
                <input
                  className="flex h-10 w-full rounded-md border bg-background px-3 py-2 mt-2 mb-4"
                  placeholder="Enter your CID number"
                  type="number"
                  required
                />
                <label className="text-sm font-medium">Brokerage Firm</label>
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base text-muted-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm mt-2"
                  aria-describedby="firms-description"
                  aria-invalid="false"
                  name="firms"
                  required
                  >
                  <option value="" selected>
                    Select Brokerage Firm
                  </option>
                  <option value="firm1">Firm 1</option>
                  <option value="firm2">Firm 2</option>
                  <option value="firm3">Firm 3</option>
                  <option value="firm4">Firm 4</option>
                </select>
                <div className="flex justify-center">
                  <button className="bg-primary text-white hover:bg-primary/90 px-4 py-2 rounded-md mt-4">
                    Submit
                  </button>
                </div>
              </div>

              {/* Renew Section */}
              <div className="rounded-xl h-auto border bg-card text-card-foreground shadow p-4">
                <h2 className="py-4 text-xl font-medium text-center">Renew my mCaMs account</h2>
                <label className="text-sm font-medium">Username</label>
                <input
                  className="flex h-10 w-full rounded-md border bg-background px-3 py-2 mt-2 mb-4"
                  placeholder="Enter your username"
                  type="text"
                />
                <div className="flex justify-center">
                  <button className="bg-primary text-white hover:bg-primary/90 px-4 py-2 rounded-md">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </>
        );

      case "OnlineShareStmt":
        return (
          <div className="flex flex-col items-center justify-center p-6 md:p-8 rounded-xl border bg-card text-card-foreground shadow max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold text-[#3B3A73] text-center">Online Share Statement</h1>
            <p className="text-lg mt-4 text-center">
              View your share statements online with ease and manage your portfolio effortlessly.
            </p>
            <Image
              src="/images/online-share.png"
              alt="Online Share Statement"
              width={400}
              height={300}
              className="mt-6 rounded-lg"
            />
          </div>
        );

      default:
        return (
          <div className="text-center p-8">
            <h1 className="text-4xl font-bold">Service Not Found</h1>
            <p className="mt-4">The requested service ID is not available.</p>
          </div>
        );
    }
  };

  return renderContent();
};

export default ServicesIdPage;
