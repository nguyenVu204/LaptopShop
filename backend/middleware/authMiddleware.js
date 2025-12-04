const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// 1. Kiểm tra User đã đăng nhập chưa (Có Token hợp lệ không?)
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]; // Lấy token sau chữ Bearer
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_mac_dinh_123');
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      res.status(401).json({ message: 'Token không hợp lệ, vui lòng đăng nhập lại' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Không có token, từ chối truy cập' });
  }
};

// 2. Kiểm tra User có phải Admin không?
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({ message: 'Chỉ Admin mới có quyền thực hiện' });
  }
};

module.exports = { protect, admin };