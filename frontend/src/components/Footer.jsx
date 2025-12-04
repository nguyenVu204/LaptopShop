import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaYoutube, FaTwitter, FaInstagram, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 border-t border-gray-800 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Cột 1: Giới thiệu */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4 tracking-wide">LaptopShop</h3>
            <p className="text-sm leading-relaxed mb-6 text-gray-400">
              Hệ thống bán lẻ Laptop uy tín hàng đầu Việt Nam. Cam kết hàng chính hãng 100%, bảo hành dài hạn và dịch vụ hậu mãi tận tâm.
            </p>
            <div className="flex gap-4">
              <SocialLink icon={<FaFacebookF />} href="#" />
              <SocialLink icon={<FaYoutube />} href="#" />
              <SocialLink icon={<FaTwitter />} href="#" />
              <SocialLink icon={<FaInstagram />} href="#" />
            </div>
          </div>

          {/* Cột 2: Liên kết nhanh */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Liên Kết Nhanh</h3>
            <ul className="space-y-2 text-sm">
              <FooterLink to="/" text="Trang chủ" />
              <FooterLink to="/products" text="Sản phẩm" />
              <FooterLink to="/about" text="Về chúng tôi" />
              <FooterLink to="/contact" text="Liên hệ" />
            </ul>
          </div>

          {/* Cột 3: Chính sách */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Chính Sách</h3>
            <ul className="space-y-2 text-sm">
              <FooterLink to="/policy/warranty" text="Chính sách bảo hành" />
              <FooterLink to="/policy/shipping" text="Chính sách vận chuyển" />
              <FooterLink to="/policy/return" text="Chính sách đổi trả" />
              <FooterLink to="/policy/security" text="Bảo mật thông tin" />
            </ul>
          </div>

          {/* Cột 4: Liên hệ */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Thông Tin Liên Hệ</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-blue-500 mt-1 flex-shrink-0" />
                <span>123 Đường ABC, Quận 1, TP. Hồ Chí Minh</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="text-blue-500 flex-shrink-0" />
                <span>1800 6688 (Miễn phí)</span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-blue-500 flex-shrink-0" />
                <span>hotro@laptopshop.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 mt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} LaptopShop Project. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Component con nhỏ để tái sử dụng
const SocialLink = ({ icon, href }) => (
  <a 
    href={href} 
    className="h-8 w-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
  >
    {icon}
  </a>
);

const FooterLink = ({ to, text }) => (
  <li>
    <Link to={to} className="hover:text-blue-500 transition-colors">
      {text}
    </Link>
  </li>
);

export default Footer;