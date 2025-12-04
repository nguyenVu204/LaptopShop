import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaChartLine, FaBox, FaClipboardList, FaUsers, FaSignOutAlt, FaUser } from 'react-icons/fa';
import useAuthStore from '../../store/useAuthStore';

const AdminSidebar = () => {
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    toast.info('Hẹn gặp lại Admin!');
    navigate('/login');
  };

  const menuItems = [
    { path: '/admin/dashboard', name: 'Dashboard', icon: <FaChartLine /> },
    { path: '/admin/productlist', name: 'Sản phẩm', icon: <FaBox /> },
    { path: '/admin/orderlist', name: 'Đơn hàng', icon: <FaClipboardList /> },
    { path: '/admin/userlist', name: 'Khách hàng', icon: <FaUsers /> },
    { path: '/profile', name: 'Hồ sơ cá nhân', icon: <FaUser /> },       
  ];

  return (
    <div className="bg-gray-900 text-white w-64 min-h-screen flex flex-col transition-all duration-300">
      {/* Logo Area */}
      <div className="h-16 flex items-center justify-center border-b border-gray-800">
        <span className="text-xl font-bold tracking-wider text-blue-400">ADMIN PANEL</span>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 px-2 py-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            <span className="font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer / Logout */}
      <div className="p-4 border-t border-gray-800">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 text-gray-400 hover:text-red-400 transition-colors w-full px-4 py-2"
        >
          <FaSignOutAlt />
          <span>Đăng xuất</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;