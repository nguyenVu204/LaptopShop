const express = require('express');
const router = express.Router();
const { 
  addOrderItems, 
  getOrders, 
  getOrderById, 
  updateOrderToDelivered,
  updateOrderToPaid,
  getDashboardStats
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, addOrderItems)
  .get(protect, admin, getOrders);

router.get('/stats', protect, admin, getDashboardStats);


router.route('/:id').get(protect, getOrderById);


router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);
router.route('/:id/pay').put(protect, admin, updateOrderToPaid);

module.exports = router;