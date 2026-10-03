import React from 'react';
import { Search } from 'lucide-react';

export default function ProductsFilterBar({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  categories,
  sortOrder,
  setSortOrder,
}) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 mb-8 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300 w-5 h-5" />
        <input
          type="text"
          placeholder="Search products by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-transparent text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
        />
      </div>

      <div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full py-2 px-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 cursor-pointer"
        >
          <option value="all">All Categories</option>
          {categories.map((cat, index) => {
            const catName = typeof cat === 'string' ? cat : cat.name || cat.slug;
            const catSlug = typeof cat === 'string' ? cat : cat.slug || cat.name;
            return (
              <option key={cat.id || cat._id || index} value={catSlug}>
                {catName}
              </option>
            );
          })}
        </select>
      </div>

      <div>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="w-full py-2 px-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 cursor-pointer"
        >
          <option value="default">Sort by Price (Default)</option>
          <option value="asc">Price: Low to High (Ascending)</option>
          <option value="desc">Price: High to Low (Descending)</option>
        </select>
      </div>
    </div>
  );
}