// frontend/src/services/alertService.js
import api from './api';

export const createAlert = async ({ productId, targetPrice }) => {
  const { data } = await api.post('/alerts', { productId, targetPrice });
  return data;
};

export const listUserAlerts = async () => {
  const { data } = await api.get('/alerts');
  return data; // user's alerts
};

export const updateAlert = async (id, payload) => {
  const { data } = await api.put(`/alerts/${id}`, payload);
  return data;
};

export const deleteAlert = async (id) => {
  const { data } = await api.delete(`/alerts/${id}`);
  return data;
};
