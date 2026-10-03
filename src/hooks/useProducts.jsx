import { useState, useEffect, useTransition } from 'react';
import { getAllProducts, getCategories } from '../services/ProductService';

export function useProducts() {
  const [allProducts, setAllProducts] = useState([]); 
  const [products, setProducts] = useState([]);   
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOrder, setSortOrder] = useState('default');
  
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [, startTransition] = useTransition();
  const ITEMS_PER_PAGE = 8; 

  
  useEffect(() => {
    const timer = setTimeout(() => {
      startTransition(() => {
        setDebouncedSearch(searchTerm);
        setPage(1);
      });
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    setPage(1);
  }, [selectedCategory, sortOrder]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await getCategories();
        const catsList = Array.isArray(data) ? data : data?.categories || data?.data || [];
        setCategories(catsList);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    }
    fetchCategories();
  }, []);


  useEffect(() => {
    async function fetchProductsData() {
      setLoading(true);
      setError(null);
      try {
        const data = await getAllProducts({
          search: debouncedSearch,
          category: selectedCategory,
        });

        if (!data) {
          setError('Oops, no products found.');
          setAllProducts([]);
          setProducts([]);
          return;
        }

        let productsList = Array.isArray(data) ? data : data?.products || data?.data || [];

        if (sortOrder === 'asc') {
          productsList.sort((a, b) => a.price - b.price);
        } else if (sortOrder === 'desc') {
          productsList.sort((a, b) => b.price - a.price);
        }

        setAllProducts(productsList);
       
        setProducts(productsList.slice(0, ITEMS_PER_PAGE));
        setHasMore(productsList.length > ITEMS_PER_PAGE);
      } catch (err) {
        setError('Failed to fetch products. Please check your internet connection.');
      } finally {
        setLoading(false);
      }
    }

    fetchProductsData();
  }, [debouncedSearch, selectedCategory, sortOrder]);
  useEffect(() => {
    if (page === 1) return;

    setLoading(true);
    const timer = setTimeout(() => {
      const startIndex = 0;
      const endIndex = page * ITEMS_PER_PAGE;
      const nextProducts = allProducts.slice(startIndex, endIndex);

      setProducts(nextProducts);

      if (endIndex >= allProducts.length) {
        setHasMore(false);
      }
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [page, allProducts]);

  return {
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
  };
}