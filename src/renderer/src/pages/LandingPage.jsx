/* eslint-disable prettier/prettier */
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import {Image} from "@heroui/image";
const LandingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchQuery = location.state?.searchQuery || "No search query";
  const searchResults = location.state?.searchResults || [];

  useEffect(() => {
    console.log('Location state:', location.state);
    console.log('Search results:', searchResults);
  }, [location.state, searchResults]);

  // Format the results and normalize file paths
  const formattedResults = searchResults.map((filePath, index) => {
    // Ensure proper path format for Electron
    const normalizedPath = filePath
    return {
      id: index + 1,
      src: normalizedPath,
      alt: `Image result ${index + 1}`,
      filename: normalizedPath.split('/').pop()
    };
  });

  const handleImageClick = async (imagePath) => {
    try {
      // Remove file:// protocol and normalize path
      const cleanPath = imagePath.replace('file://', '');
      await window.electron.ipcRenderer.invoke('open-file', cleanPath);
    } catch (error) {
      console.error('Failed to open image:', error);
    }
  };

  return (
    <div className="relative h-screen flex flex-col">
      {/* Search Bar at Top */}
      <div className="p-6 bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto">
          <SearchBar />
        </div>
      </div>

        <div className="p-6">
          <h1 className="text-3xl font-bold text-white">Search Results</h1>
          <p className="text-gray-400">Results for: "{searchQuery}"</p>
        </div>

        <div className="flex-1 overflow-y-auto p-6 pt-0">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
            {formattedResults.map((image) => (
              <div
                key={image.id}
                onClick={() => handleImageClick(image.src)}
                className="bg-gray-800 rounded-lg overflow-hidden hover:opacity-75 transition-opacity cursor-pointer w-full max-w-sm"
              >
            <div className="relative aspect-square">
              <Image
                src={`file:///${image.src.replace(/\\/g, '/')}`}
                alt={image.alt}
                width={300}
                className="w-full h-full object-cover rounded-t-lg"
              />
              <div className="absolute inset-0 bg-gray-700 animate-pulse" style={{display: 'none'}} />
            </div>
            <div className="p-3">
              <p className="text-gray-300 text-sm truncate" title={image.filename}>
            {image.filename}
              </p>
            </div>
          </div>
            ))}
          </div>
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
// LandingPage component
export default LandingPage;
