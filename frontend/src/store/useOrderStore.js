import { create } from 'zustand';
import axiosInstance from '../services/axiosInstance';

const useOrderStore = create((set) => ({
  orders: [],
  page: 1,
  pages: 1,
  orderDetails: null,
  isLoading: false,
  error: null,
  stats: null, // State lưu thống kê

  // Lấy danh sách đơn hàng (Admin)
  fetchOrders: async (pageNumber = 1) => {
    set({ isLoading: true, error: null });
    try {
      const authData = JSON.parse(localStorage.getItem('laptop-shop-auth'));
      const token = authData?.state?.userInfo?.token;
      const config = { headers: { Authorization: `Bearer ${token}` } };

      
      const { data } = await axiosInstance.get(`/orders?pageNumber=${pageNumber}`, config);
      
      set({ 
        orders: data.orders, 
        page: data.page, 
        pages: data.pages, 
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Lỗi tải đơn hàng', 
        isLoading: false 
      });
    }
  },

  getOrderDetails: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const authData = JSON.parse(localStorage.getItem('laptop-shop-auth'));
      const token = authData?.state?.userInfo?.token;
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const { data } = await axiosInstance.get(`/orders/${id}`, config);
      set({ orderDetails: data, isLoading: false });
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Lỗi tải chi tiết đơn', 
        isLoading: false 
      });
    }
  },

  deliverOrder: async (orderId) => {
    set({ isLoading: true });
    try {
      const authData = JSON.parse(localStorage.getItem('laptop-shop-auth'));
      const token = authData?.state?.userInfo?.token;
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const { data } = await axiosInstance.put(`/orders/${orderId}/deliver`, {}, config);
      
      set({ orderDetails: data, isLoading: false });
      return true;
    } catch (error) {
      set({ isLoading: false });
      return false;
    }
  },

  payOrder: async (orderId) => {
    set({ isLoading: true });
    try {
      const authData = JSON.parse(localStorage.getItem('laptop-shop-auth'));
      const token = authData?.state?.userInfo?.token;
      const config = { headers: { Authorization: `Bearer ${token}` } };

      
      const { data } = await axiosInstance.put(`/orders/${orderId}/pay`, {}, config);
      
      
      set({ orderDetails: data, isLoading: false });
      return true;
    } catch (error) {
      set({ isLoading: false });
      return false;
    }
  },

  getStats: async () => {
    set({ isLoading: true });
    try {
      const authData = JSON.parse(localStorage.getItem('laptop-shop-auth'));
      const token = authData?.state?.userInfo?.token;
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const { data } = await axiosInstance.get('/orders/stats', config);
      set({ stats: data, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
    }
  },
}));

export default useOrderStore;