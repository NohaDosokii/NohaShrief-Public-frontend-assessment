import React, { useEffect, useRef, useContext } from 'react';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion'; 
import { useProducts } from '../hooks/useProducts';
import ProductsFilterBar from '../components/ProductsFilterBar';
import ProductCard from '../components/ProductCard';
import ProductsGridSkeleton from '../components/ProductsGridSkeleton';
import { ShopContext } from '../context/ShopContext';

export default function ProductsPage() {
  const {
    products,
    categories,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    sortOrder,
    setSortOrder,
    setPage,
    hasMore,
  } = useProducts();

  const { wishlist, addToCart, toggleWishlist } = useContext(ShopContext);
  const observerRef = useRef(null);

  useEffect(() => {
    const currentElement = observerRef.current;
    if (!currentElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(currentElement);

    return () => {
      if (currentElement) observer.unobserve(currentElement);
    };
  }, [loading, hasMore, setPage]);

  return (
    <div className="py-8 max-w-7xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">Explore Products</h1>

      <ProductsFilterBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />

      {error ? (
        <div className="text-center py-20 text-red-600 font-semibold text-lg">
          {error}
        </div>
      ) : loading && products.length === 0 ? (
        <ProductsGridSkeleton />
      ) : products.length === 0 && !loading ? (
        <div className="text-center py-20 text-gray-500 font-medium text-lg">
          No products matched your search or filter.
        </div>
      ) : (
        <>
        
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {products.motion ? null : products.map((product) => (
              <ProductCard
                key={product.id || product._id}
                product={product}
                wishlist={wishlist}
                onAddToCart={addToCart}
                onToggleWishlist={toggleWishlist}
              />
            ))}
          </motion.div>

          <div ref={observerRef} className="flex justify-center items-center py-10">
            {loading && (
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-600 dark:text-white" />
                <span>Loading more products...</span>
              </div>
            )}
            {!hasMore && products.length > 0 && (
              <p className="text-gray-400 text-sm">🎉 You have reached the end of the list.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}