import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Loader2, Trash2, ArrowRight } from 'lucide-react';
import { ShopContext } from '../context/ShopContext';

export default function WishList() {
  const { wishlist, setWishlist, addToCart } = useContext(ShopContext);
  const [loadingIds, setLoadingIds] = useState({});

  function handleRemoveFromWishlist(productId) {
    setWishlist(wishlist.filter((item) => (item.id || item._id) !== productId));
  }


  async function handleAddToCartFromWishlist(product) {
    const productId = product.id || product._id;
    setLoadingIds((prev) => ({ ...prev, [productId]: true }));

    await Promise.resolve(addToCart(product));

    setTimeout(() => {
      setLoadingIds((prev) => ({ ...prev, [productId]: false }));
    }, 500);
  }

  if (!wishlist || wishlist.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center py-16 px-4">
        <div className="bg-gray-100 p-6 rounded-full mb-4 text-gray-950">
          <Heart className="w-12 h-12" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your wishlist is empty</h2>
        <p className="text-gray-500 mb-6 max-w-sm">
          You haven't added any items to your wishlist yet. Explore our products and save your favorites!
        </p>
        <Link
          to="/products"
          className="bg-gray-950 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition flex items-center gap-2 shadow-sm"
        >
          <span>Explore Products</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="py-10 max-w-7xl mx-auto px-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Wishlist</h1>
        <span className="text-sm font-semibold bg-gray-100 text-gray-950 px-3 py-1 rounded-full">
          {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map((product) => {
          const productId = product.id || product._id;
          const productImage = product.thumbnail || product.imageCover || (product.images && product.images[0]);
          const isAdding = loadingIds[productId] || false;

          return (
            <div
              key={productId}
              className="bg-white border border-gray-100 rounded-2xl shadow-sm p-4 flex flex-col justify-between hover:shadow-md transition relative group"
            >
              
              <button
                onClick={() => handleRemoveFromWishlist(productId)}
                className="absolute top-4 right-4 z-10 bg-white/90 p-2 rounded-full shadow hover:bg-red-50 hover:text-red-600 transition text-gray-400 cursor-pointer"
                aria-label="Remove from wishlist"
              >
                <Trash2 className="w-4 h-4" />
              </button>

         
              <div>
                <Link to={`/product/${productId}`}>
                  <img
                    src={productImage}
                    alt={product.title}
                    className="w-full h-48 object-cover rounded-xl mb-4 group-hover:scale-105 transition duration-300 bg-gray-50"
                    loading="lazy"
                  />
                </Link>

                <Link to={`/product/${productId}`}>
                  <h3 className="font-semibold text-gray-800 line-clamp-1 hover:text-gray-950 transition-colors">
                    {product.title}
                  </h3>
                </Link>

                <span className="text-gray-950 font-bold text-lg mt-2 block">
                  {product.price} $
                </span>
              </div>

            
              <div className="mt-4 pt-3 border-t border-gray-100">
                <button
                  onClick={() => handleAddToCartFromWishlist(product)}
                  disabled={isAdding}
                  className="w-full bg-gray-950 text-white py-2.5 rounded-xl font-semibold hover:bg-gray-800 transition flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-70 disabled:cursor-not-allowed text-sm"
                >
                  {isAdding ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Adding...</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}