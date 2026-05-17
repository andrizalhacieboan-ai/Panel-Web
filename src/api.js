import axios from 'axios';
// Karena frontend & backend 1 domain di Vercel, cukup gunakan path relatif "/api"
const API_BASE = '/api'; 
export const createOrder = (data) => axios.post(`${API_BASE}/order/create`, data);
export const checkOrderStatus = (orderId) => axios.get(`${API_BASE}/order/status/${orderId}`);