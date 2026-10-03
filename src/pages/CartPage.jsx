import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { ShopContext } from '../context/ShopContext';

export default function CartPage() {
  const { cart, setCart } = useContext(ShopContext);

 
  function handleIncrease(productId) {
    const updatedCart = cart.map((item) => {
      const id = item.id || item._id;
      if (id === productId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCart(updatedCart);
  }


  function handleDecrease(productId) {
    const updatedCart = cart.map((item) => {
      const id = item.id || item._id;
      if (id === productId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCart(updatedCart);
  }


  function handleRemoveItem(productId) {
    const updatedCart = cart.filter((item) => (item.id || item._id) !== productId);
    setCart(updatedCart);
  }


  const totalPrice = cart.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);

 
  if (!cart || cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center py-16 px-4">
        <div className="bg-gray-100 p-6 rounded-full mb-4 text-gray-950">
          <ShoppingBag className="w-12 h-12" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6 max-w-sm">
          Looks like you haven't added anything to your cart yet. Explore our products and find something you love!
        </p>
        <Link
          to="/products"
          className="bg-gray-950 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition flex items-center gap-2 shadow-sm"
        >
          <span>Start Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="py-10 max-w-7xl mx-auto px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => {
            const productId = item.id || item._id;
            const productImage = item.thumbnail || item.imageCover || (item.images && item.images[0]);
            const itemTotal = item.price * item.quantity;

            return (
              <div
                key={productId}
                className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 transition hover:shadow-md"
              >
               
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <img
                    src={productImage}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded-xl border bg-gray-50"
                  />
                  <div>
                    <Link to={`/product/${productId}`}>
                      <h3 className="font-semibold text-gray-800 hover:text-gray-950 line-clamp-1 transition-colors">
                        {item.title}
                      </h3>
                    </Link>
                    <span className="text-gray-950 font-bold text-sm mt-1 block">
                      {item.price} $
                    </span>
                  </div>
                </div>

              
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-gray-50">
                    <button
                      onClick={() => handleDecrease(productId)}
                      className="p-2 hover:bg-gray-200 transition text-gray-600 cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 font-bold text-gray-800 text-sm">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleIncrease(productId)}
                      className="p-2 hover:bg-gray-200 transition text-gray-600 cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                 
                  <span className="font-bold text-gray-900 min-w-17.5 text-right">
                    {itemTotal.toFixed(2)} $
                  </span>

               
                  <button
                    onClick={() => handleRemoveItem(productId)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition cursor-pointer"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm h-fit">
          <h2 className="text-xl font-bold text-gray-800 mb-4 pb-3 border-b border-gray-100">Order Summary</h2>
          
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-gray-600 text-sm">
              <span>Total Items</span>
              <span className="font-semibold text-gray-800">
                {cart.reduce((sum, item) => sum + item.quantity, 0)} items
              </span>
            </div>
            <div className="flex justify-between text-gray-600 text-sm">
              <span>Shipping</span>
              <span className="text-green-600 font-semibold">Free</span>
            </div>
            <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
              <span className="font-bold text-gray-800 text-lg">Total</span>
              <span className="font-extrabold text-gray-950 text-2xl">
                {totalPrice.toFixed(2)} $
              </span>
            </div>
          </div>

          <button
            onClick={() => alert('Proceeding to checkout... (Coming soon!)')}
            className="w-full bg-gray-950 text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition cursor-pointer shadow-sm text-center block"
          >
            Proceed to Checkout
          </button>
        </div>

      </div>
    </div>
  );
}