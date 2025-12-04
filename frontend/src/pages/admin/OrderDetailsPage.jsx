import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useOrderStore from "../../store/useOrderStore";
import useAuthStore from "../../store/useAuthStore"; // Để check quyền Admin
import { formatCurrency } from "../../utils/format";

const OrderDetailsPage = () => {
  const { id } = useParams();
  const {
    orderDetails,
    isLoading,
    error,
    getOrderDetails,
    deliverOrder,
    payOrder,
  } = useOrderStore();
  const { userInfo } = useAuthStore();

  useEffect(() => {
    getOrderDetails(id);
  }, [id, getOrderDetails]);

  const deliverHandler = async () => {
    if (window.confirm("Xác nhận đã giao đơn hàng này?")) {
      const success = await deliverOrder(orderDetails._id);
      if (success) toast.success("Đã cập nhật trạng thái giao hàng!");
    }
  };

  const payHandler = async () => {
    if (window.confirm("Xác nhận khách đã thanh toán?")) {
      const success = await payOrder(orderDetails._id);
      if (success) toast.success("Đã cập nhật trạng thái thanh toán!");
    }
  };

  if (isLoading) return <div className="text-center py-10">Đang tải...</div>;
  if (error) return <div className="text-red-500 py-10">{error}</div>;
  if (!orderDetails) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Chi tiết đơn hàng: {orderDetails._id}
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* CỘT TRÁI: THÔNG TIN */}
        <div className="lg:w-2/3 space-y-6">
          {/* Thông tin Giao hàng */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">
              Giao Hàng
            </h2>
            <p className="mb-2">
              <strong className="text-gray-600">Tên:</strong>{" "}
              {orderDetails.user?.name}
            </p>
            <p className="mb-2">
              <strong className="text-gray-600">Email:</strong>{" "}
              <a
                href={`mailto:${orderDetails.user?.email}`}
                className="text-blue-600"
              >
                {orderDetails.user?.email}
              </a>
            </p>
            <p className="mb-4">
              <strong className="text-gray-600">Địa chỉ:</strong>{" "}
              {orderDetails.shippingAddress?.address}
            </p>

            {orderDetails.isDelivered ? (
              <div className="bg-green-100 text-green-700 p-3 rounded font-medium">
                Đã giao hàng vào lúc:{" "}
                {orderDetails.deliveredAt?.substring(0, 10)}
              </div>
            ) : (
              <div className="bg-yellow-100 text-yellow-700 p-3 rounded font-medium">
                Chưa giao hàng
              </div>
            )}
          </div>

          {/* Phương thức thanh toán */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">
              Thanh Toán
            </h2>
            <p className="mb-4">
              <strong className="text-gray-600">Phương thức:</strong>{" "}
              {orderDetails.paymentMethod}
            </p>
            {orderDetails.isPaid ? (
              <div className="bg-green-100 text-green-700 p-3 rounded font-medium">
                Đã thanh toán vào lúc: {orderDetails.paidAt?.substring(0, 10)}
              </div>
            ) : (
              <div className="bg-red-100 text-red-700 p-3 rounded font-medium">
                Chưa thanh toán
              </div>
            )}
          </div>

          {/* Danh sách sản phẩm */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">
              Sản Phẩm Đặt Mua
            </h2>
            <div className="space-y-4">
              {orderDetails.orderItems?.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 border-b pb-4 last:border-0 last:pb-0"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-contain rounded border"
                  />
                  <div className="flex-1">
                    <Link
                      to={`/product/${item.product}`}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      {item.name}
                    </Link>
                  </div>
                  <div className="text-gray-600">
                    {item.quantity} x {formatCurrency(item.price)} ={" "}
                    <strong>
                      {formatCurrency(item.quantity * item.price)}
                    </strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CỘT PHẢI: TỔNG KẾT & HÀNH ĐỘNG */}
        <div className="lg:w-1/3">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky top-24">
            <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">
              Tổng Kết Đơn
            </h2>

            <div className="flex justify-between mb-2">
              <span>Tiền hàng:</span>
              <span>{formatCurrency(orderDetails.itemsPrice)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Phí vận chuyển:</span>
              <span>{formatCurrency(orderDetails.shippingPrice)}</span>
            </div>
            <div className="flex justify-between mb-6 text-xl font-bold text-gray-800 border-t pt-2">
              <span>Tổng cộng:</span>
              <span>{formatCurrency(orderDetails.totalPrice)}</span>
            </div>

            <div className="flex flex-col gap-3 mt-6">
                
                {/* Nút Admin: Xác nhận Thanh Toán */}
                {userInfo?.isAdmin && !orderDetails.isPaid && (
                  <button 
                    onClick={payHandler}
                    className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition font-bold uppercase shadow-lg"
                  >
                    Xác nhận đã thanh toán
                  </button>
                )}

                {/* Nút Admin: Xác nhận Giao Hàng */}
                {userInfo?.isAdmin && !orderDetails.isDelivered && (
                  <button 
                    onClick={deliverHandler}
                    className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition font-bold uppercase shadow-lg"
                  >
                    Xác nhận đã giao hàng
                  </button>
                )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
