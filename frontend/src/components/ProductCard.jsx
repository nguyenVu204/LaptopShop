import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import useCartStore from '../store/useCartStore';
import { formatCurrency } from '../utils/format';

const ProductCard = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
    toast.success(`Đã thêm ${product.name} vào giỏ!`);
  };

  return (
    <Link 
      to={`/product/${product._id}`} 
      className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full"
    >
      {/* 1. Phần Ảnh Sản Phẩm */}
      <div className="h-48 p-4 bg-gray-50 flex items-center justify-center relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="h-full w-full object-contain group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Badge giảm giá giả lập (-10%) */}
        <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">
          -10%
        </span>
      </div>

      {/* 2. Phần Thông tin */}
      <div className="p-4 flex flex-col flex-grow">
        <span className="text-xs text-blue-600 font-bold uppercase mb-1 tracking-wide">
          {product.category}
        </span>
        
        <h3 
          className="text-base font-bold text-gray-800 line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors" 
          title={product.name}
        >
          {product.name}
        </h3>
        
        {/* Specs: CPU & RAM */}
        <div className="flex flex-wrap gap-1 mb-3">
          {product.specs?.cpu && (
            <span className="bg-gray-100 text-gray-600 text-[10px] px-2 py-1 rounded border border-gray-200 font-medium">
              {product.specs.cpu}
            </span>
          )}
          {product.specs?.ram && (
            <span className="bg-gray-100 text-gray-600 text-[10px] px-2 py-1 rounded border border-gray-200 font-medium">
              {product.specs.ram}
            </span>
          )}
        </div>

        {/* Giá tiền & Nút Mua */}
        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-gray-900">
              {formatCurrency(product.price)}
            </span>
            <span className="text-xs text-gray-400 line-through">
              {formatCurrency(product.price * 1.1)}
            </span>
          </div>
          
          {/* NÚT THÊM GIỎ HÀNG */}
          <button 
            onClick={handleAddToCart}
            
            title="Thêm vào giỏ hàng"
          >
            
            🛒
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;