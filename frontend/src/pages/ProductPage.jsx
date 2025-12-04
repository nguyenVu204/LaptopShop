import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useProductStore from '../store/useProductStore';
import ProductCard from '../components/ProductCard';
import { FaSearch, FaFilter } from 'react-icons/fa';
import Pagination from '../components/Pagination';

const ProductPage = () => {
  const { products, page, pages, isLoading, error, fetchProducts } = useProductStore();
  
  // State quản lý bộ lọc
  const [keyword, setKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Danh sách danh mục cứng (hoặc bạn có thể gọi API lấy danh mục riêng nếu muốn)
  const categories = ['Tất cả', 'Apple', 'Dell', 'Asus', 'HP', 'Lenovo', 'Acer', 'MSI'];

  // Gọi API mỗi khi filter thay đổi
  useEffect(() => {
    const catParam = selectedCategory === 'Tất cả' ? '' : selectedCategory;
    fetchProducts(keyword, catParam, currentPage);
  }, [keyword, selectedCategory, currentPage, fetchProducts]);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchProducts(keyword, selectedCategory === 'Tất cả' ? '' : selectedCategory, 1);
  };

  const handleCategoryChange = (cat) => {
      setSelectedCategory(cat);
      setCurrentPage(1);
  }

  return (
    <div className="container py-8">
      {/* Header Mobile Filter (Ẩn trên PC) */}
      <div className="lg:hidden mb-4">
        <input 
          type="text" 
          placeholder="Tìm kiếm laptop..." 
          className="w-full p-3 border rounded-lg"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* SIDEBAR: BỘ LỌC */}
        <div className="lg:w-1/4">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 sticky top-24">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-gray-800">
              <FaFilter className="text-blue-600" /> Danh Mục
            </h3>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => handleCategoryChange(cat)}
                    className={`w-full text-left px-3 py-2 rounded transition-colors ${
                      selectedCategory === cat || (cat === 'Tất cả' && selectedCategory === '')
                        ? 'bg-blue-600 text-white font-medium'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* MAIN CONTENT: DANH SÁCH SP */}
        <div className="lg:w-3/4">
          {/* Thanh tìm kiếm trên PC */}
          <div className="hidden lg:flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
             <h2 className="font-bold text-gray-700">
                {selectedCategory || 'Tất cả sản phẩm'} 
                <span className="font-normal text-sm text-gray-500 ml-2">({products.length} sản phẩm)</span>
             </h2>
             <form onSubmit={handleSearch} className="relative w-80">
                <input 
                  type="text" 
                  placeholder="Tìm kiếm tên máy..." 
                  className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:border-blue-500"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
             </form>
          </div>

          {/* Lưới sản phẩm */}
          {isLoading ? (
             <div className="text-center py-20">Đang tải sản phẩm...</div>
          ) : error ? (
             <div className="text-red-500 text-center">{error}</div>
          ) : products.length === 0 ? (
             <div className="text-center py-20 text-gray-500 bg-white rounded-lg shadow-sm">
                Không tìm thấy sản phẩm nào phù hợp.
             </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
          {!isLoading && !error && (
             <Pagination 
                page={page} 
                pages={pages} 
                changePage={setCurrentPage} // Truyền hàm set state xuống
             />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;