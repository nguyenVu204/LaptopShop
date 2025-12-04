const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');

// @desc    Đăng nhập user & lấy token
// @route   POST /api/users/login
const authUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  // Kiểm tra user có tồn tại VÀ mật khẩu đúng không
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id), // Trả về chìa khóa
    });
  } else {
    res.status(401).json({ message: 'Email hoặc mật khẩu không đúng' });
  }
};

// @desc    Đăng ký user mới
// @route   POST /api/users
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // 1. Check xem email đã tồn tại chưa
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'User đã tồn tại' });
  }

  // 2. Tạo user mới (password sẽ tự mã hóa nhờ code ở Model)
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: 'Dữ liệu user không hợp lệ' });
  }
};

// @desc    Lấy tất cả user - Có phân trang
// @route   GET /api/users?pageNumber=1
const getUsers = async (req, res) => {
  const pageSize = 10; // Mỗi trang 10 user
  const page = Number(req.query.pageNumber) || 1;

  const count = await User.countDocuments({});

  const users = await User.find({})
    .select('-password') // Không lấy field password
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ 
      users, 
      page, 
      pages: Math.ceil(count / pageSize) 
  });
};

// @desc    Xóa user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    // Ngăn không cho admin tự xóa chính mình
    if (user.isAdmin && user._id.toString() === req.user._id.toString()) {
        res.status(400);
        throw new Error('Không thể xóa tài khoản Admin đang đăng nhập!');
    }
    
    await User.deleteOne({ _id: user._id });
    res.json({ message: 'User đã bị xóa' });
  } else {
    res.status(404).json({ message: 'Không tìm thấy user' });
  }
};

// @desc    Lấy chi tiết user theo ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id).select('-password'); // Không trả về mật khẩu
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'Không tìm thấy user' });
  }
};

// @desc    Cập nhật user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    // Cập nhật quyền Admin (true/false)
    user.isAdmin = req.body.isAdmin === undefined ? user.isAdmin : req.body.isAdmin;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404).json({ message: 'Không tìm thấy user' });
  }
};

// @desc    Lấy thông tin profile của user đang đăng nhập
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

// @desc    Cập nhật thông tin profile (Tên, Email, Pass)
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    
    
    if (req.body.password) {
      user.password = req.body.password; 
      
    }

    const updatedUser = await user.save();

    
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

module.exports = { authUser, registerUser, getUsers, deleteUser, getUserById, updateUser, 
  getUserProfile, updateUserProfile };