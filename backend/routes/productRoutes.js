const express = require('express');
const router = express.Router();
const { 
  getProducts, 
  getProductById, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');

// =====================
// /api/products
// =====================

// Lấy tất cả sản phẩm
router.route('/')
  .get(getProducts)
  .post(protect, admin, createProduct); // Admin tạo sản phẩm mới

// /api/products/:id
router.route('/:id')
  .get(getProductById)                 // Lấy sản phẩm theo id
  .put(protect, admin, updateProduct)  // Admin cập nhật
  .delete(protect, admin, deleteProduct); // Admin xóa

module.exports = router;
