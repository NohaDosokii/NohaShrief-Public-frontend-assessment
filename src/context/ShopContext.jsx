import React, { createContext, useState, useEffect, useMemo } from 'react';
import toast from 'react-hot-toast';

export const ShopContext = createContext();

export function ShopProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('mini_shop_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem('mini_shop_wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  useEffect(() => {
    localStorage.setItem('mini_shop_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('mini_shop_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const cartCount = useMemo(() => cart.reduce((acc, item) => acc + item.quantity, 0), [cart]);
  const wishlistCount = useMemo(() => wishlist.length, [wishlist]);

  const addToCart = (product) => {
    const existingIndex = cart.findIndex((item) => (item.id || item._id) === (product.id || product._id));
    if (existingIndex > -1) {
      const updatedCart = [...cart];
      updatedCart[existingIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    
    toast.success('Product added to cart successfully!', {
      style: {
        borderRadius: '12px',
        background: '#18181b', 
        color: '#fff',
      },
      iconTheme: {
        primary: 'black',
        secondary: '#fff',
      },
    });
  }; 

  const toggleWishlist = (product) => {
    const productId = product.id || product._id;
    const isWishlisted = wishlist.some((item) => (item.id || item._id) === productId);
    
    if (isWishlisted) {
      setWishlist(wishlist.filter((item) => (item.id || item._id) !== productId));
      toast('Removed from wishlist', {
        icon: '🗑️',
        style: {
          borderRadius: '12px',
          background: '#18181b',
          color: '#fff',
        },
      });
    } else {
      setWishlist([...wishlist, product]);
      toast.success('Added to wishlist successfully!', {
        style: {
          borderRadius: '12px',
          background: '#18181b',
          color: '#fff',
        },
          iconTheme: {
        primary: 'black',
        secondary: '#fff',
      },
      });
    }
  };

  const value = useMemo(() => ({
    cart, 
    setCart, 
    wishlist, 
    setWishlist, 
    cartCount, 
    wishlistCount, 
    addToCart, 
    toggleWishlist
  }), [cart, wishlist, cartCount, wishlistCount]);

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
}