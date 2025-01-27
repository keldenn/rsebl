"use client";
import { FiFileText, FiBriefcase, FiBarChart2, FiTrendingUp } from "react-icons/fi";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const StatsSection = () => {
  const [data, setData] = useState({
    brokerageFirms: "-",
    bsiIndex: "-",
    bsiChange: "-",
    marketCap: "-",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [brokerageRes, bsiRes, marketCapRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/fetch-brokerage-count`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/fetch-BSI`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/fetch-market-capitalization`),
        ]);

        const brokerageCount = await brokerageRes.json();
        const bsiData = await bsiRes.json();
        const marketCapValue = await marketCapRes.json();

        setData({
          brokerageFirms: brokerageCount,
          bsiIndex: bsiData[0].index,
          bsiChange: bsiData[0].ptChange,
          marketCap: formatNumber(marketCapValue),
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const formatNumber = (num) => {
    const number = Number(num.replace(/,/g, ""));
    if (number >= 1e12) return `${(number / 1e12).toFixed(1)} Trillion`;
    if (number >= 1e9) return `${(number / 1e9).toFixed(1)} Billion`;
    if (number >= 1e6) return `${(number / 1e6).toFixed(1)} Million`;
    return number.toLocaleString();
  };

  return (
    <section className="">
      <div className="mx-auto text-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/listedscripts">
            <motion.div whileHover={{ scale: 1, rotate: 2 }} whileTap={{ scale: 0.95 }} className="p-6 rounded-xl border bg-card dark:bg-dark-card text-card-foreground dark:text-dark-card-foreground flex flex-col items-center transition group hover:bg-gradient-to-br hover:from-[#9D70FF] hover:to-[#25295F] hover:text-white">
              <FiFileText className="w-12 h-12 text-custom-1 mb-4 group-hover:text-white transition-colors" />
              <p className="text-4xl font-extrabold text-gray-800 dark:text-white group-hover:text-white transition-colors">18</p>
              <motion.div className="w-16 h-1 bg-custom-1 group-hover:bg-white mt-2 mb-4" animate={{ width: ["0%", "100%"], transition: { duration: 0.4 } }}></motion.div>
              <h3 className="text-lg font-medium text-gray-700 dark:text-white group-hover:text-white transition-colors">Listed Scripts</h3>
            </motion.div>
          </Link>

          <Link href="/brokeragefirms">
            <motion.div whileHover={{ scale: 1, rotate: 2 }} whileTap={{ scale: 0.95 }} className="p-6 rounded-xl border bg-card dark:bg-dark-card text-card-foreground dark:text-dark-card-foreground flex flex-col items-center transition group hover:bg-gradient-to-br hover:from-[#9D70FF] hover:to-[#25295F] hover:text-white">
              <FiBriefcase className="w-12 h-12 text-custom-1 mb-4 group-hover:text-white transition-colors" />
              <p className="text-4xl font-extrabold text-gray-800 dark:text-white group-hover:text-white transition-colors">{data.brokerageFirms}</p>
              <motion.div className="w-16 h-1 bg-custom-1 group-hover:bg-white mt-2 mb-4" animate={{ width: ["0%", "100%"], transition: { duration: 0.4 } }}></motion.div>
              <h3 className="text-lg font-medium text-gray-700 dark:text-white group-hover:text-white transition-colors">Brokerage Firms</h3>
            </motion.div>
          </Link>

          <Link href="/bsi">
            <motion.div whileHover={{ scale: 1, rotate: 2 }} whileTap={{ scale: 0.95 }} className="p-6 rounded-xl border bg-card dark:bg-dark-card text-card-foreground dark:text-dark-card-foreground flex flex-col items-center transition group hover:bg-gradient-to-br hover:from-[#9D70FF] hover:to-[#25295F] hover:text-white">
              <FiBarChart2 className="w-12 h-12 text-custom-1 mb-4 group-hover:text-white transition-colors" />
              <p className="text-4xl font-extrabold text-gray-800 dark:text-white group-hover:text-white transition-colors">{data.bsiIndex}</p>
              <motion.div className="w-16 h-1 bg-custom-1 group-hover:bg-white mt-2 mb-4" animate={{ width: ["0%", "100%"], transition: { duration: 0.4 } }}></motion.div>
              <h3 className="text-lg font-medium text-gray-700 dark:text-white group-hover:text-white transition-colors">BSI Index</h3>
            </motion.div>
          </Link>

          <Link href="/marketcap">
            <motion.div whileHover={{ scale: 1, rotate: 2 }} whileTap={{ scale: 0.95 }} className="p-6 rounded-xl border bg-card dark:bg-dark-card text-card-foreground dark:text-dark-card-foreground flex flex-col items-center transition group hover:bg-gradient-to-br hover:from-[#9D70FF] hover:to-[#25295F] hover:text-white">
              <FiTrendingUp className="w-12 h-12 text-custom-1 mb-4 group-hover:text-white transition-colors" />
              <p className="text-4xl font-extrabold text-gray-800 dark:text-white group-hover:text-white transition-colors">{data.marketCap}</p>
              <motion.div className="w-16 h-1 bg-custom-1 group-hover:bg-white mt-2 mb-4" animate={{ width: ["0%", "100%"], transition: { duration: 0.4 } }}></motion.div>
              <h3 className="text-lg font-medium text-gray-700 dark:text-white group-hover:text-white transition-colors">Market Cap</h3>
            </motion.div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
