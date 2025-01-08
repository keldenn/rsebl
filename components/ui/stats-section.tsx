"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const StatsSection = () => {
  return (
    <section className="">
      <div className="mx-auto text-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Listed Scripts */}
          <Link href="/listedscripts">
            <motion.div
              whileHover={{
                scale: 1,
                rotate: 2,
              }}
              whileTap={{ scale: 0.95 }}
              className="p-6 rounded-xl border bg-card dark:bg-dark-card text-card-foreground dark:text-dark-card-foreground flex flex-col items-center transition group hover:bg-gradient-to-br hover:from-[#9D70FF] hover:to-[#25295F]
 hover:text-white"
            >
              <svg
                className="w-12 h-12 text-indigo-600 mb-4 group-hover:text-white transition-colors"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m-6-8h6M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
              <p className="text-4xl font-extrabold text-gray-800 dark:text-white group-hover:text-white transition-colors">
                10+
              </p>
              <motion.div
                className="w-16 h-1 bg-indigo-600 group-hover:bg-white mt-2 mb-4"
                animate={{ width: ["0%", "100%"], transition: { duration: 0.4 } }}
              ></motion.div>
              <h3 className="text-lg font-medium text-gray-700 dark:text-white group-hover:text-white transition-colors">
                Listed Scripts
              </h3>
            </motion.div>
          </Link>

          {/* Brokerage Firms */}
          <Link href="/brokeragefirms">
            <motion.div
              whileHover={{
                scale: 1,
                rotate: 2,
              }}
              whileTap={{ scale: 0.95 }}
              className="p-6 rounded-xl border bg-card dark:bg-dark-card text-card-foreground dark:text-dark-card-foreground flex flex-col items-center transition group hover:bg-gradient-to-br hover:from-[#9D70FF] hover:to-[#25295F]
 hover:text-white"
            >
              <svg
                className="w-12 h-12 text-indigo-600 mb-4 group-hover:text-white transition-colors"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 17v-2a4 4 0 01.88-2.51L12 10l2.12 2.49A4 4 0 0115 15v2m0 0h3m-3 0H9m0 0H6"
                />
              </svg>
              <p className="text-4xl font-extrabold text-gray-800 dark:text-white group-hover:text-white transition-colors">
                5+
              </p>
              <motion.div
                className="w-16 h-1 bg-indigo-600 group-hover:bg-white mt-2 mb-4"
                animate={{ width: ["0%", "100%"], transition: { duration: 0.4 } }}
              ></motion.div>
              <h3 className="text-lg font-medium text-gray-700 dark:text-white group-hover:text-white transition-colors">
                Brokerage Firms
              </h3>
            </motion.div>
          </Link>

          {/* BSI Index */}
          <Link href="/bsi">
            <motion.div
              whileHover={{
                scale: 1,
                rotate: 2,
              }}
              whileTap={{ scale: 0.95 }}
              className="p-6 rounded-xl border bg-card dark:bg-dark-card text-card-foreground dark:text-dark-card-foreground flex flex-col items-center transition group hover:bg-gradient-to-br hover:from-[#9D70FF] hover:to-[#25295F]
 hover:text-white"
            >
              <svg
                className="w-12 h-12 text-indigo-600 mb-4 group-hover:text-white transition-colors"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h11M9 21V3M9 3L4 8m5-5l5 5"
                />
              </svg>
              <p className="text-4xl font-extrabold text-gray-800 dark:text-white group-hover:text-white transition-colors">
                250B+
              </p>
              <motion.div
                className="w-16 h-1 bg-indigo-600 group-hover:bg-white mt-2 mb-4"
                animate={{ width: ["0%", "100%"], transition: { duration: 0.4 } }}
              ></motion.div>
              <h3 className="text-lg font-medium text-gray-700 dark:text-white group-hover:text-white transition-colors">
                BSI Index
              </h3>
            </motion.div>
          </Link>

          {/* Market Cap */}
          <Link href="/marketcap">
            <motion.div
              whileHover={{
                scale: 1,
                rotate: 2,
              }}
              whileTap={{ scale: 0.95 }}
              className="p-6 rounded-xl border bg-card dark:bg-dark-card text-card-foreground dark:text-dark-card-foreground flex flex-col items-center transition group hover:bg-gradient-to-br hover:from-[#9D70FF] hover:to-[#25295F]
 hover:text-white"
            >
              <svg
                className="w-12 h-12 text-indigo-600 mb-4 group-hover:text-white transition-colors"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 18a2 2 0 012-2h14a2 2 0 012 2v2H3v-2zm0-5a2 2 0 012-2h14a2 2 0 012 2v2H3v-2zm0-5a2 2 0 012-2h14a2 2 0 012 2v2H3V8z"
                />
              </svg>
              <p className="text-4xl font-extrabold text-gray-800 dark:text-white group-hover:text-white transition-colors">
                $1.2T+
              </p>
              <motion.div
                className="w-16 h-1 bg-indigo-600 group-hover:bg-white mt-2 mb-4"
                animate={{ width: ["0%", "100%"], transition: { duration: 0.4 } }}
              ></motion.div>
              <h3 className="text-lg font-medium text-gray-700 dark:text-white group-hover:text-white transition-colors">
                Market Cap
              </h3>
            </motion.div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
