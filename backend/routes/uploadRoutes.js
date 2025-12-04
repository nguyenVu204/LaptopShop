const path = require('path');
const express = require('express');
const multer = require('multer');

const router = express.Router();

// Cấu hình nơi lưu file và tên file
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/'); // Lưu vào folder uploads
  },
  filename(req, file, cb) {
    // Đổi tên file: tên-gốc + ngày-giờ + đuôi-file (tránh trùng tên)
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

// Chỉ cho phép upload ảnh
function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Images Only!');
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

// Route upload: POST /api/upload
router.post('/', upload.single('image'), (req, res) => {
  res.send(`/${req.file.path.replace(/\\/g, '/')}`); // Trả về đường dẫn ảnh
});

module.exports = router;