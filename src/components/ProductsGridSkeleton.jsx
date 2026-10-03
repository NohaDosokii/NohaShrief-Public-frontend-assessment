import React from 'react';

export default function ProductsGridSkeleton() {
 
  const skeletons = Array.from({ length: 8 });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-pulse">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {skeletons.map((_, index) => (
          <div 
            key={index} 
            className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 flex flex-col justify-between space-y-4"
          >
            
            <div className="bg-gray-200 dark:bg-gray-700 h-48 rounded-xl w-full"></div>
            
          
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full w-1/3"></div>
              <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-lg w-4/5"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 pt-2"></div>
            </div>

            <div className="pt-2 flex items-center justify-between gap-2">
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-xl flex-1"></div>
              <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}