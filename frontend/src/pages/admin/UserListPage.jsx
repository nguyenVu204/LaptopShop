import React, { useEffect, useState } from "react";
import { FaTrash, FaCheck, FaTimes, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import useUserStore from "../../store/useUserStore";
import useAuthStore from "../../store/useAuthStore";
import Pagination from "../../components/Pagination";

const UserListPage = () => {
  const { users, page, pages, getUsers, deleteUser, isLoading } =
    useUserStore();
  const { userInfo } = useAuthStore();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getUsers(currentPage);
  }, [getUsers, currentPage]);

  const handleDelete = (id) => {
    if (
      window.confirm(
        "Bạn chắc chắn muốn xóa người dùng này? Hành động này không thể hoàn tác!"
      )
    ) {
      deleteUser(id);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Quản lý Người dùng ({users.length})
      </h1>

      {isLoading ? (
        <div className="text-center">Đang tải...</div>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full text-left border-collapse">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="p-4 text-sm font-semibold text-gray-600">
                    ID
                  </th>
                  <th className="p-4 text-sm font-semibold text-gray-600">
                    Tên
                  </th>
                  <th className="p-4 text-sm font-semibold text-gray-600">
                    Email
                  </th>
                  <th className="p-4 text-sm font-semibold text-gray-600 text-center">
                    Admin
                  </th>
                  <th className="p-4 text-sm font-semibold text-gray-600 text-center">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="p-4 text-xs font-mono text-gray-500">
                      {user._id}
                    </td>
                    <td className="p-4 font-medium text-gray-800">
                      {user.name}
                    </td>
                    <td className="p-4 text-gray-600">
                      <a
                        href={`mailto:${user.email}`}
                        className="hover:text-blue-600"
                      >
                        {user.email}
                      </a>
                    </td>
                    <td className="p-4 text-center">
                      {user.isAdmin ? (
                        <FaCheck className="text-green-500 mx-auto" />
                      ) : (
                        <FaTimes className="text-red-400 mx-auto" />
                      )}
                    </td>
                    <td className="p-4 text-center flex justify-center gap-2">
                      {/* Nút Sửa */}
                      <Link to={`/admin/user/${user._id}/edit`}>
                        <button className="bg-yellow-100 text-yellow-600 p-2 rounded hover:bg-yellow-500 hover:text-white transition-colors">
                          <FaEdit />
                        </button>
                      </Link>
                      {/*xóa*/}
                      {user._id !== userInfo._id && (
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="bg-red-100 text-red-600 p-2 rounded hover:bg-red-600 hover:text-white transition-colors"
                          title="Xóa người dùng"
                        >
                          <FaTrash />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4">
            <Pagination page={page} pages={pages} changePage={setCurrentPage} />
          </div>
        </>
      )}
    </div>
  );
};

export default UserListPage;
