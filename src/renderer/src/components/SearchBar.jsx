/* eslint-disable prettier/prettier */
import {Input} from "@heroui/input";
import { useNavigate } from "react-router-dom";
import React from 'react';
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@heroui/dropdown";
import {Button} from "@heroui/button";


export const SearchIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M22 22L20 20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
};



export default function SearchBar() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      console.log('Empty search query');
      return;
    }

    setIsLoading(true);
    const apiUrl = `http://127.0.0.1:5000/querying/${encodeURIComponent(searchQuery)}`;
    console.log('Sending request to:', apiUrl);

    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        }
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const results = await response.json();
      console.log('Search results:', results);

      if (!Array.isArray(results)) {
        console.error('Received non-array response:', results);
        throw new Error('Expected array of results');
      }

      const normalizedResults = results.map(path => path.replace(/\\/g, '/'));
      console.log('Normalized results:', normalizedResults);

      // Use replace to avoid navigation stack issues
      navigate('/landing', {
        state: {
          searchQuery,
          searchResults: normalizedResults
        },
        replace: true
      });

    } catch (error) {
      console.error('Search failed:', error);
      console.error('Error details:', {
        message: error.message,
        stack: error.stack
      });
      alert(`Search failed: Please check the console for details`);
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div className="flex flex-row gap-4 w-full max-w-2xl mx-auto">
      <div className="w-full rounded-2xl flex justify-center items-center bg-gradient-to-tr from-pink-500 to-yellow-500 text-white p-1">
      <Input
          endContent={<button
            onClick={handleSearch}
            disabled={isLoading}
            className={`p-2 text-gray-400 hover:text-white transition-colors duration-200 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? '⌛' : '➡️'}
          </button>}
          isClearable
          disabled={isLoading}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
          classNames={{
            base: "w-full",
            label: "text-black/50 dark:text-white/90",
            input: [
              "bg-transparent",
              "text-black/90 dark:text-white/90",
              "placeholder:text-default-700/50 dark:placeholder:text-white/60",
              "pl-4",
            ],
            innerWrapper: "bg-transparent",
            inputWrapper: [
              "shadow-xl",
              "bg-default-200/50",
              "backdrop-blur-xl",
              "backdrop-saturate-200",
              "hover:bg-default-200/70",
              "dark:hover:bg-default/70",
              "group-data-[focus=true]:bg-default-200/50",
              "dark:group-data-[focus=true]:bg-default/60",
              "!cursor-text",
              "border-none",
            ],
          }}
          placeholder="Type to search..."
          radius="lg"
          startContent={
            <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
          }
        />
      </div>

      <div className="flex items-center gap-2 justify-center">
        <Dropdown>
      <DropdownTrigger>
        <Button className="text-white" variant="bordered">Models</Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="Pro">Pro</DropdownItem>
        <DropdownItem key="Sonar">Sonar</DropdownItem>
      </DropdownMenu>
    </Dropdown>
      </div>
    </div>
  );
}
