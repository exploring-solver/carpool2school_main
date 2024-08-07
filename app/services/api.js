import axios from 'axios';
import * as authStorage from './authStorage';
// import {BACKEND_URL} from 'react-native-dotenv'
const api = axios.create({
  baseURL: "http://192.168.1.2:5999",
});

api.interceptors.request.use(
  async (config) => {
    const token = await authStorage.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const login = (email, password) => api.post('/auth/login', { email, password });
export const register = (userData) => api.post('/auth/register', userData);
export const addAddress = (addressData) => api.post('/users/details', addressData);
export const getUserDetails = () => api.get('/users/details');
export const deleteAddress = () => api.delete('/users/address');
export const findNearbyUsers = (lat, lon, radius) => 
  api.get(`/users/nearby?lat=${lat}&lon=${lon}&radius=${radius}`);

export default api;