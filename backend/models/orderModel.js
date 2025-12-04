const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
  {
    // 1. Thông tin người mua (Liên kết với User Model)
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },

    // 2. Danh sách sản phẩm trong đơn
    orderItems: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true }, // Số lượng
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Product', // Liên kết với Product Model
        },
      },
    ],

    // 3. Địa chỉ giao hàng
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: false }, // Có thể bổ sung sau
      postalCode: { type: String, required: false },
      country: { type: String, required: false },
    },

    // 4. Phương thức thanh toán (VD: 'COD', 'Paypal')
    paymentMethod: {
      type: String,
      required: true,
    },

    // 5. Kết quả thanh toán (Dùng khi tích hợp Paypal/Stripe sau này)
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },

    // 6. Các loại phí & Tổng tiền
    itemsPrice: { type: Number, required: true, default: 0.0 }, // Tiền hàng
    taxPrice: { type: Number, required: true, default: 0.0 },   // Thuế (nếu có)
    shippingPrice: { type: Number, required: true, default: 0.0 }, // Phí ship
    totalPrice: { type: Number, required: true, default: 0.0 },    // Tổng thanh toán

    // 7. Trạng thái thanh toán
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },

    // 8. Trạng thái giao hàng
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true, // Tự động tạo createdAt (ngày đặt hàng) và updatedAt
  }
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;