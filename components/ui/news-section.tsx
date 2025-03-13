'use client';
import React, { useEffect, useState } from 'react';
import NewsCard from './news-card';
import Modal from './modal';

interface Article {
  id: number;
  title: string;
  description: string;
  date: string; // Ensure all articles have a valid date
  imageUrl?: string;
  pdfUrl?: string;
}

const NewsSection: React.FC = () => {
  const [newsArticles, setNewsArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchNewsData = async () => {
    try {
      // Fetch announcements (PDF-related data)
      const announcementsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/fetch-news`);
      const announcements = await announcementsResponse.json();

      const announcementsData = announcements.map((item: any) => ({
        id: item.id,
        title: item.title,
        description: item.announcement
        .replace(/<\/?[^>]+(>|$)/g, '') // Remove HTML tags
        .replace(/&nbsp;/g, ' ') // Replace &nbsp; with a space
        .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
        .trim(), // Remove leading/trailing spaces
        date: new Date(item.created_at).toDateString(),
        pdfUrl: `${process.env.NEXT_PUBLIC_BASE_URL}${item.file_path}`,
        imageUrl: '/images/defaultbg.png', // Fallback image
      }));

      // Fetch timeline (general news data)
      const timelineResponse = await fetch( `${process.env.NEXT_PUBLIC_API_URL}/fetch-time-line`);
      const timelineData = await timelineResponse.json();

      const timelineArticles = timelineData.data.map((item: any) => ({
        id: item.id,
        title: item.title,
        description: item.content
          .replace(/<\/?[^>]+(>|$)/g, '')
          .replace(/&nbsp;/g, ' ')
          .replace(/\s+/g, ' ') 
          .trim(),
          date: new Date(item.year).toDateString(),
        imageUrl: `${process.env.NEXT_PUBLIC_BASE_URL}${item.file_path}`,
      }));
      // Combine and sort by date (descending)
      const combinedData = [...announcementsData, ...timelineArticles];
      combinedData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      // Slice top 3 articles
      setNewsArticles(combinedData.slice(0, 3));
    } catch (error) {
      console.error('Error fetching news data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewsData();
  }, []);

  const openModal = (article: Article) => {
    setSelectedArticle(article);
  };

  const closeModal = () => {
    setSelectedArticle(null);
  };

  return (
    <div>
      {loading ? (
        <p>Loading news articles...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsArticles.map((article) => (
            <NewsCard
              key={article.id}
              title={article.title}
              description={article.description}
              date={article.date}
              imageUrl={article.imageUrl}
              pdfUrl={article.pdfUrl}
              onMore={() => openModal(article)}
            />
          ))}
        </div>
      )}

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
