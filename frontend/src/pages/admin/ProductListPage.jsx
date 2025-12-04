import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useProductStore from '../../store/useProductStore';
import useAuthStore from '../../store/useAuthStore';
import { formatCurrency } from '../../utils/format';
import Pagination from '../../components/Pagination'; // 1. Import Pagination

const ProductListPage = () => {
  // 2. Lấy thêm page và pages từ store
  const { products, page, pages, isLoading, error, fetchProducts, deleteProduct } = useProductStore();
  const { userInfo } = useAuthStore();
  const navigate = useNavigate();

  // 3. State quản lý trang hiện tại (Mặc định trang 1)
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/login');
    } else {
      // 4. Gọi hàm fetch với tham số phân trang
      // fetchProducts(keyword, category, pageNumber)
      // Admin không cần lọc keyword/category lúc đầu nên để rỗng ''
      fetchProducts('', '', currentPage);
    }
  }, [userInfo, navigate, fetchProducts, currentPage]); // Nhớ thêm currentPage vào dependency

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa laptop này không?')) {
      await deleteProduct(id);
      // Xóa xong thì load lại trang hiện tại
      fetchProducts('', '', currentPage);
    }
  };

  const createProductHandler = async () => {
      if (window.confirm('Bạn muốn tạo một laptop mới?')) {
          const { createProduct } = useProductStore.getState(); // Lấy hàm create
          const newProduct = await createProduct(); 
          if (newProduct) {
              navigate(`/admin/product/${newProduct._id}/edit`);
          }
      }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý Sản phẩm</h1>
        <button 
          onClick={createProductHandler}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center gap-2 shadow-sm"
        >
          <span>+ Thêm Laptop mới</span>
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-10">Đang tải dữ liệu...</div>
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : (
        <>
          <div className="overflow-x-auto bg-white shadow rounded-lg border border-gray-200">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="p-4 text-sm font-semibold text-gray-600">ID</th>
                  <th className="p-4 text-sm font-semibold text-gray-600">Tên Laptop</th>
                  <th className="p-4 text-sm font-semibold text-gray-600">Giá</th>
                  <th className="p-4 text-sm font-semibold text-gray-600">Danh mục</th>
                  <th className="p-4 text-sm font-semibold text-gray-600 text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50">
                    <td className="p-4 text-xs text-gray-500 font-mono">{product._id.substring(20, 24)}...</td>
                    <td className="p-4 font-medium text-gray-800 flex items-center gap-2">
                        <img src={product.image} alt="" className="w-10 h-10 object-contain border rounded bg-white"/>
                        <span className="line-clamp-1">{product.name}</span>
                    </td>
                    <td className="p-4 text-blue-600 font-medium">{formatCurrency(product.price)}</td>
                    <td className="p-4 text-gray-600 text-sm">{product.category}</td>
                    <td className="p-4 flex justify-center gap-2">
                      <Link to={`/admin/product/${product._id}/edit`}>
                        <button className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200 px-3 py-1 rounded text-sm font-medium transition">
                          Sửa
                        </button>
                      </Link>
                      <button 
                        onClick={() => handleDelete(product._id)}
                        className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded text-sm font-medium transition"
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 5. Hiển thị thanh phân trang */}
          <div className="mt-4">
            <Pagination 
                page={page} 
                pages={pages} 
                changePage={setCurrentPage} 
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ProductListPage;