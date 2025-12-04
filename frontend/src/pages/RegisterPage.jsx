import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Import Toast
import { FaUser, FaEnvelope, FaLock, FaUserPlus } from 'react-icons/fa'; // Import Icons
import useAuthStore from '../store/useAuthStore';


const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();
  const { register, isLoading, userInfo } = useAuthStore();

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [userInfo, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Validate cơ bản
    if (!name || !email || !password || !confirmPassword) {
      return toast.warning('Vui lòng điền đầy đủ thông tin!');
    }

    // 2. Kiểm tra mật khẩu khớp nhau
    if (password !== confirmPassword) {
      return toast.error('Mật khẩu xác nhận không khớp!');
    }

    // 3. Gọi hàm đăng ký
    const success = await register(name, email, password);
    if (success) {
      toast.success('Đăng ký tài khoản thành công!');
      navigate('/'); 
    } else {
      toast.error('Đăng ký thất bại. Email có thể đã tồn tại!');
    }
  };

  return (
    <div className="min-h-[90vh] flex justify-center items-center bg-gray-50 px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 transform transition-all hover:shadow-2xl">
        
        {/* Header Form */}
        <div className="bg-green-600 p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-2">Tạo Tài Khoản</h2>
            <p className="text-green-100 text-sm">Trở thành thành viên của LaptopShop ngay hôm nay</p>
        </div>

        {/* Body Form */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Input Name */}
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2 ml-1">Họ và Tên</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-gray-400" />
                </div>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="Nguyễn Văn A"
                  required
                />
              </div>
            </div>

            {/* Input Email */}
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2 ml-1">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            {/* Input Password */}
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2 ml-1">Mật khẩu</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Input Confirm Password */}
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2 ml-1">Xác nhận mật khẩu</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input 
                  type="password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="Nhập lại mật khẩu"
                  required
                />
              </div>
            </div>

            {/* Button Submit */}
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex justify-center items-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed mt-6"
            >
              {isLoading ? (
                <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Đang tạo tài khoản...
                </>
              ) : (
                <>
                    <FaUserPlus /> Đăng Ký
                </>
              )}
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm">
              Đã có tài khoản?{' '}
              <Link to="/login" className="text-green-600 font-bold hover:text-green-800 hover:underline transition-colors">
                Đăng nhập ngay
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;