// frontend/src/services/productService.js
import api from './api';

// list products with optional search/ pagination
export const listProducts = async ({ q = '', skip = 0, limit = 12 } = {}) => {
  const params = { q, skip, limit };
  const { data } = await api.get('/products', { params });
  return data; // array of products
};

export const getProduct = async (id) => {
  const { data } = await api.get(`/products/${id}`);
  return data;
};

// admin: create / update / delete (protected)
export const createProduct = async (payload) => {
  const { data } = await api.post('/products', payload);
  return data;
};

export const updateProduct = async (id, payload) => {
  const { data } = await api.put(`/products/${id}`, payload);
  return data;
};

export const deleteProduct = async (id) => {
  const { data } = await api.delete(`/products/${id}`);
  return data;
};
