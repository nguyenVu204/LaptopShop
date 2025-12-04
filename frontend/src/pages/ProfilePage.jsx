import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import useAuthStore from '../store/useAuthStore';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

const ProfilePage = () => {
  const { userInfo, updateProfile, isLoading } = useAuthStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Đổ dữ liệu có sẵn vào form
  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate mật khẩu
    if (password && password !== confirmPassword) {
      toast.error('Mật khẩu xác nhận không khớp!');
      return;
    }

    // Gọi hàm update
    const success = await updateProfile({ 
        id: userInfo._id, 
        name, 
        email, 
        password
    });

    if (success) {
      toast.success('Cập nhật hồ sơ thành công!');
      setPassword(''); // Reset ô mật khẩu
      setConfirmPassword('');
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
        
        <div className="bg-blue-600 p-6 text-center text-white">
            <h1 className="text-2xl font-bold">Hồ sơ của tôi</h1>
            <p className="opacity-90 mt-1">Quản lý thông tin cá nhân và bảo mật</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Tên */}
            <div>
                <label className="block text-gray-700 font-semibold mb-2">Tên hiển thị</label>
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400"><FaUser /></span>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>
            </div>

            {/* Email */}
            <div>
                <label className="block text-gray-700 font-semibold mb-2">Email</label>
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400"><FaEnvelope /></span>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>
            </div>

            <div className="border-t pt-4 mt-4">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Đổi mật khẩu (Bỏ trống nếu không đổi)</h3>
                
                {/* Password */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Mật khẩu mới</label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400"><FaLock /></span>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Nhập mật khẩu mới..."
                            className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                </div>

                {/* Confirm Password */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">Xác nhận mật khẩu</label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400"><FaLock /></span>
                        <input 
                            type="password" 
                            value={confirmPassword} 
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Nhập lại mật khẩu mới..."
                            className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                </div>
            </div>

            <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow transition-all transform active:scale-95"
            >
                {isLoading ? 'Đang cập nhật...' : 'Lưu thay đổi'}
            </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;