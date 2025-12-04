import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://laptopshop-api.onrender.com/api', // Địa chỉ Backend
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;