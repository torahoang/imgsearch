/* eslint-disable prettier/prettier */
import { useState } from 'react';

const FolderInput = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleFolderSelect = async () => {
    try {
      setIsLoading(true);
      // Open folder dialog
      const { canceled, filePaths } = await window.electron.ipcRenderer.invoke('open-folder-dialog');

      if (!canceled && filePaths.length > 0) {
        const folderPath = filePaths[0];

        // Call the Python API endpoint
        const response = await fetch(`http://127.0.0.1:5000/encode_img/${encodeURIComponent(folderPath)}`);
        const result = await response.json();
        console.log('Encoding complete:', result);
      }
    } catch (error) {
      console.error('Error processing folder:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleFolderSelect}
      disabled={isLoading}
      className="rounded-full bg-gray-700 p-3 hover:bg-gray-600 transition-colors duration-200"
      title="Add folder to index"
    >
      {isLoading ? (
        <div className="w-6 h-6 animate-spin rounded-full border-2 border-gray-300 border-t-white" />
      ) : (
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      )}
    </button>
  );
};

export default FolderInput;
