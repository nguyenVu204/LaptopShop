import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Import Toast
import { FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa'; // Import Icons
import useAuthStore from '../store/useAuthStore';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();
  const { login, isLoading, userInfo } = useAuthStore();

  useEffect(() => {
    if (userInfo) {
      if (userInfo.isAdmin) {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    }
  }, [userInfo, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.warning('Vui lòng nhập đầy đủ thông tin!');
    }

    const success = await login(email, password);
    
    if (success) {
      const currentUser = useAuthStore.getState().userInfo;

      toast.success(`Chào mừng trở lại, ${currentUser?.name}!`);
      
      if (currentUser?.isAdmin) {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    } else {
      toast.error('Đăng nhập thất bại. Vui lòng kiểm tra lại!');
    }
  };

  return (
    <div className="min-h-[80vh] flex justify-center items-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 transform transition-all hover:shadow-2xl">
        
        {/* Header Form */}
        <div className="bg-blue-600 p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-2">Đăng Nhập</h2>
            <p className="text-blue-100 text-sm">Chào mừng bạn quay trở lại LaptopShop</p>
        </div>

        {/* Body Form */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
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
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Button Submit */}
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex justify-center items-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Đang xử lý...
                </>
              ) : (
                <>
                    <FaSignInAlt /> Đăng Nhập
                </>
              )}
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm">
              Chưa có tài khoản?{' '}
              <Link to="/register" className="text-blue-600 font-bold hover:text-blue-800 hover:underline transition-colors">
                Tạo tài khoản mới
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;