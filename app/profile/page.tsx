'use client'
import Head from 'next/head';
import { motion } from 'framer-motion';

export default function CompanyProflie() {
  const sections = [
    {
      id: 'membership',
      title: 'Membership',
      content: `The unique features of this Exchange is its members or brokerage firms are its shareholders. The exchange is owned by four brokerage firms which are established as a company under the Companies Act and licensed under the Financial Institutions Act (FIA).`,
    },
    {
      id: 'mission',
      title: 'Mission',
      content: `To develop and establish a fair, orderly and transparent securities market with the objective to facilitate efficient mobilization and allocation of capital and ensure apt regulation to maintain market integrity and investor confidence.`,
    },
    {
      id: 'vision',
      title: 'Vision',
      content: `To become an integral part of the financial system and participate in the nation building.`,
    },
    {
      id: 'clearing',
      title: 'Clearing and Settlement',
      content: `The RSEB Clearing and Settlement House (CSH) was established as a division of RSEB in March 2012 and licensed as per the Savings and Transitional (Schedule 1 subsection 5) of Financial Services Act, 2011. It guarantees settlement for all members, acts as a legal counterpart to all trades, and controls risks associated with settlement of transactions.`,
    },
    {
      id: 'trading',
      title: 'Trading',
      content: `The Trading and IT Division was established in 1993 to provide a platform for buyers and sellers to transact securities. It ensures smooth operation of the trading engine and auxiliary components, linking major players like Investment Banks, Stockbrokers, and Mutual Funds.`,
    },
    {
      id: 'depository',
      title: 'Depository',
      content: `The Central Depository (CD) was established as a division of the Exchange in 1993, functioning as a bank for securities. CD maintains digital records of share ownership and ensures proper handling of equity and debt instruments.`,
    },
    {
      id: 'listing',
      title: 'Listing',
      content: `The Listing Division was established in 1993 to list new companies based on listing norms. It ensures compliance, disseminates timely information, and protects investor interests by maintaining transparency in the capital market.`,
    },
    {
      id: 'history',
      title: 'History',
      content: `The Royal Securities Exchange of Bhutan (RSEB) was established in 1993 to encourage share ownership, mobilize savings, and provide a platform for equity capital. Over the years, it has grown significantly in listed companies and market capitalization.`,
    },
  ];

  const boardMembers = [
    { name: 'John Doe', position: 'Chairperson', image: '/images/john.jpg' },
    { name: 'Jane Smith', position: 'Board Member', image: '/images/jane.jpg' },
    { name: 'Alice Brown', position: 'Board Member', image: '/images/alice.jpg' },
    { name: 'Bob Johnson', position: 'Board Member', image: '/images/bob.jpg' },
  ];

  return (
    <div className="bg-gray-50">


      <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold">Royal Securities Exchange of Bhutan</h1>
          <p className="mt-2 text-lg">Building a Transparent and Fair Securities Market</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 space-y-16">
        {sections.map((section, index) => (
          <motion.section
            key={section.id}
            id={section.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="p-6 bg-white shadow-md rounded-lg"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">{section.title}</h2>
            <p className="text-gray-600">{section.content}</p>
          </motion.section>
        ))}

        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: sections.length * 0.2 }}
          className="p-6 bg-white shadow-md rounded-lg"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Board Members</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {boardMembers.map((member, index) => (
              <div
                key={index}
                className="bg-gray-100 shadow-lg rounded-lg overflow-hidden text-center transition-transform transform hover:scale-105"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">{member.name}</h3>
                  <p className="text-gray-600">{member.position}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      </main>

    </div>
  );
}
