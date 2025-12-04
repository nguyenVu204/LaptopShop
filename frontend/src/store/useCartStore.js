import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],

      // 1. Thêm sản phẩm vào giỏ
      addToCart: (product) => {
        const items = get().cartItems;
        const existingItem = items.find((item) => item._id === product._id);

        if (existingItem) {
          // Nếu đã có, tăng số lượng lên 1
          const newItems = items.map((item) =>
            item._id === product._id 
              ? { ...item, quantity: item.quantity + 1 } 
              : item
          );
          set({ cartItems: newItems });
        } else {
          // Nếu chưa có, thêm mới với quantity = 1
          set({ cartItems: [...items, { ...product, quantity: 1 }] });
        }
      },

      // 2. Xóa sản phẩm khỏi giỏ
      removeFromCart: (productId) => {
        set({ 
          cartItems: get().cartItems.filter((item) => item._id !== productId) 
        });
      },

      // 3. Cập nhật số lượng (Tăng/Giảm)
      updateQuantity: (productId, quantity) => {
        if (quantity < 1) return; // Không cho giảm dưới 1
        const newItems = get().cartItems.map((item) =>
          item._id === productId ? { ...item, quantity } : item
        );
        set({ cartItems: newItems });
      },

      // 4. Xóa hết giỏ hàng (Dùng khi thanh toán xong)
      clearCart: () => set({ cartItems: [] }),

      // 5. Tính tổng tiền (Helper function)
      getTotalPrice: () => {
        return get().cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
      },
    }),
    {
      name: 'laptop-shop-cart', // Tên key lưu trong LocalStorage
    }
  )
);

export default useCartStore;