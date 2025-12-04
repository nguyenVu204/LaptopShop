import { create } from "zustand";
import { persist } from "zustand/middleware";
import axiosInstance from "../services/axiosInstance";

const useAuthStore = create(
  persist(
    (set) => ({
      userInfo: null, // Chứa thông tin user (_id, name, email, token, isAdmin)
      isLoading: false,
      error: null,

      // Hàm Đăng nhập
      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const { data } = await axiosInstance.post("/users/login", {
            email,
            password,
          });
          set({ userInfo: data, isLoading: false });
          return true; // Trả về true nếu thành công
        } catch (error) {
          set({
            error: error.response?.data?.message || "Đăng nhập thất bại",
            isLoading: false,
          });
          return false;
        }
      },

      // Hàm Đăng ký
      register: async (name, email, password) => {
        set({ isLoading: true, error: null });
        try {
          const { data } = await axiosInstance.post("/users", {
            name,
            email,
            password,
          });
          set({ userInfo: data, isLoading: false });
          return true;
        } catch (error) {
          set({
            error: error.response?.data?.message || "Đăng ký thất bại",
            isLoading: false,
          });
          return false;
        }
      },

      // Hàm Đăng xuất
      logout: () => {
        set({ userInfo: null, error: null });
        localStorage.removeItem("laptop-shop-auth"); // Xóa sạch storage
      },

      // Cập nhật hồ sơ cá nhân
      updateProfile: async (userData) => {
        set({ isLoading: true });
        try {
          const authData = JSON.parse(localStorage.getItem("laptop-shop-auth"));
          const token = authData?.state?.userInfo?.token;
          const config = { headers: { Authorization: `Bearer ${token}` } };

          // Gọi API
          const { data } = await axiosInstance.put(
            "/users/profile",
            userData,
            config
          );

          // Cập nhật lại state và localStorage
          set({ userInfo: data, isLoading: false });
          return true;
        } catch (error) {
          set({
            error: error.response?.data?.message || "Cập nhật thất bại",
            isLoading: false,
          });
          return false;
        }
      },
    }),
    {
      name: "laptop-shop-auth", // Key lưu trong LocalStorage
    }
  )
);

export default useAuthStore;
