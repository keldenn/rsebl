import React from 'react';

const VideoGrid = () => {
  const videos = [
    { id: 1, title: 'eLearning Episode 1', url: 'https://www.youtube.com/embed/8h365NhhcOs' },
    { id: 2, title: 'eLearning Episode 2', url: 'https://www.youtube.com/embed/yQmKjTtLXxg' },
    { id: 3, title: 'eLearning Episode 3', url: 'https://www.youtube.com/embed/8nnHVIR-Vrg' },
    { id: 4, title: 'eLearning Episode 4', url: 'https://www.youtube.com/embed/0AUO3nA07dI' },
    { id: 5, title: 'eLearning Episode 5', url: 'https://www.youtube.com/embed/UCtqWt8-VBg' },
    { id: 6, title: 'eLearning Episode 6', url: 'https://www.youtube.com/embed/E7rIza0fF04' },
    { id: 7, title: 'eLearning Episode 7', url: 'https://www.youtube.com/embed/CDZruD5a_Wg' },
    { id: 8, title: 'eLearning Episode 8', url: 'https://www.youtube.com/embed/6BGGOviySnE' },
    { id: 9, title: 'eLearning Episode 9', url: 'https://www.youtube.com/embed/KeZ4S0w1vbk' },
  ];

  return (
    <div className="container mx-auto my-5">
      <div className="grid grid-cols-3 gap-4">
        {videos.map((video, index) => (
          <div
            key={video.id}
            className={`embed-responsive rounded shadow-lg overflow-hidden ${
              index === 0 ? 'row-span-2 col-span-2' : ''
            }`}
          >
            <iframe
              src={video.url}
              title={video.title}
              className="w-full h-full"
              allowFullScreen
            ></iframe>
            <div className="bg-gray-100 p-2">
              <h5 className="text-center font-semibold">{video.title}</h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoGrid;
