'use client';
import React, { useState, useEffect } from "react";
import NewsCard from "@/components/ui/news-card";
import Modal from "@/components/ui/modal";
import { Button } from "@/components/ui/button"; // Assuming you have a Button component
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

const ITEMS_PER_PAGE = 6; // Number of articles per page

const NewsPage: React.FC = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState<{
    title: string;
    description: string;
    imageUrl?: string;
    pdfUrl?: string;
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingNews, setLoadingNews] = useState(true);
  const [loadingAnnouncements, setLoadingAnnouncements] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); 

  const fetchNews = async () => {
    try {
      setLoadingNews(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/fetch-time-line-new`);
      const data = await response.json();
      const formattedNews = data.map((item: any) => ({
        title: item.title,
        description: item.content
        .replace(/<\/?[^>]+(>|$)/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/\s+/g, ' ')
        .trim(),
        date: new Date(item.year).toDateString(),
        imageUrl: `${process.env.NEXT_PUBLIC_BASE_URL}${item.file_path}`,
        pdfUrl: null,
      }));
      setNewsArticles(formattedNews);
    } catch (error) {
      console.error("Failed to fetch news:", error);
    } finally {
      setLoadingNews(false);
    }
  };

  const fetchAnnouncements = async () => {
    try {
      setLoadingAnnouncements(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/fetch-news`);
      const data = await response.json();
      const formattedAnnouncements = data.map((item: any) => ({
        title: item.title,
        description: item.announcement
        .replace(/<\/?[^>]+(>|$)/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/\s+/g, ' ')
        .trim(),
        date: new Date(item.created_at).toDateString(),
        imageUrl: null, // Announcements don't seem to have images
        pdfUrl: `${process.env.NEXT_PUBLIC_BASE_URL}${item.file_path}`,
      }));
      setAnnouncements(formattedAnnouncements);
    } catch (error) {
      console.error("Failed to fetch announcements:", error);
    } finally {
      setLoadingAnnouncements(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };
  const filterArticles = (articles: any[]) => {
    return articles.filter((article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  useEffect(() => {
    fetchNews();
    fetchAnnouncements();
  }, []);

  const totalPages = (data: any[]) => Math.ceil(filterArticles(data).length / ITEMS_PER_PAGE);

  const paginatedArticles = (data: typeof newsArticles) =>
    filterArticles(data).slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

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

  const handleNext = (data: typeof newsArticles) => {
    if (currentPage < totalPages(data)) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Tabs */}
      <Tabs defaultValue="news" className="w-full">
        <div className="flex justify-between items-center">
        <TabsList>
          <TabsTrigger value="news" onClick={() => setCurrentPage(1)}>
            News
          </TabsTrigger>
          <TabsTrigger value="announcements" onClick={() => setCurrentPage(1)}>
            Announcements
          </TabsTrigger>
        </TabsList>
        <Input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-64 border border-gray-300 p-2 rounded-md"
          />
          </div>

        {/* News Tab */}
        <TabsContent value="news">
          {loadingNews ? (
            <div>Loading news...</div>
          ) : (
            <>
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
                <Button onClick={handlePrevious} disabled={currentPage === 1} variant="outline" size="sm">
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
            </>
          )}
        </TabsContent>

        {/* Announcements Tab */}
        <TabsContent value="announcements">
          {loadingAnnouncements ? (
            <div>Loading announcements...</div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedArticles(announcements).map((article, index) => (
                  <NewsCard
                    key={index}
                    title={article.title}
                    description={article.description}
                    date={article.date}
                    pdfUrl={article.pdfUrl}
                    imageUrl={"/images/defaultbg.png"}
                    onMore={() => openModal(article)}
                  />
                ))}
              </div>
              <div className="flex items-center justify-end space-x-4 mt-4">
                <span className="text-sm font-medium">
                  Page {currentPage} of {totalPages(announcements)}
                </span>
                <Button onClick={handlePrevious} disabled={currentPage === 1} variant="outline" size="sm">
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
            </>
          )}
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
