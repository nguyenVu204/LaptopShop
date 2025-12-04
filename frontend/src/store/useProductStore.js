import { create } from 'zustand';
import axiosInstance from '../services/axiosInstance';

const useProductStore = create((set) => ({
  products: [],
  page: 1,      // Trang hiện tại
  pages: 1,     // Tổng số trang
  isLoading: false,
  productDetails: null, // Lưu chi tiết 1 sản phẩm
  error: null,

  // Hàm gọi API lấy danh sách sản phẩm
  fetchProducts: async (keyword = '', category = '', pageNumber = 1) => {
    set({ isLoading: true, error: null });
    try {
      let query = `/products?keyword=${keyword}&pageNumber=${pageNumber}`;
      if (category) {
        query += `&category=${category}`;
      }

      const { data } = await axiosInstance.get(query);
      
      set({ 
          products: data.products, 
          page: data.page, 
          pages: data.pages, 
          isLoading: false 
      });
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Lỗi tải sản phẩm', 
        isLoading: false 
      });
    }
  },

  fetchProductDetails: async (id) => {
    set({ isLoading: true, error: null, productDetails: null }); // Reset data cũ
    try {
      const response = await axiosInstance.get(`/products/${id}`);
      set({ productDetails: response.data, isLoading: false });
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Lỗi khi tải chi tiết', 
        isLoading: false 
      });
    }
  },

  deleteProduct: async (productId) => {
    set({ isLoading: true });
    try {
      // Lấy token từ LocalStorage (do authStore lưu ở đó)
      const authData = JSON.parse(localStorage.getItem('laptop-shop-auth'));
      const token = authData?.state?.userInfo?.token;

      if (!token) throw new Error("Chưa đăng nhập!");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axiosInstance.delete(`/products/${productId}`, config);
      
      // Xóa thành công thì tải lại danh sách mới
      set((state) => ({
        products: state.products.filter((p) => p._id !== productId),
        isLoading: false
      }));
      return { success: true };
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Xóa thất bại', 
        isLoading: false 
      });
      return { success: false, message: error.message };
    }
  },
  createProduct: async () => {
    set({ isLoading: true });
    try {
       // Lấy token 
      const authData = JSON.parse(localStorage.getItem('laptop-shop-auth'));
      const token = authData?.state?.userInfo?.token;
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const { data } = await axiosInstance.post(`/products`, {}, config);
      set({ isLoading: false });
      return data; // Trả về sản phẩm mẫu vừa tạo để redirect tới trang Edit
    } catch (error) {
       // Handle error...
    }
  },

  updateProduct: async (productData) => {
    set({ isLoading: true });
    try {
      const authData = JSON.parse(localStorage.getItem('laptop-shop-auth'));
      const token = authData?.state?.userInfo?.token;
      const config = { headers: { Authorization: `Bearer ${token}` } };

      await axiosInstance.put(`/products/${productData._id}`, productData, config);
      set({ isLoading: false });
      return true;
    } catch (error) {
       // Handle error...
       return false;
    }
  },

  uploadImage: async (formData) => {
    try {
      const authData = JSON.parse(localStorage.getItem('laptop-shop-auth'));
      const token = authData?.state?.userInfo?.token;
      const config = { 
        headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data' // Header quan trọng để upload file
        } 
      };

      const { data } = await axiosInstance.post('/upload', formData, config);
      return data; // Trả về đường dẫn ảnh
    } catch (error) {
      console.error(error);
    }
  }
}));

export default useProductStore;