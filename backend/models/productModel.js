const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true }, // URL ảnh
    brand: { type: String, required: true }, // Dell, Asus, Apple...
    category: { type: String, required: true }, // Gaming, Office, Thin&Light
    description: { type: String, required: true },
    
    // Đặc thù Laptop: Object chứa cấu hình chi tiết
    specs: {
      cpu: { type: String, required: true },    // Intel Core i7-12700H
      ram: { type: String, required: true },    // 16GB DDR5
      storage: { type: String, required: true },// 512GB SSD NVMe
      screen: { type: String, required: true }, // 15.6 inch FHD 144Hz
      gpu: { type: String },                    // RTX 3050Ti (Optional)
    },

    price: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true, // Tự động tạo createdAt, updatedAt
  }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;