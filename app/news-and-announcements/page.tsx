'use client';
import React, { useState } from "react";
import NewsCard from "@/components/ui/news-card";
import Modal from "@/components/ui/modal";
import { Button } from "@/components/ui/button"; // Assuming you have a Button component
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const articles = [
  {
    title: "Selected Candidates for IT Officer Post",
    description:
      "RSEB is pleased to announce the results for the post of IT Officer following the practical test held on 22nd November 2024. The selected candidates are requested to report to the RSEB office on 2nd December 2024 at 9:00 AM. Kindly refer to the attached document for the list of selected candidates.",
    date: "Jan 7, 2025",
    pdfUrl: "/files/morning-brief.pdf",
    imageUrl: "/images/defaultbg.png",
  },
  {
    title: "ACMI Launch",
    description:
      "RSEB with DAMC under the Ministry of Agriculture and Forests successfully launched ACMI(Agricultural Commodity Market Initiative) which is an online marketplace for farmers, producers, traders, and consumers who can buy and sell agriculture, livestock and Non-wood Forest Products. The MoU was signed by CEO of RSEB and Dasho Secretary of MoAF.",
    date: "Jan 7, 2025",
    imageUrl:
      "https://rsebl.org.bt/agm/storage/timeline/nndHtH0cBoh6rMuj511dDJkYxdq55baFOzL0bR7o.jpg",
  },
  {
    title: "BPCL issues Commercial Paper",
    description:
      "Bhutan Polymers Company Ltd. issues commercial paper worth Nu. 45 million from 10th December 2024 to 12th December 2024. The maturity period of the commercial paper is 180 days and the discount rate is 6%. Enclosed here with the offer document for your kind information.",
    date: "Jan 7, 2025",
    pdfUrl: "/files/morning-brief.pdf",
    imageUrl: "/images/defaultbg.png",
  },
  {
    title: "MoU Signing of Bhutan Commodity Exchange Initiative",
    description:
      "The Memorandum of Understanding was signed between the Department of Agricultural Marketing and Cooperatives, Ministry of Agriculture & Livestock, the Food Corporation of Bhutan and Royal Securities Exchange of Bhutan on the development of the Bhutan Commodity Exchange Initiative (BCEI).",
    date: "Jan 7, 2025",
    imageUrl:
      "https://rsebl.org.bt/agm/storage/timeline/1zLs33Wxo3qKecmHmCUJvmDdZMmn2DsCnpSGsNhe.jpg",
  },
];

const ITEMS_PER_PAGE = 6; // Number of articles per page

const NewsPage: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<{
    title: string;
    description: string;
    imageUrl?: string;
    pdfUrl?: string;
  } | null>(null);

  const [currentPage, setCurrentPage] = useState(1);

  const newsArticles = articles.filter((article) => !article.pdfUrl);
  const announcements = articles.filter((article) => article.pdfUrl);

  const totalPages = (data: typeof articles) => Math.ceil(data.length / ITEMS_PER_PAGE);

  const paginatedArticles = (data: typeof articles) =>
    data.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

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

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = (data: typeof articles) => {
    if (currentPage < totalPages(data)) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Tabs */}
      <Tabs defaultValue="news" >
        <TabsList  className="">
          <TabsTrigger value="news" onClick={() => setCurrentPage(1)}>
            News
          </TabsTrigger>
          <TabsTrigger value="announcements" onClick={() => setCurrentPage(1)}>
            Announcements
          </TabsTrigger>
        </TabsList>

        {/* News Tab */}
        <TabsContent value="news">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedArticles(newsArticles).map((article, index) => (
              <NewsCard
                key={index}
                title={article.title}
                description={article.description}
                date={article.date}
                imageUrl={article.imageUrl}
                onMore={() => openModal(article)}
              />
            ))}
          </div>
          <div className="flex items-center justify-end space-x-4 mt-4">
          <span className="text-sm font-medium">
              Page {currentPage} of {totalPages(newsArticles)}
            </span>
            <Button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              variant="outline"
              size="sm"
            >
              Previous
            </Button>
           
            <Button
              onClick={() => handleNext(newsArticles)}
              disabled={currentPage === totalPages(newsArticles) || totalPages(newsArticles) === 0}
              variant="outline"
              size="sm"
            >
              Next
            </Button>
          </div>
        </TabsContent>

        {/* Announcements Tab */}
        <TabsContent value="announcements">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedArticles(announcements).map((article, index) => (
              <NewsCard
                key={index}
                title={article.title}
                description={article.description}
                date={article.date}
                imageUrl={article.imageUrl}
                pdfUrl={article.pdfUrl}
                onMore={() => openModal(article)}
              />
            ))}
          </div>
          <div className="flex items-center justify-end space-x-4 mt-4">
          <span className="text-sm font-medium">
              Page {currentPage} of {totalPages(announcements)}
            </span>
            <Button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              variant="outline"
              size="sm"
            >
              Previous
            </Button>
            
            <Button
              onClick={() => handleNext(announcements)}
              disabled={currentPage === totalPages(announcements) || totalPages(announcements) === 0}
              variant="outline"
              size="sm"
            >
              Next
            </Button>
          </div>
        </TabsContent>
      </Tabs>

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

export default NewsPage;
