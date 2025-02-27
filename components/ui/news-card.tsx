'use client'
import React from "react";
import { Button } from "./button";

interface NewsCardProps {
    title: string;
    description: string;
    date: string;
    imageUrl?: string;
    pdfUrl?: string;
    onMore: () => void; // New prop
  }
  
  const NewsCard: React.FC<NewsCardProps> = ({
    title,
    description,
    date,
    imageUrl,
    pdfUrl,
    onMore,
  }) => {
    const titleLimit = 36;
    const descriptionLimit = 43;
  
    const truncateText = (text: string, limit: number) =>
      text.length > limit ? text.substring(0, limit) + "..." : text;
  
    return (
      <div className="relative p-4 rounded-xl border bg-card text-card-foreground shadow flex flex-col justify-between">
        <div className="relative ">
          <h3 className="text-lg font-semibold mb-2">
            {truncateText(title, titleLimit)}
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            {truncateText(description, descriptionLimit)}
            {description.length > descriptionLimit && (
              <span
                className="text-custom-1 cursor-pointer"
                onClick={onMore} // Trigger modal on click
              >
                more
              </span>
            )}
          </p>
          {imageUrl && (
            <img
              src={imageUrl}
              alt={title}
              className="w-full object-cover h-60 rounded-lg mb-12"
            />
          )}
        </div>
        {pdfUrl ? (
          <Button
            variant="outline"
            size="sm"
            className="absolute bottom-4 right-4"
          >
            <a href={pdfUrl} download>
              Download PDF
            </a>
          </Button>
        ) : (
          <Button
            variant="outline"
            size="sm"
            className="absolute bottom-4 right-4 z-10"
            disabled
          >
            <a href={pdfUrl} download>
              Download PDF
            </a>
          </Button>
        )}
        <p className="absolute bottom-6 left-4 text-xs text-gray-600 z-10">
          {date}
        </p>
      </div>
    );
  };
  
  export default NewsCard;