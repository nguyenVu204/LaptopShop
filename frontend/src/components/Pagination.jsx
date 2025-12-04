import React from 'react';

const Pagination = ({ page, pages, changePage }) => {
  // Nếu chỉ có 1 trang thì không cần hiện
  if (pages <= 1) return null;

  return (
    <div className="flex justify-center mt-8 gap-2">
      {/* Nút Prev */}
      <button
        disabled={page === 1}
        onClick={() => changePage(page - 1)}
        className={`px-4 py-2 border rounded-lg transition-colors ${
            page === 1 
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
            : 'bg-white hover:bg-gray-50 text-gray-700'
        }`}
      >
        &laquo; Trước
      </button>

      {/* Danh sách số trang */}
      {[...Array(pages).keys()].map((x) => (
        <button
          key={x + 1}
          onClick={() => changePage(x + 1)}
          className={`px-4 py-2 border rounded-lg font-medium transition-colors ${
            x + 1 === page
              ? 'bg-blue-600 text-white border-blue-600' // Trang hiện tại
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          {x + 1}
        </button>
      ))}

      {/* Nút Next */}
      <button
        disabled={page === pages}
        onClick={() => changePage(page + 1)}
        className={`px-4 py-2 border rounded-lg transition-colors ${
            page === pages
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
            : 'bg-white hover:bg-gray-50 text-gray-700'
        }`}
      >
        Sau &raquo;
      </button>
    </div>
  );
};

export default Pagination;