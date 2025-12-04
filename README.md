# 💻 LaptopShop -- MERN Stack E-commerce

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/Node.js-v14+-green.svg)
![React](https://img.shields.io/badge/React-v18+-blue.svg)

**LaptopShop** là nền tảng thương mại điện tử chuyên kinh doanh Laptop,
được phát triển Fullstack với **MERN Stack**.\
Bao gồm đầy đủ tính năng cho **Khách hàng** và **Quản trị viên**, phù
hợp để sử dụng thực tế hoặc làm dự án học tập.

------------------------------------------------------------------------

## ✨ Tính năng nổi bật

### 🛒 **Phía Khách hàng (Frontend)**

-   **Mua sắm hiện đại**
    -   Trang chủ với slider & sản phẩm nổi bật.
    -   Tìm kiếm sản phẩm theo tên, lọc theo thương hiệu.
    -   Xem chi tiết sản phẩm + thông số + sản phẩm tương tự.
    -   Phân trang danh sách sản phẩm.
-   **Giỏ hàng & Thanh toán**
    -   Thêm / sửa / xóa sản phẩm trong giỏ (lưu LocalStorage).
    -   Checkout & xem lịch sử đơn hàng.
-   **Tài khoản người dùng**
    -   Đăng ký / đăng nhập (JWT).
    -   Cập nhật thông tin cá nhân, đổi mật khẩu.

### 🛠 **Phía Quản trị (Admin Dashboard)**

-   Dashboard tổng quan với biểu đồ doanh thu (Chart.js) & thống kê
    người dùng, đơn hàng.
-   Quản lý sản phẩm: thêm / sửa / xóa Laptop, upload ảnh, phân trang.
-   Quản lý đơn hàng: xem danh sách đơn, chi tiết đơn, cập nhật trạng
    thái (đã thanh toán, đã giao).
-   Quản lý người dùng: xem danh sách user, phân quyền Admin/User, xóa
    tài khoản vi phạm.

------------------------------------------------------------------------

## 🛠 Công nghệ sử dụng

### **Frontend**

-   React + Vite\
-   Tailwind CSS\
-   Zustand (state management)\
-   React Router v6\
-   Axios (với interceptors)\
-   Chart.js • React Slick • React Toastify • React Icons

### **Backend**

-   Node.js\
-   Express.js\
-   MongoDB + Mongoose ODM\
-   JWT + BcryptJS (xác thực)\
-   Multer (upload ảnh)

------------------------------------------------------------------------

## 🚀 Cài đặt & Chạy dự án

### **Yêu cầu**

-   Node.js v14+\
-   MongoDB (Local hoặc Atlas)

------------------------------------------------------------------------

## 📌 1. Clone dự án

``` bash
git clone https://github.com/username/laptopshop.git
cd laptopshop
```

------------------------------------------------------------------------

## 📌 2. Cài đặt Backend

``` bash
cd backend
npm install
```

Tạo file `.env` tại thư mục `backend/`:

    PORT=5000
    MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/laptopshop
    JWT_SECRET=your_secret_key

Khởi động backend:

``` bash
npm run dev
```

------------------------------------------------------------------------

## 📌 3. Cài đặt Frontend

``` bash
cd frontend
npm install
npm run dev
```

------------------------------------------------------------------------

## 📌 4. Nạp dữ liệu mẫu (Seeder)

``` bash
cd backend
node seeder.js
```

------------------------------------------------------------------------

## 📚 Cấu trúc thư mục chính

    laptopshop/
    ├── frontend/         # React + Vite frontend
    │   ├── src/
    │   ├── public/
    │   └── ...
    ├── backend/          # Node.js + Express backend
    │   ├── controllers/
    │   ├── models/
    │   ├── routes/
    │   ├── middleware/
    │   ├── seeder.js
    │   └── ...
    └── README.md

------------------------------------------------------------------------

## 📄 License

Dự án được phát hành dưới giấy phép **MIT License**.

## 👤 Tác Giả

Dự án được thực hiện bởi:

- **[Nguyễn Quang Vũ]** - *Fullstack*
- 🐙 GitHub: [nguyenVu204](https://github.com/nguyenVu204)
- 📧 Email: [nguyenquangvu25112004@gmail.com]
