const express = require("express");
const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");
const User = require("../models/User");

const router = express.Router();

// Giới hạn tốc độ: tối đa 10 requests / 15 phút cho mỗi IP
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 phút
  max: 10,
  message: { message: "Quá nhiều yêu cầu từ IP này, vui lòng thử lại sau 15 phút." },
  standardHeaders: true,
  legacyHeaders: false,
});

router.use(authLimiter);

// Hàm tiện ích tạo JWT Token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// ================================================================
// @route   POST /api/auth/register
// @desc    Đăng ký tài khoản mới
// @access  Public
// ================================================================
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Vui lòng điền đầy đủ thông tin" });
  }

  try {
    // Kiểm tra email đã tồn tại chưa
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email này đã được sử dụng" });
    }

    // Tạo user mới (password sẽ được hash tự động bởi model)
    const user = await User.create({ name, email, password });

    const token = generateToken(user._id);

    res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        balance: user.balance,
        wishlist: user.wishlist || [],
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
  }
});

// ================================================================
// @route   POST /api/auth/login
// @desc    Đăng nhập
// @access  Public
// ================================================================
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Vui lòng nhập email và mật khẩu" });
  }

  try {
    // Tìm user theo email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Email hoặc mật khẩu không đúng" });
    }

    // So sánh mật khẩu
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Email hoặc mật khẩu không đúng" });
    }

    const token = generateToken(user._id);

    res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        balance: user.balance,
        wishlist: user.wishlist || [],
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
  }
});

module.exports = router;
