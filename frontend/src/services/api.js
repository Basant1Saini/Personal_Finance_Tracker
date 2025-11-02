import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const login = (email, password) => api.post('/auth/login', { email, password });
export const register = (username, email, password) => api.post('/auth/register', { username, email, password });

// Transactions
export const getTransactions = () => api.get('/transactions');
export const createTransaction = (data) => api.post('/transactions', data);
export const deleteTransaction = (id) => api.delete(`/transactions/${id}`);

// Categories
export const getCategories = () => api.get('/categories');
export const createCategory = (data) => api.post('/categories', data);

export default api;