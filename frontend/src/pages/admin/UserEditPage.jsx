import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useUserStore from '../../store/useUserStore';

const UserEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getUserDetails, updateUser, userDetails, isLoading } = useUserStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Nếu chưa có data hoặc ID khác với data hiện tại -> Fetch mới
    if (!userDetails || userDetails._id !== id) {
      getUserDetails(id);
    } else {
      // Đổ data vào form
      setName(userDetails.name);
      setEmail(userDetails.email);
      setIsAdmin(userDetails.isAdmin);
    }
  }, [userDetails, id, getUserDetails]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const success = await updateUser({ _id: id, name, email, isAdmin });
    if (success) {
      navigate('/admin/userlist');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/admin/userlist" className="text-gray-600 hover:text-blue-600 mb-4 inline-block">
        &larr; Quay lại danh sách
      </Link>

      <div className="flex justify-center">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md border border-gray-100">
          <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Chỉnh sửa User</h1>
          
          {isLoading ? <div className="text-center">Đang tải...</div> : (
            <form onSubmit={submitHandler} className="space-y-4">
              
              {/* Tên */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Tên hiển thị</label>
                <input
                  type="text"
                  placeholder="Nhập tên"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 border rounded focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                <input
                  type="email"
                  placeholder="Nhập email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border rounded focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Checkbox Admin */}
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded border">
                <input
                  type="checkbox"
                  id="isAdmin"
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                  className="h-5 w-5 text-blue-600 rounded cursor-pointer"
                />
                <label htmlFor="isAdmin" className="text-gray-700 font-medium cursor-pointer">
                  Là Admin?
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-bold py-3 rounded hover:bg-blue-700 transition"
              >
                Cập nhật
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserEditPage;