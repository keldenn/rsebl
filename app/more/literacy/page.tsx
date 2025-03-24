"use client"

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VideoGrid = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from the API
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        let allVideos = [];
        let currentPage = 1;
        let lastPage = 1;

        do {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/fetch-literacy?page=${currentPage}`);
          const { data, last_page } = response.data;
          allVideos = [...allVideos, ...data];
          lastPage = last_page;
          currentPage += 1;
        } while (currentPage <= lastPage);

        setVideos(allVideos);
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) {
    return <div className="text-center my-5"></div>;
  }

  return (
<div className="container mx-auto my-5 px-4">

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {videos.map((video, index) => (
          <div
            key={video.id}
            className={`embed-responsive rounded shadow-lg overflow-hidden ${
              index === 0 ? 'sm:col-span-2 sm:row-span-2' : ''
            }`}            
          >
            <iframe
              src={video.link}
              title={video.topic}
              className="w-full aspect-video"

              allowFullScreen
            ></iframe>
            <div className="bg-gray-100 p-2">
              <h5 className="text-center font-semibold">{video.topic}</h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoGrid;
