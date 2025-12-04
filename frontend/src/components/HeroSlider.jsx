import React from 'react';
import Slider from 'react-slick';

const HeroSlider = () => {
  // Cấu hình cho Slider
  const settings = {
    dots: true,            // Hiển thị dấu chấm tròn dưới cùng
    infinite: true,        // Chạy vòng lặp vô tận
    speed: 500,            // Tốc độ chuyển slide (ms)
    slidesToShow: 1,       // Hiện 1 slide mỗi lần
    slidesToScroll: 1,     // Trượt 1 slide mỗi lần
    autoplay: true,        // Tự động chạy
    autoplaySpeed: 3000,   // 3 giây đổi 1 lần
    arrows: false,         // Ẩn nút mũi tên 2 bên cho gọn (hoặc để true nếu thích)
  };

  // Dữ liệu banner mẫu
  const banners = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2000&auto=format&fit=crop',
      title: 'MacBook Pro M2 - Sức mạnh vượt trội',
      subtitle: 'Giảm ngay 2.000.000đ khi thanh toán qua thẻ tín dụng'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=2000&auto=format&fit=crop',
      title: 'Gaming Laptop Festival',
      subtitle: 'Chiến game đỉnh cao - Nhận quà cực chất'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2000&auto=format&fit=crop',
      title: 'Back to School 2024',
      subtitle: 'Laptop sinh viên giá chỉ từ 10 triệu đồng'
    }
  ];

  return (
    <div className="w-full mb-8 overflow-hidden rounded-xl shadow-lg">
      <Slider {...settings}>
        {banners.map((banner) => (
          <div key={banner.id} className="relative outline-none">
            {/* Ảnh nền */}
            <div className="h-[300px] md:h-[400px] w-full">
               <img 
                 src={banner.image} 
                 alt={banner.title} 
                 className="w-full h-full object-cover"
               />
            </div>
            
            {/* Lớp phủ đen mờ để chữ dễ đọc hơn */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex flex-col justify-center px-8 md:px-16 text-white">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 animate-fade-in-up">
                {banner.title}
              </h2>
              <p className="text-lg md:text-xl text-gray-200 mb-6">
                {banner.subtitle}
              </p>
              <button className="w-fit bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition-all transform hover:scale-105">
                Xem Ngay
              </button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroSlider;