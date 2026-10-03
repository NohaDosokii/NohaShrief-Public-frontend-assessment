import axios from 'axios';

const BASE_URL = 'https://dummyjson.com';
export async function getAllProducts({ limit = 28, skip = 0, search = '', category = '' } = {}) {
  try {
    let url = `${BASE_URL}/products?limit=${limit}&skip=${skip}`;

    if (search) {
      url = `${BASE_URL}/products/search?q=${search}&limit=${limit}&skip=${skip}`;
    } else if (category && category !== 'all') {
      url = `${BASE_URL}/products/category/${category}?limit=${limit}&skip=${skip}`;
    }

    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
}
export async function getProductById(id) {
  try {
    const { data } = await axios.get(`${BASE_URL}/products/${id}`);
    return data;
  } catch (error) {
    console.error("Error fetching product details:", error);
    return null;
  }
}
export async function getCategories() {
  try {
    const { data } = await axios.get(`${BASE_URL}/products/categories`);
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}