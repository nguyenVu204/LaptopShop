import React, { useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import useOrderStore from "../../store/useOrderStore";
import { formatCurrency } from "../../utils/format";

// Đăng ký các thành phần của Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DashboardPage = () => {
  const { stats, getStats, isLoading } = useOrderStore();

  useEffect(() => {
    getStats();
  }, [getStats]);

  if (isLoading)
    return <div className="p-8 text-center">Đang tải dữ liệu báo cáo...</div>;
  if (!stats) return null;

  // Cấu hình dữ liệu cho Biểu đồ
  // Tạo mảng 12 tháng mặc định doanh thu = 0
  const monthlyData = Array(12).fill(0);

  // Đổ dữ liệu thật vào (MongoDB trả về _id là số tháng 1-12)
  stats.monthlyRevenue.forEach((item) => {
    monthlyData[item._id - 1] = item.total;
  });

  const chartData = {
    labels: [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ],
    datasets: [
      {
        label: "Doanh thu (VNĐ)",
        data: monthlyData,
        backgroundColor: "rgba(59, 130, 246, 0.5)", // Màu xanh blue-500
        borderColor: "rgb(59, 130, 246)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Biểu đồ doanh thu theo tháng" },
    },
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Tổng quan báo cáo
      </h1>

      {/* 4 Cards thống kê */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Tổng doanh thu"
          value={formatCurrency(stats.totalRevenue)}
          color="bg-blue-500"
          icon="💰"
        />
        <StatCard
          title="Đơn hàng"
          value={stats.totalOrders}
          color="bg-green-500"
          icon="📦"
        />
        <StatCard
          title="Sản phẩm"
          value={stats.totalProducts}
          color="bg-yellow-500"
          icon="💻"
        />
        <StatCard
          title="Khách hàng"
          value={stats.totalUsers}
          color="bg-purple-500"
          icon="👥"
        />
      </div>

      {/* Biểu đồ */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <Bar options={chartOptions} data={chartData} />
      </div>
    </div>
  );
};

const StatCard = ({ title, value, color, icon }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between">
    <div>
      <p className="text-gray-500 text-sm mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
    </div>
    <div
      className={`h-12 w-12 rounded-full flex items-center justify-center text-white text-xl ${color}`}
    >
      {icon}
    </div>
  </div>
);

export default DashboardPage;
