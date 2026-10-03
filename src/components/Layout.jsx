import React, { Suspense, useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { Loader2, Moon, Sun } from 'lucide-react';

export default function Layout({ cart = [], setCart, wishlist = [], setWishlist }) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
     
      <div className="fixed bottom-5 right-5 z-50">
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 p-3 rounded-full shadow-lg hover:scale-110 transition cursor-pointer"
          aria-label="Toggle Dark Mode"
        >
          {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
        </button>
      </div>
      <Navbar cartCount={cart.length} wishlistCount={wishlist.length} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Suspense 
          fallback={
            <div className="flex justify-center items-center min-h-[60vh]">
              <Loader2 className="w-10 h-10 animate-spin text-gray-950 dark:text-white" />
            </div>
          }
        >
          <Outlet context={{ cart, setCart, wishlist, setWishlist }} />
        </Suspense>
      </main>
    </div>
  );
}