import React from 'react';
import { useMockData } from '../../utils/helpers';

function MockData() {
  const { error, initialize, progress, status } = useMockData();

  const handleClick = () => {
    initialize();
  };
  return (
    <div className="container mx-auto flex justify-center items-center h-[80vh]">
      <div className="p-6 mb-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Initializing data to firebase
        </h5>
        <ul className="mb-6">
          <li>Status: {status}</li>
          <li>Progress: {progress}%</li>
          {error && <li>Errors</li>}
        </ul>
        <button
          onClick={handleClick}
          className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Initialize
        </button>
      </div>
    </div>
  );
}

export default MockData;
