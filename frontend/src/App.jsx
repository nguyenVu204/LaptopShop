import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';

// Pages
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductListPage from './pages/admin/ProductListPage';
import ProductEditPage from './pages/admin/ProductEditPage';
import DashboardPage from './pages/admin/DashboardPage';
import OrderListPage from './pages/admin/OrderListPage';
import OrderDetailsPage from './pages/admin/OrderDetailsPage';
import UserListPage from './pages/admin/UserListPage';
import UserEditPage from './pages/admin/UserEditPage';
import ProfilePage from './pages/ProfilePage';
import ProductPage from './pages/ProductPage';
import AboutPage from './pages/AboutPage';   

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES (Áp dụng Header + Footer) */}
        <Route path="/" element={<PublicLayout />}>
           <Route index element={<HomePage />} />
           <Route path="product/:id" element={<ProductDetailPage />} />
           <Route path="cart" element={<CartPage />} />
           <Route path="login" element={<LoginPage />} />
           <Route path="register" element={<RegisterPage />} />
           <Route path="profile" element={<ProfilePage />} />
           <Route path="products" element={<ProductPage />} /> 
           <Route path="about" element={<AboutPage />} />
        </Route>

        {/* ADMIN ROUTES (Áp dụng Sidebar) */}
        <Route path="/admin" element={<AdminLayout />}>
           <Route index element={<DashboardPage />} /> 
           <Route path="dashboard" element={<DashboardPage />} />
           <Route path="productlist" element={<ProductListPage />} />
           <Route path="product/:id/edit" element={<ProductEditPage />} />
           <Route path="orderlist" element={<OrderListPage />} />
           <Route path="order/:id" element={<OrderDetailsPage />} />
           <Route path="userlist" element={<UserListPage />} />
           <Route path="user/:id/edit" element={<UserEditPage />} />
        </Route>
      </Routes>

      <ToastContainer position="bottom-right" autoClose={3000} />
    </BrowserRouter>
  );
}

export default App;