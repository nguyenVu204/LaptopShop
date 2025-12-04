const products = [
  // --- APPLE ---
  {
    name: 'MacBook Air M2 2022',
    image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=800&auto=format&fit=crop',
    description: 'Thiết kế siêu mỏng nhẹ, chip M2 mạnh mẽ, màn hình Liquid Retina tuyệt đẹp.',
    brand: 'Apple',
    category: 'Apple',
    price: 26990000,
    countInStock: 10,
    rating: 5,
    numReviews: 12,
    specs: { cpu: 'Apple M2', ram: '8GB', storage: '256GB SSD', screen: '13.6" Liquid Retina', gpu: '8-core GPU' }
  },
  {
    name: 'MacBook Pro 14 M3 Pro',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop',
    description: 'Hiệu năng đỉnh cao cho dân đồ họa chuyên nghiệp với chip M3 Pro mới nhất.',
    brand: 'Apple',
    category: 'Apple',
    price: 49990000,
    countInStock: 5,
    rating: 4.8,
    numReviews: 8,
    specs: { cpu: 'Apple M3 Pro', ram: '18GB', storage: '512GB SSD', screen: '14.2" XDR 120Hz', gpu: '14-core GPU' }
  },
  {
    name: 'MacBook Pro 16 M1 Max',
    image: 'https://images.unsplash.com/photo-1531297424005-063400c6d2d5?q=80&w=800&auto=format&fit=crop',
    description: 'Cỗ máy trạm di động, màn hình lớn, pin trâu, cân mọi tác vụ nặng.',
    brand: 'Apple',
    category: 'Apple',
    price: 65990000,
    countInStock: 3,
    rating: 4.9,
    numReviews: 5,
    specs: { cpu: 'Apple M1 Max', ram: '32GB', storage: '1TB SSD', screen: '16.2" XDR 120Hz', gpu: '32-core GPU' }
  },

  // --- DELL ---
  {
    name: 'Dell XPS 13 Plus 9320',
    image: 'https://images.unsplash.com/photo-1593642632823-8f78536788c6?q=80&w=800&auto=format&fit=crop',
    description: 'Thiết kế tương lai, bàn phím tràn viền, màn hình OLED sống động.',
    brand: 'Dell',
    category: 'Dell',
    price: 35990000,
    countInStock: 7,
    rating: 4.5,
    numReviews: 10,
    specs: { cpu: 'Intel Core i7-1260P', ram: '16GB', storage: '512GB SSD', screen: '13.4" 3.5K OLED', gpu: 'Intel Iris Xe' }
  },
  {
    name: 'Dell Inspiron 16 5620',
    image: 'https://images.unsplash.com/photo-1588872657578-9522858577b6?q=80&w=800&auto=format&fit=crop',
    description: 'Laptop văn phòng màn hình lớn, bàn phím full-size tiện lợi.',
    brand: 'Dell',
    category: 'Dell',
    price: 18990000,
    countInStock: 15,
    rating: 4.2,
    numReviews: 20,
    specs: { cpu: 'Intel Core i5-1240P', ram: '16GB', storage: '512GB SSD', screen: '16" FHD+', gpu: 'Intel Iris Xe' }
  },
  {
    name: 'Dell Alienware m15 R7',
    image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=800&auto=format&fit=crop',
    description: 'Laptop gaming ngoài hành tinh, tản nhiệt cực tốt, hiệu năng khủng.',
    brand: 'Dell',
    category: 'Dell',
    price: 45990000,
    countInStock: 4,
    rating: 4.7,
    numReviews: 6,
    specs: { cpu: 'Ryzen 7 6800H', ram: '32GB', storage: '1TB SSD', screen: '15.6" QHD 240Hz', gpu: 'RTX 3070 Ti' }
  },

  // --- ASUS ---
  {
    name: 'Asus ROG Strix G15',
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=800&auto=format&fit=crop',
    description: 'Phong cách gaming đậm chất, đèn LED RGB rực rỡ.',
    brand: 'Asus',
    category: 'Asus',
    price: 28990000,
    countInStock: 8,
    rating: 4.6,
    numReviews: 15,
    specs: { cpu: 'Ryzen 7 6800H', ram: '16GB', storage: '512GB SSD', screen: '15.6" FHD 144Hz', gpu: 'RTX 3050' }
  },
  {
    name: 'Asus ZenBook Duo 14',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=800&auto=format&fit=crop',
    description: 'Hai màn hình độc đáo, tăng cường khả năng đa nhiệm.',
    brand: 'Asus',
    category: 'Asus',
    price: 32990000,
    countInStock: 6,
    rating: 4.4,
    numReviews: 9,
    specs: { cpu: 'Intel Core i7-1165G7', ram: '16GB', storage: '1TB SSD', screen: '14" FHD Touch', gpu: 'MX450' }
  },
  {
    name: 'Asus TUF Gaming F15',
    image: 'https://plus.unsplash.com/premium_photo-1664194583917-b0173a655309?q=80&w=800&auto=format&fit=crop',
    description: 'Bền bỉ chuẩn quân đội, giá thành hợp lý cho sinh viên.',
    brand: 'Asus',
    category: 'Asus',
    price: 19990000,
    countInStock: 20,
    rating: 4.3,
    numReviews: 25,
    specs: { cpu: 'Intel Core i5-11400H', ram: '8GB', storage: '512GB SSD', screen: '15.6" FHD 144Hz', gpu: 'RTX 3050' }
  },

  // --- HP ---
  {
    name: 'HP Spectre x360 14',
    image: 'https://images.unsplash.com/photo-1544731612-de7f96afe55f?q=80&w=800&auto=format&fit=crop',
    description: 'Laptop 2-in-1 sang trọng, xoay gập 360 độ, bút cảm ứng đi kèm.',
    brand: 'HP',
    category: 'HP',
    price: 41990000,
    countInStock: 5,
    rating: 4.8,
    numReviews: 7,
    specs: { cpu: 'Intel Core i7-1355U', ram: '16GB', storage: '1TB SSD', screen: '13.5" 3K2K OLED', gpu: 'Intel Iris Xe' }
  },
  {
    name: 'HP Omen 16',
    image: 'https://images.unsplash.com/photo-1595327656903-2f54e37ce09b?q=80&w=800&auto=format&fit=crop',
    description: 'Chiến game mát mẻ với công nghệ tản nhiệt Omen Tempest.',
    brand: 'HP',
    category: 'HP',
    price: 38990000,
    countInStock: 6,
    rating: 4.5,
    numReviews: 11,
    specs: { cpu: 'Intel Core i7-12700H', ram: '16GB', storage: '1TB SSD', screen: '16.1" QHD 165Hz', gpu: 'RTX 3060' }
  },
  {
    name: 'HP Pavilion 15',
    image: 'https://images.unsplash.com/photo-1588702547919-26089e690ecc?q=80&w=800&auto=format&fit=crop',
    description: 'Thiết kế thời trang, mỏng nhẹ, phù hợp văn phòng.',
    brand: 'HP',
    category: 'HP',
    price: 16990000,
    countInStock: 12,
    rating: 4.1,
    numReviews: 18,
    specs: { cpu: 'Intel Core i5-1235U', ram: '8GB', storage: '512GB SSD', screen: '15.6" FHD IPS', gpu: 'Intel Iris Xe' }
  },

  // --- LENOVO ---
  {
    name: 'Lenovo ThinkPad X1 Carbon Gen 10',
    image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=800&auto=format&fit=crop',
    description: 'Biểu tượng của doanh nhân, bàn phím gõ sướng nhất thế giới.',
    brand: 'Lenovo',
    category: 'Lenovo',
    price: 48990000,
    countInStock: 4,
    rating: 4.9,
    numReviews: 14,
    specs: { cpu: 'Intel Core i7-1260P', ram: '16GB', storage: '512GB SSD', screen: '14" WUXGA', gpu: 'Intel Iris Xe' }
  },
  {
    name: 'Lenovo Legion 5 Pro',
    image: 'https://images.unsplash.com/photo-1605973029521-8154da591bd7?q=80&w=800&auto=format&fit=crop',
    description: 'Vua hiệu năng trong tầm giá, màn hình 16 inch 16:10 cực đẹp.',
    brand: 'Lenovo',
    category: 'Lenovo',
    price: 33990000,
    countInStock: 9,
    rating: 4.8,
    numReviews: 30,
    specs: { cpu: 'Ryzen 7 6800H', ram: '16GB', storage: '512GB SSD', screen: '16" WQXGA 165Hz', gpu: 'RTX 3060' }
  },
  {
    name: 'Lenovo Yoga Slim 7',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop',
    description: 'Mỏng nhẹ thời thượng, vỏ kim loại nguyên khối.',
    brand: 'Lenovo',
    category: 'Lenovo',
    price: 22990000,
    countInStock: 8,
    rating: 4.4,
    numReviews: 10,
    specs: { cpu: 'Intel Core i5-1135G7', ram: '16GB', storage: '512GB SSD', screen: '14" FHD', gpu: 'Intel Iris Xe' }
  },

  // --- ACER ---
  {
    name: 'Acer Predator Helios 300',
    image: 'https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?q=80&w=800&auto=format&fit=crop',
    description: 'Vũ khí chiến game hạng nặng, đèn LED RGB từng phím.',
    brand: 'Acer',
    category: 'Acer',
    price: 31990000,
    countInStock: 5,
    rating: 4.5,
    numReviews: 12,
    specs: { cpu: 'Intel Core i7-12700H', ram: '16GB', storage: '512GB SSD', screen: '15.6" QHD 165Hz', gpu: 'RTX 3060' }
  },
  {
    name: 'Acer Swift 3',
    image: 'https://images.unsplash.com/photo-1525453664324-4f24c30c8072?q=80&w=800&auto=format&fit=crop',
    description: 'Siêu nhẹ chỉ 1.2kg, pin dùng cả ngày dài.',
    brand: 'Acer',
    category: 'Acer',
    price: 15990000,
    countInStock: 10,
    rating: 4.0,
    numReviews: 22,
    specs: { cpu: 'Ryzen 5 5500U', ram: '8GB', storage: '512GB SSD', screen: '14" FHD IPS', gpu: 'Radeon Graphics' }
  },

  // --- MSI ---
  {
    name: 'MSI Raider GE78 HX',
    image: 'https://images.unsplash.com/photo-1580522154071-c6ca47a859ad?q=80&w=800&auto=format&fit=crop',
    description: 'Quái vật hiệu năng, dải đèn Matrix Light cực ngầu.',
    brand: 'MSI',
    category: 'MSI',
    price: 89990000,
    countInStock: 2,
    rating: 5,
    numReviews: 3,
    specs: { cpu: 'Core i9-13980HX', ram: '64GB', storage: '2TB SSD', screen: '17" QHD 240Hz', gpu: 'RTX 4080' }
  },
  {
    name: 'MSI Modern 14',
    image: 'https://images.unsplash.com/photo-1529336953128-a8529f9cc066?q=80&w=800&auto=format&fit=crop',
    description: 'Lựa chọn tốt nhất cho sinh viên, thiết kế trẻ trung.',
    brand: 'MSI',
    category: 'MSI',
    price: 14990000,
    countInStock: 25,
    rating: 4.2,
    numReviews: 35,
    specs: { cpu: 'Intel Core i3-1115G4', ram: '8GB', storage: '256GB SSD', screen: '14" FHD IPS', gpu: 'Intel UHD' }
  },
  {
    name: 'MSI Stealth 16 Studio',
    image: 'https://images.unsplash.com/photo-1629757659682-628d75e07662?q=80&w=800&auto=format&fit=crop',
    description: 'Mỏng nhẹ nhưng cấu hình studio, màn hình chuẩn màu.',
    brand: 'MSI',
    category: 'MSI',
    price: 55990000,
    countInStock: 4,
    rating: 4.7,
    numReviews: 6,
    specs: { cpu: 'Core i7-13700H', ram: '32GB', storage: '1TB SSD', screen: '16" QHD+ 240Hz', gpu: 'RTX 4070' }
  }
];

module.exports = products;