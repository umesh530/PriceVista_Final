// frontend/src/services/productService.js
import api from './api';

export const getFeatured = async (limit = 12) => {
  const { data } = await api.get('/products', { params: { featured: true, limit }});
  return data;
};

export const searchProducts = async (q, skip=0, limit=12) => {
  const { data } = await api.get('/products', { params: { q, skip, limit }});
  return data;
};

export const getProduct = async (id) => {
  const { data } = await api.get(`/products/${id}`);
  return data; // { product, discount }
};

export const getPriceHistory = async (id, days=30) => {
  const { data } = await api.get(`/products/${id}/history`, { params: { days }});
  return data; // { chartData }
};
