import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; // 1. لا تنسي استيراد الـ Toaster هنا
import { ShopProvider } from './context/ShopContext'; 
import Layout from './components/Layout';
import ProductsPage from './pages/ProductsPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import WishList from './pages/WishList';
import NotFoundPage from './pages/NotFoundPage';

const routers = createBrowserRouter([
  {
    path: '',
    element: <Layout />,
    children: [
      { index: true, element: <ProductsPage /> },
      { path: 'products', element: <ProductsPage /> },
      { path: 'product/:id', element: <ProductDetailsPage /> },
      { path: 'cart', element: <CartPage /> },
      { path: 'wishlist', element: <WishList /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

export default function App() {
  return (
    <ShopProvider>
      <RouterProvider router={routers} />
      <Toaster position="top-center" reverseOrder={false} />
    </ShopProvider>
  );
}