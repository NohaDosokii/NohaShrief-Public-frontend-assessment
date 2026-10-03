

import React from 'react';
import { Link } from 'react-router-dom';
import { Ghost, Home, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center text-center px-4 py-16">
     
      <div className="relative mb-6">
        <div className="absolute -inset-1 rounded-full bg-indigo-100 blur-xl opacity-70"></div>
        <div className="relative bg-indigo-50 p-6 rounded-full text-indigo-600 border border-indigo-100 shadow-sm">
          <Ghost className="w-16 h-16 animate-bounce" />
        </div>
      </div>

      <span className="text-indigo-600 font-extrabold text-sm uppercase tracking-widest bg-indigo-50 px-4 py-1.5 rounded-full mb-3">
        Error 404
      </span>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
        Page Not Found
      </h1>

      <p className="text-gray-500 max-w-md mx-auto mb-8 text-sm md:text-base leading-relaxed">
        Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>

    
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
        <Link
          to="/"
          className="w-full sm:w-auto bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition flex items-center justify-center gap-2 shadow-sm cursor-pointer"
        >
          <Home className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        <button
          onClick={() => window.history.back()}
          className="w-full sm:w-auto bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition flex items-center justify-center gap-2 cursor-pointer shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Go Back</span>
        </button>
      </div>
    </div>
  );
}