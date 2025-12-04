const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret_mac_dinh_123', {
    expiresIn: '30d', // Token hết hạn sau 30 ngày
  });
};

module.exports = generateToken;