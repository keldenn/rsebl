'use client'
import React from "react";
import NewsCard from "./news-card";
import Modal from "./modal";
import { useState } from "react";
const newsArticles = [
  {
    title: "Selected Candidates for IT Officer Post",
    description: "RSEB is pleased to announce the results for the post of IT Officer following the practical test held on 22nd November 2024. The selected candidates are requested to report to the RSEB office on 2nd December 2024 at 9:00 AM. Kindly refer to the attached document for the list of selected candidates.",
    date: "Jan 7, 2025",
    pdfUrl: "/files/morning-brief.pdf", // Example PDF URL
    imageUrl: "/images/defaultbg.png", // Example image URL
  },
  {
    title: "ACMI Launch",
    description: "RSEB with DAMC under the Ministry of Agriculture and Forests successfully launched ACMI(Agricultural Commodity Market Initiative) which is an online marketplace for farmers, producers, traders, and consumers who can buy and sell agriculture, livestock and Non-wood Forest Products. The MoU was signed by CEO of RSEB and Dasho Secretary of MoAF.",
    date: "Jan 7, 2025",
    imageUrl: "https://rsebl.org.bt/agm/storage/timeline/nndHtH0cBoh6rMuj511dDJkYxdq55baFOzL0bR7o.jpg", // Example image URL
  },
  {
    title: "MoU Signing of Bhutan Commodity Exchange Initiative",
    description: "The Memorandum of Understanding was signed between the Department of Agricultural Marketing and Cooperatives, Ministry of Agriculture & Livestock, the Food Corporation of Bhutan and Royal Securities Exchange of Bhutan on the development of the Bhutan Commodity Exchange Initiative (BCEI).",
    date: "Jan 7, 2025",
    imageUrl: "https://rsebl.org.bt/agm/storage/timeline/1zLs33Wxo3qKecmHmCUJvmDdZMmn2DsCnpSGsNhe.jpg", // Example image URL
  },
];
const NewsSection: React.FC = () => {
    const [selectedArticle, setSelectedArticle] = useState<{
      title: string;
      description: string;
      imageUrl?: string;
      pdfUrl?: string;
    } | null>(null);
  
    const openModal = (article: {
      title: string;
      description: string;
      imageUrl?: string;
      pdfUrl?: string;
    }) => {
      setSelectedArticle(article);
    };
  
    const closeModal = () => {
      setSelectedArticle(null);
    };
  
    return (
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsArticles.map((article, index) => (
            <NewsCard
              key={index}
              title={article.title}
              description={article.description}
              date={article.date}
              imageUrl={article.imageUrl}
              pdfUrl={article.pdfUrl}
              onMore={() => openModal(article)} // Pass article details to modal
            />
          ))}
        </div>
  
        {/* Modal */}
        {selectedArticle && (
          <Modal
            isOpen={!!selectedArticle}
            onClose={closeModal}
            title={selectedArticle.title}
            description={selectedArticle.description}
            imageUrl={selectedArticle.imageUrl}
            pdfUrl={selectedArticle.pdfUrl}
          />
        )}
      </div>
    );
  };
  
  export default NewsSection;