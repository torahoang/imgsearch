import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SearchBar from '../components/SearchBar';

const LandingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchQuery = location.state?.searchQuery || "No search query";

  // Mock data for demonstration - replace with actual search results
  const searchResults = [
    { id: 1, src: 'path/to/image1.jpg', alt: 'Search result 1' },
    { id: 2, src: 'path/to/image2.jpg', alt: 'Search result 2' },
    { id: 3, src: 'path/to/image3.jpg', alt: 'Search result 3' },
    { id: 4, src: 'path/to/image4.jpg', alt: 'Search result 4' },
    { id: 5, src: 'path/to/image5.jpg', alt: 'Search result 5' },
    { id: 6, src: 'path/to/image6.jpg', alt: 'Search result 6' },
  ];

  return (
    <div className="relative h-screen flex flex-col">
      {/* Search Bar at Top */}
      <div className="p-6 bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto">
          <SearchBar />
        </div>
      </div>

      {/* Header with Search Query */}
      <div className="p-6">
        <h1 className="text-3xl font-bold text-white">Search Results</h1>
        <p className="text-gray-400">Results for: "{searchQuery}"</p>
      </div>

      {/* Scrollable Image Grid */}
      <div className="flex-1 overflow-y-auto p-6 pt-0">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {searchResults.map((image) => (
            <div
              key={image.id}
              className="bg-gray-800 rounded-lg overflow-hidden hover:opacity-75 transition-opacity cursor-pointer"
            >
              {/* Square Image placeholder */}
              <div className="relative aspect-square">
                <div className="absolute inset-0 bg-gray-700 animate-pulse"></div>
              </div>
              <div className="p-3">
                <p className="text-gray-300 text-sm">Image #{image.id}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Back button - Fixed at bottom */}
      <div className="p-6">
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-teal-500 rounded-full hover:bg-teal-600 transition-colors duration-200"
        >
          ⬅️ Back to Search
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
