import React, { useState, useContext, memo } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Loader2, Star } from 'lucide-react';
import { ShopContext } from '../context/ShopContext';

function ProductCard({ product }) {
  const [isAdding, setIsAdding] = useState(false);
  const { wishlist, addToCart, toggleWishlist } = useContext(ShopContext);

  const productId = product.id || product._id;
  const isWishlisted = wishlist.some((item) => (item.id || item._id) === productId);
  const productImage = product.thumbnail || product.imageCover || (product.images && product.images[0]);
  
  const handleAddClick = async () => {
    setIsAdding(true);
    await Promise.resolve(addToCart(product));
    setTimeout(() => {
      setIsAdding(false);
    }, 500); 
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-sm p-4 flex flex-col justify-between hover:shadow-md transition relative group">
      <button
        onClick={() => toggleWishlist(product)}
        className="absolute top-4 right-4 z-10 bg-white/90 dark:bg-gray-700/90 p-2 rounded-full shadow hover:bg-white dark:hover:bg-gray-700 transition cursor-pointer"
        aria-label="Wishlist"
      >
        <Heart
          className={`w-5 h-5 transition-colors ${
            isWishlisted ? 'text-gray-950 dark:text-white fill-gray-950 dark:fill-white' : 'text-gray-400 dark:text-gray-300 hover:text-gray-950 dark:hover:text-white'
          }`}
        />
      </button>

      <div>
        <Link to={`/product/${productId}`}>
          <img
            src={productImage}
            alt={product.title}
            width="400"
            height="192"
            className="w-full h-48 object-cover rounded-lg mb-4 group-hover:scale-105 transition duration-300 bg-gray-50 dark:bg-gray-700"
            loading="lazy"
          />
        </Link>

        <Link to={`/product/${productId}`}>
          <h2 className="font-semibold text-gray-800 dark:text-gray-100 line-clamp-1 hover:text-gray-950 dark:hover:text-white transition-colors">
            {product.title}
          </h2>
        </Link>

        <div className="flex items-center gap-1.5 my-2">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
            {product.rating || product.ratingsAverage || '4.8'}
          </span>
          <span className="text-xs text-gray-400 dark:text-gray-400">
            ({product.stock || product.ratingsQuantity || '15'})
          </span>
        </div>
      </div>

      <div className="mt-2 flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
        <span className="text-gray-950 dark:text-gray-100 font-bold text-lg">
          {product.price} $
        </span>

        <button
          onClick={handleAddClick}
          disabled={isAdding}
          className="bg-gray-950 dark:bg-white text-white dark:text-gray-900 px-3 py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition flex items-center gap-1.5 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed shadow-sm"
        >
          {isAdding ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Adding...</span>
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" />
              <span>Add</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default memo(ProductCard);