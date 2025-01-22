"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Page() {
  const [timelineData, setTimelineData] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTimelineData = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://rsebl.org.bt/agm/api/fetch-time-line-new");
      const data = await response.json();
      const formattedData = data.map((item: any) => ({
        date: item.year,
        title: item.title,
        description: item.content.replace(/<[^>]+>/g, ""), // Strip HTML tags
        image: `https://rsebl.org.bt/agm/storage/${item.file_path}`,
      }));
      setTimelineData(formattedData);
    } catch (err) {
      setError("Failed to fetch timeline data.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTimelineData();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <>
      <div className="relative container xl:p-5">
        <div className="absolute md:left-1/2 left-4 transform md:-translate-x-1/2 translate-x-0 w-1 bg-gray-300 h-full"></div>
        <div className="timeline-container space-y-12">
          {timelineData.slice(0, visibleCount).map((item, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row ${
                index % 2 === 0 ? "" : "md:flex-row-reverse"
              } relative`}
            >
              <div className="md:w-1/2 p-4 md:m-12">
                <h2 className="py-4 text-xl font-medium">
                  {item.date} {item.title}
                </h2>
                <p className="mt-2">{item.description}</p>
              </div>
              <div className="md:w-1/2 p-4 md:m-12">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute left md:left-1/2 md:mt-[82px] mt-[32px] transform md:-translate-x-1/2 translate-x-[-26px] bg-custom-1 w-6 h-6 rounded-full border-4 border-white"></div>
            </div>
          ))}
        </div>
      </div>

      {visibleCount < timelineData.length && (
        <div className="text-center mt-5">
          <Button
            variant="outline"
            size="sm"
            className="my-5"
            onClick={handleLoadMore}
          >
            Load More
          </Button>
        </div>
      )}
    </>
  );
}
