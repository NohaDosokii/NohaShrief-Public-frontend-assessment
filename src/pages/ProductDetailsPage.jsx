import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { getProductById } from '../services/ProductService';
import { ShopContext } from '../context/ShopContext';
import ProductSkeleton from '../components/ProductSkeleton';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const { wishlist, addToCart, toggleWishlist } = useContext(ShopContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    async function fetchDetails() {
      setLoading(true);
      setError(null);
      try {
        const data = await getProductById(id);
        if (!data) {
          setError('Product details not found.');
          return;
        }
        setProduct(data);
      } catch (err) {
        setError('Failed to fetch product details. Please check your connection.');
      } finally {
        setLoading(false);
      }
    }
    fetchDetails();
  }, [id]);

  function handleAdd() {
    setIsAdding(true);
    addToCart(product);
    setTimeout(() => {
      setIsAdding(false);
    }, 500);
  }

  if (loading) {
    return <ProductSkeleton />;
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-600 font-semibold text-lg">
        {error}
      </div>
    );
  }

  if (!product) return null;

  const productId = product.id || product._id;
  const isWishlisted = wishlist.some((item) => (item.id || item._id) === productId);
  const productImage = product.thumbnail || product.imageCover || (product.images && product.images[0]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="py-10 max-w-6xl mx-auto px-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
        
   
        <div className="flex justify-center bg-gray-50 dark:bg-gray-900 p-6 rounded-xl">
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            src={productImage}
            alt={product.title}
            className="w-full max-h-100 object-contain rounded-lg cursor-pointer"
          />
        </div>

     
        <div className="flex flex-col justify-between">
          <div>
            <span className="text-xs uppercase tracking-wider text-gray-950 dark:text-gray-200 font-bold bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
              {product.category}
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mt-3">
              {product.title}
            </h1>

          
            <div className="flex items-center gap-1.5 my-3">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <span className="text-base font-bold text-gray-800 dark:text-gray-200">
                {product.rating || product.ratingsAverage || '4.5'}
              </span>
              <span className="text-sm text-gray-400">
                ({product.stock ? `${product.stock} in stock` : 'Available'})
              </span>
            </div>

            <div className="text-3xl font-bold text-gray-950 dark:text-white my-4">
              {product.price} $
            </div>

       
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm md:text-base mb-6">
              {product.description}
            </p>
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-gray-100 dark:border-gray-700">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleAdd}
              disabled={isAdding}
              className="flex-1 bg-gray-950 dark:bg-white text-white dark:text-gray-950 py-3 px-6 rounded-xl font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isAdding ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Adding...</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add to Cart</span>
                </>
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => toggleWishlist(product)}
              className={`p-3 rounded-xl border transition cursor-pointer flex items-center justify-center ${
                isWishlisted 
                  ? 'bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-950 dark:text-white' 
                  : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-400 hover:text-gray-950'
              }`}
              aria-label="Wishlist"
            >
              <Heart className={`w-6 h-6 ${isWishlisted ? 'fill-gray-950 dark:fill-white' : ''}`} />
            </motion.button>
          </div>
        </div>

      </div>
    </motion.div>
  );
}