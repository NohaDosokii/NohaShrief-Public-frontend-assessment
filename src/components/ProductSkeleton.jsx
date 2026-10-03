

import React from 'react';

export default function ProductSkeleton() {
  return (
    <div className="py-10 max-w-6xl mx-auto px-4 animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
      
        <div className="bg-gray-200 dark:bg-gray-700 h-87.5 rounded-xl w-full"></div>

        <div className="flex flex-col justify-between w-full space-y-4">
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full w-1/4"></div>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg w-3/4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 my-4"></div>
           
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
            </div>
          </div>

          
          <div className="flex items-center gap-4 pt-4 border-t border-gray-100 dark:border-gray-700">
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-xl flex-1"></div>
            <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
          </div>
        </div>

      </div>
    </div>
  );
}