import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useProductStore from '../store/useProductStore';
import ProductCard from '../components/ProductCard';
import HeroSlider from '../components/HeroSlider';
import { FaShippingFast, FaHeadset, FaUndo, FaShieldAlt, FaArrowRight } from 'react-icons/fa';

const HomePage = () => {
  const { products, isLoading, error, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Chỉ lấy 8 sản phẩm đầu tiên làm "Nổi bật"
  const featuredProducts = products.slice(0, 8);

  return (
    <div className="bg-gray-50 min-h-screen">
      
      {/* 1. HERO SLIDER (Giữ trong container để căn giữa) */}
      <div className="container py-6">
        <HeroSlider />
      </div>

      {/* 2. DỊCH VỤ (Service Section) */}
      <section className="container mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ServiceCard 
            icon={<FaShippingFast className="text-3xl text-blue-600" />}
            title="Miễn phí vận chuyển"
            desc="Cho đơn hàng từ 5 triệu"
          />
          <ServiceCard 
            icon={<FaHeadset className="text-3xl text-blue-600" />}
            title="Hỗ trợ 24/7"
            desc="Kỹ thuật viên trực online"
          />
          <ServiceCard 
            icon={<FaUndo className="text-3xl text-blue-600" />}
            title="Đổi trả trong 30 ngày"
            desc="Nếu có lỗi từ nhà sản xuất"
          />
          <ServiceCard 
            icon={<FaShieldAlt className="text-3xl text-blue-600" />}
            title="Thanh toán an toàn"
            desc="Bảo mật chuẩn quốc tế"
          />
        </div>
      </section>

      {/* 3. SẢN PHẨM NỔI BẬT */}
      <section className="container mb-16">
        <div className="flex justify-between items-end mb-8 border-b border-gray-200 pb-4">
          <div>
            <span className="text-blue-600 font-bold uppercase tracking-wider text-sm">Sự lựa chọn hàng đầu</span>
            <h2 className="text-3xl font-bold text-gray-800 mt-1">Sản Phẩm Nổi Bật</h2>
          </div>
          <Link to="/products" className="group flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors font-medium">
            Xem tất cả sản phẩm 
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* 4. BANNER QUẢNG CÁO (Promo Section) */}
      <section className="bg-gray-900 text-white py-16 mb-16">
        <div className="container flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 space-y-6">
            <span className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-bold uppercase">Khuyến mãi đặc biệt</span>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Nâng cấp trải nghiệm <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">Gaming Gear</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Giảm giá lên đến 30% cho các dòng Laptop Gaming MSI và Asus ROG. Tặng kèm chuột và balo gaming cao cấp.
            </p>
            <div className="flex gap-4">
               <Link to="/products?category=MSI" className="bg-white text-gray-900 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition shadow-lg">
                 Mua MSI Ngay
               </Link>
               <Link to="/products?category=Asus" className="border border-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-gray-900 transition">
                 Xem Asus ROG
               </Link>
            </div>
          </div>
          <div className="md:w-1/2 relative">
             {/* Hiệu ứng bóng mờ sau ảnh */}
             <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-20 rounded-full"></div>
             <img 
               src="https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=800&auto=format&fit=crop" 
               alt="Gaming Laptop" 
               className="relative z-10 rounded-xl shadow-2xl transform rotate-3 hover:rotate-0 transition duration-500 border-2 border-gray-700"
             />
          </div>
        </div>
      </section>

      {/* 5. TIN TỨC CÔNG NGHỆ (Blog Section - Fake Data) */}
      <section className="container mb-20">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Tin Tức Công Nghệ</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <BlogCard 
            image="https://images.unsplash.com/photo-1661961110671-77b71b929d52?q=80&w=800&auto=format&fit=crop"
            title="MacBook Air M3 sắp ra mắt?"
            date="12 Tháng 12, 2024"
            desc="Những tin đồn mới nhất về dòng chip M3 của Apple đang làm xôn xao cộng đồng công nghệ..."
          />
          <BlogCard 
            image="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop"
            title="Top 5 Laptop cho sinh viên IT"
            date="10 Tháng 12, 2024"
            desc="Lựa chọn laptop nào để vừa code mượt, vừa bền bỉ mà giá lại hợp lý? Xem ngay top 5..."
          />
          <BlogCard 
            image="https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=800&auto=format&fit=crop"
            title="Cách vệ sinh Laptop đúng cách"
            date="08 Tháng 12, 2024"
            desc="Hướng dẫn chi tiết cách vệ sinh màn hình và bàn phím để máy luôn như mới..."
          />
        </div>
      </section>

      {/* 6. NEWSLETTER (Đăng ký nhận tin) */}
      <section className="bg-blue-600 py-16">
        <div className="container text-center text-white">
           <h2 className="text-3xl font-bold mb-4">Đăng ký nhận thông tin khuyến mãi</h2>
           <p className="mb-8 opacity-90">Nhận ngay voucher 200k cho đơn hàng đầu tiên khi đăng ký thành viên.</p>
           <div className="max-w-lg mx-auto flex gap-2 bg-white p-1 rounded-full shadow-xl">
              <input 
                type="email" 
                placeholder="Nhập email của bạn..." 
                className="flex-1 px-6 py-3 rounded-full text-gray-700 focus:outline-none"
              />
              <button className="bg-gray-900 text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition">
                Đăng ký
              </button>
           </div>
        </div>
      </section>

    </div>
  );
};

// Component con: Thẻ Dịch vụ
const ServiceCard = ({ icon, title, desc }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition">
    <div className="bg-blue-50 p-3 rounded-lg">
      {icon}
    </div>
    <div>
      <h3 className="font-bold text-gray-800">{title}</h3>
      <p className="text-sm text-gray-500">{desc}</p>
    </div>
  </div>
);

// Component con: Thẻ Tin tức
const BlogCard = ({ image, title, date, desc }) => (
  <div className="bg-white rounded-xl shadow-sm overflow-hidden group hover:shadow-lg transition">
    <div className="overflow-hidden h-48">
       <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
    </div>
    <div className="p-6">
      <p className="text-xs text-blue-600 font-bold mb-2 uppercase">{date}</p>
      <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition">{title}</h3>
      <p className="text-gray-600 text-sm line-clamp-2">{desc}</p>
      <button className="mt-4 text-sm font-medium text-gray-900 hover:text-blue-600 flex items-center gap-1">
        Đọc tiếp <FaArrowRight size={12} />
      </button>
    </div>
  </div>
);

export default HomePage;