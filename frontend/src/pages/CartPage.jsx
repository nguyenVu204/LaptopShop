import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Import Toast
import useCartStore from '../store/useCartStore';
import useAuthStore from '../store/useAuthStore'; // Import Auth để check login
import axiosInstance from '../services/axiosInstance'; // Import axios để gọi API
import { formatCurrency } from '../utils/format';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCartStore();
  const { userInfo } = useAuthStore();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    // 1. Check đăng nhập
    if (!userInfo) {
      toast.info('Vui lòng đăng nhập để thanh toán!');
      navigate('/login');
      return;
    }

    // 2. Chuẩn bị dữ liệu gửi lên Server
    const orderData = {
      orderItems: cartItems,
      shippingAddress: { address: '123 Test Street' }, // Tạm thời hardcode, sau này làm form nhập địa chỉ sau
      paymentMethod: 'COD', // Thanh toán khi nhận hàng
      itemsPrice: getTotalPrice(),
      shippingPrice: 0,
      totalPrice: getTotalPrice(),
    };

    try {
      // 3. Gọi API (Cần token, axiosInstance đã cấu hình sẵn base URL, ta cần thêm header token)
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axiosInstance.post('/orders', orderData, config);
      
      // 4. Thành công
      toast.success('Đặt hàng thành công! Cảm ơn bạn.');
      clearCart(); // Xóa giỏ hàng trong store
      navigate('/'); // Quay về trang chủ (hoặc trang quản lý đơn hàng nếu có)
      
    } catch (error) {
      toast.error('Đặt hàng thất bại, vui lòng thử lại.');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20 min-h-[50vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Giỏ hàng của bạn đang trống</h2>
        <Link to="/" className="text-blue-600 hover:underline text-lg">
          Quay lại mua sắm ngay
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4">Giỏ Hàng ({cartItems.length} sản phẩm)</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cột Trái: List SP (Giữ nguyên code cũ của bạn) */}
        <div className="lg:w-2/3 space-y-4">
          {cartItems.map((item) => (
            <div key={item._id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center gap-4 transition-all hover:shadow-md">
              <img src={item.image} alt={item.name} className="w-24 h-24 object-contain p-2 border rounded bg-gray-50" />
              
              <div className="flex-1">
                <Link to={`/product/${item._id}`} className="font-semibold text-gray-800 hover:text-blue-600 line-clamp-1">
                  {item.name}
                </Link>
                <p className="text-xs text-gray-500 mt-1">{item.specs?.cpu} | {item.specs?.ram}</p>
                <p className="text-blue-600 font-bold mt-1 text-lg">{formatCurrency(item.price)}</p>
              </div>

              <div className="flex items-center border rounded-lg bg-gray-50">
                <button onClick={() => updateQuantity(item._id, item.quantity - 1)} className="px-3 py-1 hover:bg-gray-200 text-gray-600 font-bold">-</button>
                <span className="px-3 py-1 font-medium bg-white min-w-[30px] text-center text-sm">{item.quantity}</span>
                <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className="px-3 py-1 hover:bg-gray-200 text-gray-600 font-bold">+</button>
              </div>

              <button onClick={() => removeFromCart(item._id)} className="text-gray-400 hover:text-red-500 p-2 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* Cột Phải: Tổng tiền & Thanh toán */}
        <div className="lg:w-1/3">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
            <h3 className="text-lg font-bold mb-4 border-b pb-2 text-gray-700">Tổng kết đơn hàng</h3>
            
            <div className="flex justify-between mb-3 text-sm">
              <span className="text-gray-600">Tạm tính:</span>
              <span className="font-medium">{formatCurrency(getTotalPrice())}</span>
            </div>
            <div className="flex justify-between mb-4 text-sm">
              <span className="text-gray-600">Phí vận chuyển:</span>
              <span className="text-green-600 font-medium">Miễn phí</span>
            </div>
            
            <div className="border-t pt-4 flex justify-between mb-6">
              <span className="text-base font-bold text-gray-800">Tổng cộng:</span>
              <span className="text-xl font-bold text-blue-600">{formatCurrency(getTotalPrice())}</span>
            </div>
            
            <button 
              onClick={handleCheckout} // Gắn hàm xử lý vào đây
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors uppercase shadow-md hover:shadow-lg active:scale-95 transform duration-200"
            >
              Tiến hành thanh toán
            </button>
            
            <p className="text-xs text-gray-400 text-center mt-4">
              Chấp nhận thanh toán COD (Tiền mặt khi nhận hàng)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;