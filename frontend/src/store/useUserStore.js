import { create } from 'zustand';
import axiosInstance from '../services/axiosInstance';
import { toast } from 'react-toastify';

const useUserStore = create((set, get) => ({
  users: [],
  page: 1,
  pages: 1,
  isLoading: false,
  error: null,
  userDetails: null,

  // Lấy danh sách user
  getUsers: async (pageNumber = 1) => {
    set({ isLoading: true });
    try {
      const authData = JSON.parse(localStorage.getItem('laptop-shop-auth'));
      const token = authData?.state?.userInfo?.token;
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const { data } = await axiosInstance.get(`/users?pageNumber=${pageNumber}`, config);
      
      set({ 
          users: data.users, 
          page: data.page, 
          pages: data.pages, 
          isLoading: false 
      });
    } catch (error) {
       set({ isLoading: false, error: error.message });
    }
  },

  // Xóa user
  deleteUser: async (id) => {
    try {
      const authData = JSON.parse(localStorage.getItem('laptop-shop-auth'));
      const token = authData?.state?.userInfo?.token;
      const config = { headers: { Authorization: `Bearer ${token}` } };

      await axiosInstance.delete(`/users/${id}`, config);
      
      // Xóa thành công thì lọc bỏ user đó khỏi state
      set((state) => ({
        users: state.users.filter((user) => user._id !== id)
      }));
      toast.success('Đã xóa người dùng thành công');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Xóa thất bại');
    }
  },


  getUserDetails: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const authData = JSON.parse(localStorage.getItem('laptop-shop-auth'));
      const token = authData?.state?.userInfo?.token;
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const { data } = await axiosInstance.get(`/users/${id}`, config);
      set({ userDetails: data, isLoading: false });
    } catch (error) {
      set({ isLoading: false, error: 'Lỗi tải user' });
    }
  },

 
  updateUser: async (userData) => {
    set({ isLoading: true });
    try {
      const authData = JSON.parse(localStorage.getItem('laptop-shop-auth'));
      const token = authData?.state?.userInfo?.token;
      const config = { headers: { Authorization: `Bearer ${token}` } };

      await axiosInstance.put(`/users/${userData._id}`, userData, config);
      
      set({ isLoading: false });
      toast.success('Cập nhật người dùng thành công');
      return true;
    } catch (error) {
      set({ isLoading: false });
      toast.error(error.response?.data?.message || 'Cập nhật thất bại');
      return false;
    }
  },
}));

export default useUserStore;