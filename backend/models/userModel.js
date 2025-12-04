const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // unique: không trùng email
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false }, // Phân quyền Admin
  },
  { timestamps: true }
);

// Middleware: Tự động mã hóa password trước khi Lưu (Save)
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Hàm phụ trợ: Kiểm tra mật khẩu nhập vào có khớp với mật khẩu đã mã hóa không
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;