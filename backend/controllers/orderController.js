const Order = require('../models/orderModel');
const User = require('../models/userModel');      
const Product = require('../models/productModel'); 

// @desc    Tạo đơn hàng mới
// @route   POST /api/orders
// @access  Private
const addOrderItems = async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400).json({ message: 'Không có sản phẩm trong giỏ' });
    return;
  } else {
    const order = new Order({
      orderItems: orderItems.map((x) => ({
        ...x,
        product: x._id, // Map _id của sản phẩm vào trường product
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
};

// @desc    Lấy tất cả đơn hàng (Admin) - Có phân trang
// @route   GET /api/orders?pageNumber=1
const getOrders = async (req, res) => {
  const pageSize = 10; // Mỗi trang 10 đơn
  const page = Number(req.query.pageNumber) || 1;

  const count = await Order.countDocuments({});

  const orders = await Order.find({})
    .populate('user', 'id name')
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort({ createdAt: -1 }); // Sắp xếp đơn mới nhất lên đầu

  res.json({ 
      orders, 
      page, 
      pages: Math.ceil(count / pageSize) 
  });
};

// @desc    Lấy chi tiết 1 đơn hàng
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');

  if (order) {
    res.json(order);
  } else {
    res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
  }
};

// @desc    Cập nhật trạng thái đã giao hàng
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    await updatedOrder.populate('user', 'name email');

    res.json(updatedOrder);
  } else {
    res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
  }
};

const updateOrderToPaid = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    
    // Nếu chưa giao thì cập nhật luôn là đã giao 
    // order.paymentResult = ... 

    const updatedOrder = await order.save();
    
    await updatedOrder.populate('user', 'name email');
    
    res.json(updatedOrder);
  } else {
    res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
  }
};

// @desc    Lấy thống kê cho Dashboard
// @route   GET /api/orders/stats
// @access  Private/Admin
const getDashboardStats = async (req, res) => {
  // Đếm số lượng các thực thể
  const totalOrders = await Order.countDocuments();
  const totalProducts = await Product.countDocuments();
  const totalUsers = await User.countDocuments();

  // Tính tổng doanh thu (Chỉ tính các đơn đã thanh toán)
  const totalRevenueData = await Order.aggregate([
    { $match: { isPaid: true } },
    { $group: { _id: null, total: { $sum: '$totalPrice' } } },
  ]);
  const totalRevenue = totalRevenueData.length > 0 ? totalRevenueData[0].total : 0;

  //Lấy doanh thu theo tháng (Để vẽ biểu đồ)
  const monthlyRevenue = await Order.aggregate([
    { $match: { isPaid: true } },
    {
      $group: {
        _id: { $month: '$createdAt' }, // Nhóm theo tháng (1-12)
        total: { $sum: '$totalPrice' },
      },
    },
    { $sort: { _id: 1 } }, // Sắp xếp từ tháng 1 -> 12
  ]);

  res.json({
    totalOrders,
    totalProducts,
    totalUsers,
    totalRevenue,
    monthlyRevenue,
  });
};

module.exports = { 
  addOrderItems, 
  getOrders, 
  getOrderById, 
  updateOrderToDelivered, 
  updateOrderToPaid ,
  getDashboardStats
};