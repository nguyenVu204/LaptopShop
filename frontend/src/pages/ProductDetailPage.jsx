import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify'; // 1. Import Toast
import useProductStore from '../store/useProductStore';
import useCartStore from '../store/useCartStore';
import { formatCurrency } from '../utils/format';
import ProductCard from '../components/ProductCard'; // 2. Import Card để hiển thị sản phẩm liên quan

const ProductDetailPage = () => {
  const { id } = useParams();
  
  // Lấy cả danh sách products để lọc ra sản phẩm liên quan
  const { productDetails, products, isLoading, error, fetchProductDetails, fetchProducts } = useProductStore();
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    fetchProductDetails(id);
    // Nếu danh sách tổng chưa có (người dùng vào thẳng link chi tiết), thì gọi thêm API lấy tất cả
    if (products.length === 0) {
        fetchProducts();
    }
    // Scroll lên đầu trang khi chuyển sản phẩm
    window.scrollTo(0, 0);
  }, [id, fetchProductDetails, fetchProducts, products.length]);

  if (isLoading) return (
    <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );
  
  if (error) return <div className="text-center text-red-500 py-20">{error}</div>;
  if (!productDetails) return null;

  const { name, image, price, description, specs, brand, category, countInStock } = productDetails;

  // Logic: Lọc ra các sản phẩm cùng Category (trừ chính nó ra), lấy tối đa 4 cái
  const relatedProducts = products
    .filter(p => p.category === category && p._id !== productDetails._id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(productDetails);
    // 3. Thay alert bằng Toast xịn xò
    toast.success(`Đã thêm ${name} vào giỏ hàng!`); 
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6 flex items-center gap-2">
        <Link to="/" className="hover:text-blue-600 transition-colors">Trang chủ</Link> 
        <span>/</span>
        <span className="text-gray-700 font-medium truncate max-w-[200px]">{name}</span>
      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-8">
          
          {/* Cột Trái: Hình ảnh */}
          <div className="p-8 bg-gray-50 flex items-center justify-center border-b md:border-b-0 md:border-r border-gray-100">
            <img 
                src={image} 
                alt={name} 
                className="max-h-[400px] w-full object-contain drop-shadow-xl hover:scale-105 transition-transform duration-500" 
            />
          </div>

          {/* Cột Phải: Thông tin */}
          <div className="p-8 flex flex-col">
            <div>
                <span className="inline-block bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wide">
                    {brand} - {category}
                </span>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">{name}</h1>
                
                <div className="flex items-end gap-4 mb-6">
                    <p className="text-4xl font-bold text-blue-600">
                    {formatCurrency(price)}
                    </p>
                    {/* Giả lập giá cũ cho đẹp */}
                    <p className="text-lg text-gray-400 line-through mb-1">
                        {formatCurrency(price * 1.1)}
                    </p>
                </div>

                <p className="text-gray-600 mb-8 leading-relaxed text-base border-l-4 border-gray-200 pl-4">
                  {description}
                </p>
            </div>

            {/* Bảng cấu hình rút gọn */}
            <div className="mb-8 bg-gray-50 rounded-xl p-4 border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>
                Cấu hình nổi bật
              </h3>
              <div className="grid grid-cols-2 gap-y-2 text-sm">
                <div className="flex flex-col"><span className="text-gray-500">CPU</span><span className="font-semibold">{specs?.cpu}</span></div>
                <div className="flex flex-col"><span className="text-gray-500">RAM</span><span className="font-semibold">{specs?.ram}</span></div>
                <div className="flex flex-col"><span className="text-gray-500">Ổ cứng</span><span className="font-semibold">{specs?.storage}</span></div>
                <div className="flex flex-col"><span className="text-gray-500">Màn hình</span><span className="font-semibold">{specs?.screen}</span></div>
              </div>
            </div>

            {/* Nút Mua Hàng - Đẩy xuống dưới cùng */}
            <div className="mt-auto pt-6 border-t border-gray-100 flex gap-4">
              <button 
                onClick={handleAddToCart}
                className={`flex-1 py-4 px-6 rounded-xl font-bold text-white shadow-lg transition-all transform active:scale-95 flex justify-center items-center gap-2 ${
                  countInStock > 0 
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:shadow-blue-500/30' 
                  : 'bg-gray-400 cursor-not-allowed'
                }`}
                disabled={countInStock === 0}
              >
                {countInStock > 0 ? (
                    <>
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                        Thêm vào giỏ hàng
                    </>
                ) : 'Tạm hết hàng'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Phần 4: Sản phẩm liên quan */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-blue-600 pl-3">
                Sản phẩm cùng loại
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {relatedProducts.map(product => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;