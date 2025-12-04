const express = require('express');
const router = express.Router();
const { authUser, registerUser, getUsers, deleteUser, getUserById, updateUser, getUserProfile, updateUserProfile } = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/', registerUser);     // Đăng ký
router.post('/login', authUser);    // Đăng nhập

router.route('/')
  .get(protect, admin, getUsers); // Lấy danh sách

router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)   
  .put(protect, admin, updateUser);   

module.exports = router;