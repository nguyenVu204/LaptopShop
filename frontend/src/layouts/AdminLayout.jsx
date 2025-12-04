import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AdminSidebar from '../components/admin/AdminSidebar';
import useAuthStore from '../store/useAuthStore';

const AdminLayout = () => {
  const { userInfo } = useAuthStore();
  const navigate = useNavigate();

  // Bảo vệ lớp ngoài cùng: Nếu không phải Admin thì đá về Home
  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/');
    }
  }, [userInfo, navigate]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Cột trái: Sidebar cố định */}
      <AdminSidebar />

      {/* Cột phải: Nội dung thay đổi (Dynamic Content) */}
      <div className="flex-1 flex flex-col">
        {/* Header nhỏ của Admin (Optional) */}
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-8">
            <h2 className="font-semibold text-gray-700">Xin chào, {userInfo?.name}</h2>
            
        </header>

        {/* Nội dung trang con sẽ hiển thị ở đây */}
        <main className="p-6 overflow-y-auto h-[calc(100vh-64px)]">
           <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;