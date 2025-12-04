import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useProductStore from '../../store/useProductStore';
import axiosInstance from '../../services/axiosInstance'; // Để cấu hình URL ảnh

const ProductEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchProductDetails, productDetails, updateProduct, uploadImage, isLoading } = useProductStore();

  // State cho form
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  
  // State riêng cho Specs (Laptop)
  const [specs, setSpecs] = useState({
    cpu: '', ram: '', storage: '', screen: '', gpu: ''
  });

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    // Nếu chưa có data hoặc id khác data hiện tại thì fetch mới
    if (!productDetails || productDetails._id !== id) {
      fetchProductDetails(id);
    } else {
      // Đổ dữ liệu vào form
      setName(productDetails.name);
      setPrice(productDetails.price);
      setImage(productDetails.image);
      setBrand(productDetails.brand);
      setCategory(productDetails.category);
      setCountInStock(productDetails.countInStock);
      setDescription(productDetails.description);
      if(productDetails.specs) setSpecs(productDetails.specs);
    }
  }, [productDetails, id, fetchProductDetails]);

  const handleUploadFile = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const imagePath = await uploadImage(formData);
      setImage(imagePath); // Lưu đường dẫn ảnh vào state
      setUploading(false);
    } catch (error) {
      setUploading(false);
      alert('Upload ảnh lỗi!');
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const updatedProduct = {
      _id: id,
      name, price, image, brand, category, countInStock, description, specs
    };
    
    const success = await updateProduct(updatedProduct);
    if (success) {
      navigate('/admin/productlist');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/admin/productlist" className="text-gray-600 hover:text-blue-600 mb-4 inline-block">
         &larr; Quay lại
      </Link>
      
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Chỉnh Sửa Laptop</h1>
        
        {isLoading ? <p>Loading...</p> : (
          <form onSubmit={submitHandler} className="space-y-4">
            
            {/* Tên */}
            <div>
               <label className="block text-sm font-medium text-gray-700">Tên sản phẩm</label>
               <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border rounded mt-1" />
            </div>

            {/* Giá & Tồn kho */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Giá (VNĐ)</label>
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full p-2 border rounded mt-1" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Tồn kho</label>
                    <input type="number" value={countInStock} onChange={(e) => setCountInStock(e.target.value)} className="w-full p-2 border rounded mt-1" />
                </div>
            </div>

            {/* Ảnh */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Hình ảnh</label>
                <div className="flex gap-2 mt-1">
                    <input type="text" value={image} onChange={(e) => setImage(e.target.value)} className="w-full p-2 border rounded bg-gray-50" readOnly placeholder="Upload ảnh để có link..." />
                    <label className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700">
                        Upload
                        <input type="file" className="hidden" onChange={handleUploadFile} />
                    </label>
                </div>
                {uploading && <p className="text-sm text-blue-500 mt-1">Đang upload...</p>}
            </div>

            {/* Hãng & Danh mục */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Hãng (Brand)</label>
                    <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} className="w-full p-2 border rounded mt-1" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Danh mục</label>
                    <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2 border rounded mt-1" />
                </div>
            </div>

            {/* Specs (Nested Object) */}
            <div className="border p-4 rounded bg-gray-50">
                <h3 className="font-bold mb-3 text-gray-700">Thông số kỹ thuật</h3>
                <div className="grid grid-cols-2 gap-3">
                    <input placeholder="CPU" value={specs.cpu} onChange={(e) => setSpecs({...specs, cpu: e.target.value})} className="p-2 border rounded" />
                    <input placeholder="RAM" value={specs.ram} onChange={(e) => setSpecs({...specs, ram: e.target.value})} className="p-2 border rounded" />
                    <input placeholder="Ổ cứng (Storage)" value={specs.storage} onChange={(e) => setSpecs({...specs, storage: e.target.value})} className="p-2 border rounded" />
                    <input placeholder="Màn hình" value={specs.screen} onChange={(e) => setSpecs({...specs, screen: e.target.value})} className="p-2 border rounded" />
                    <input placeholder="Card đồ họa (GPU)" value={specs.gpu} onChange={(e) => setSpecs({...specs, gpu: e.target.value})} className="p-2 border rounded" />
                </div>
            </div>

            {/* Mô tả */}
            <div>
               <label className="block text-sm font-medium text-gray-700">Mô tả</label>
               <textarea rows="4" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border rounded mt-1"></textarea>
            </div>

            <button type="submit" className="w-full bg-green-600 text-white font-bold py-3 rounded hover:bg-green-700">
                Cập nhật Laptop
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProductEditPage;