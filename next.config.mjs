/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["nextui.org", "rsebl.org.bt"], // Add allowed external image domains here
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" }, // Allow all origins
          { key: "Access-Control-Allow-Methods", value: "GET, POST, PUT, DELETE, OPTIONS" }, // Allowed HTTP methods
          { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization" }, // Allowed headers
        ],
      },
    ];
  },
};

export default nextConfig;
