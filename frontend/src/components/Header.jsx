import React from "react";
import { Link } from "react-router-dom";
import useCartStore from "../store/useCartStore";
import useAuthStore from "../store/useAuthStore"; // 1. Import Auth Store

const Header = () => {
  const cartItems = useCartStore((state) => state.cartItems);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // 2. Lấy userInfo và logout
  const { userInfo, logout } = useAuthStore();

  const handleLogout = () => {
    logout(); // Xóa token
    toast.info('Đã đăng xuất thành công');
    navigate('/login');
  };

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          LaptopShop
        </Link>

        <div className="flex items-center gap-6">

          <Link
            to="about"
            className="text-gray-600 hover:text-blue-600 font-medium"
          >
            Thông tin
          </Link>

          <Link
            to="/products"
            className="text-gray-600 hover:text-blue-600 font-medium"
          >
            Sản phẩm
          </Link>

          <Link to="/cart" className="relative group">
            {/* ... (icon giỏ hàng giữ nguyên) ... */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 text-gray-600 group-hover:text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

          {/* 3. Logic hiển thị User */}
          {userInfo ? (
            <div className="relative group cursor-pointer">
              <span className="font-bold text-gray-700 flex items-center gap-1">
                Hi, {userInfo.name}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>

              {/* Dropdown đơn giản */}
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right">
                {userInfo.isAdmin && (
                  <Link
                    to="/admin"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>
                )}
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Hồ sơ của tôi
                </Link>
                <button 
                  onClick={handleLogout} // Gọi hàm handleLogout
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Đăng xuất
                </button>
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg font-medium text-sm transition-colors"
            >
              Đăng nhập
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
