import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { ShopContext } from '../context/ShopContext';

export default function Navbar() {
  const { cartCount, wishlistCount } = useContext(ShopContext);

  const navLinkStyle = ({ isActive }) => {
    return `font-medium relative pb-1 transition-colors flex items-center gap-1.5 ${
      isActive 
        ? 'text-gray-950 font-bold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-gray-950' 
        : 'text-gray-600 hover:text-gray-950'
    }`;
  };

  return (
    <nav className="bg-[#F6F3E8] shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-gray-950">
          Mini Shop 🛍️
        </Link>

        <div className="flex items-center gap-6">
          <NavLink to="/" end className={navLinkStyle}>
            Products
          </NavLink>

          <NavLink to="/wishlist" className={navLinkStyle}>
            <Heart className="w-5 h-5" />
            <span>Wishlist</span>
            {wishlistCount > 0 && (
              <span className="bg-gray-300 text-gray-900 text-xs px-1.5 py-0.5 rounded-full font-bold">
                {wishlistCount}
              </span>
            )}
          </NavLink>

          <NavLink to="/cart" className={navLinkStyle}>
            <ShoppingCart className="w-5 h-5" />
            <span>Cart</span>
            {cartCount > 0 && (
              <span className="bg-gray-300 text-gray-900 text-xs px-1.5 py-0.5 rounded-full font-bold">
                {cartCount}
              </span>
            )}
          </NavLink>
        </div>
      </div>
    </nav>
  );
}