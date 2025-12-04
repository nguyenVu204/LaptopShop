import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useOrderStore from "../../store/useOrderStore";
import useAuthStore from "../../store/useAuthStore";
import { formatCurrency } from "../../utils/format";
import { FaTimes } from "react-icons/fa";
import Pagination from "../../components/Pagination";
import { useState } from "react";

const OrderListPage = () => {
  const { orders, page, pages, isLoading, error, fetchOrders } =
    useOrderStore();
  const { userInfo } = useAuthStore();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      fetchOrders(currentPage);
    } else {
      navigate("/login");
    }
  }, [userInfo, fetchOrders, navigate, currentPage]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Quản lý Đơn hàng
      </h1>

      {isLoading ? (
        <div className="text-center">Đang tải...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="min-w-full text-left border-collapse">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="p-4 text-sm font-semibold text-gray-600">
                    ID Đơn
                  </th>
                  <th className="p-4 text-sm font-semibold text-gray-600">
                    Khách Hàng
                  </th>
                  <th className="p-4 text-sm font-semibold text-gray-600">
                    Ngày Đặt
                  </th>
                  <th className="p-4 text-sm font-semibold text-gray-600">
                    Tổng Tiền
                  </th>
                  <th className="p-4 text-sm font-semibold text-gray-600">
                    Thanh Toán
                  </th>
                  <th className="p-4 text-sm font-semibold text-gray-600">
                    Giao Hàng
                  </th>
                  <th className="p-4 text-sm font-semibold text-gray-600">
                    Chi Tiết
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="p-4 text-xs font-mono text-gray-500">
                      {order._id}
                    </td>
                    <td className="p-4 font-medium">
                      {order.user?.name || "Khách vãng lai"}
                    </td>
                    <td className="p-4 text-sm text-gray-500">
                      {order.createdAt?.substring(0, 10)}
                    </td>
                    <td className="p-4 font-bold text-blue-600">
                      {formatCurrency(order.totalPrice)}
                    </td>
                    <td className="p-4">
                      {order.isPaid ? (
                        <span className="text-green-600 text-xs font-bold bg-green-100 px-2 py-1 rounded">
                          Đã thanh toán
                        </span>
                      ) : (
                        <span className="text-red-600 text-xs font-bold bg-red-100 px-2 py-1 rounded flex items-center gap-1 w-fit">
                          <FaTimes /> Chưa
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      {order.isDelivered ? (
                        <span className="text-green-600 text-xs font-bold bg-green-100 px-2 py-1 rounded">
                          Đã giao
                        </span>
                      ) : (
                        <span className="text-yellow-600 text-xs font-bold bg-yellow-100 px-2 py-1 rounded">
                          Đang xử lý
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      <Link
                        to={`/admin/order/${order._id}`}
                        className="text-blue-600 hover:underline text-sm font-medium"
                      >
                        Xem chi tiết
                      </Link>
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

export default OrderListPage;
