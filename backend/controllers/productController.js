const Product = require('../models/productModel');

// @desc    Lấy sản phẩm (Tìm kiếm + Lọc + Phân trang)
// @route   GET /api/products?keyword=...&category=...&pageNumber=1
const getProducts = async (req, res) => {
  try {
    // Cấu hình phân trang
    const pageSize = 6; // Mặc định 6 sản phẩm/trang
    const page = Number(req.query.pageNumber) || 1; // Trang hiện tại (mặc định là 1)

    // Xử lý Tìm kiếm & Lọc 
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        }
      : {};

    const category = req.query.category 
      ? { category: req.query.category } 
      : {};

    // Đếm tổng số sản phẩm khớp điều kiện (để tính tổng số trang)
    const count = await Product.countDocuments({ ...keyword, ...category });

    // Lấy dữ liệu theo trang
    // .limit(pageSize): Chỉ lấy 6 cái
    // .skip(): Bỏ qua các sản phẩm của trang trước (VD: Trang 2 thì bỏ qua 6 cái đầu)
    const products = await Product.find({ ...keyword, ...category })
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    
    //Trả về object chứa cả dữ liệu và thông tin phân trang
    res.json({ 
        products, 
        page, 
        pages: Math.ceil(count / pageSize) // Tổng số trang
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Lấy chi tiết 1 sản phẩm theo ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    // Tìm sản phẩm theo ID trên URL
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    }
  } catch (error) {
    // Lỗi thường gặp: ID không đúng định dạng ObjectId của MongoDB
    res.status(404).json({ message: 'Lỗi ID sản phẩm không hợp lệ' });
  }
};

// @desc    Xóa 1 sản phẩm
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.json({ message: 'Đã xóa sản phẩm thành công' });
  } else {
    res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
  }
};

// @desc    Tạo sản phẩm mẫu (Admin sẽ sửa sau)
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
  const product = new Product({
    name: 'Tên Laptop Mẫu',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Thương hiệu',
    category: 'Danh mục',
    countInStock: 0,
    numReviews: 0,
    description: 'Mô tả sản phẩm...',
    specs: { // Default specs
        cpu: 'i5',
        ram: '8GB',
        storage: '256GB',
        screen: '14 inch',
        gpu: 'Onboard'
    }
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
};

// @desc    Cập nhật sản phẩm
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
  const { name, price, description, image, brand, category, countInStock, specs } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;
    product.specs = specs; // Cập nhật object specs

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
  }
};

module.exports = { getProducts, getProductById, deleteProduct, createProduct, updateProduct };

