import React from 'react';
import SearchBar from '../components/SearchBar';


const SearchPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 w-full">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          What image do you want to find?
        </h1>
        <div className="w-full bg-gray-800 rounded-lg p-4">
          <SearchBar />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
