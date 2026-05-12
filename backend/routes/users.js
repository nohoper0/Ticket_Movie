const express = require("express");
const User = require("../models/User");
const { protect } = require("../middleware/auth");

const router = express.Router();

// ================================================================
// @route   GET /api/users/me
// @desc    Lấy thông tin user hiện tại (từ token)
// @access  Private
// ================================================================
router.get("/me", protect, async (req, res) => {
  const user = await User.findById(req.user._id).populate("wishlist", "name imageUrl genre rating");
  res.json({
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      balance: user.balance,
      wishlist: user.wishlist,
    },
  });
});

// ================================================================
// @route   POST /api/users/wishlist/:movieId
// @desc    Toggle yêu thích phim (thêm nếu chưa có, bỏ nếu có rồi)
// @access  Private
// ================================================================
router.post("/wishlist/:movieId", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const movieId = req.params.movieId;

    const isWishlisted = user.wishlist.some((id) => id.toString() === movieId);

    if (isWishlisted) {
      user.wishlist = user.wishlist.filter((id) => id.toString() !== movieId);
    } else {
      user.wishlist.push(movieId);
    }

    await user.save();

    res.json({
      isWishlisted: !isWishlisted,
      message: isWishlisted ? "Đã xóa khỏi yêu thích" : "Đã thêm vào yêu thích",
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
  }
});

// ================================================================
// @route   GET /api/users/wishlist
// @desc    Lấy danh sách phim yêu thích của user
// @access  Private
// ================================================================
router.get("/wishlist", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate(
      "wishlist",
      "name imageUrl genre rating duration status"
    );
    res.json({ wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
  }
});

// ================================================================
// @route   PUT /api/users/me
// @desc    Cập nhật tên, avatar, mật khẩu
// @access  Private
// ================================================================
router.put("/me", protect, async (req, res) => {
  try {
    const { name, avatar, currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);

    if (name && name.trim()) user.name = name.trim();
    if (avatar) user.avatar = avatar;

    if (currentPassword && newPassword) {
      const isMatch = await user.comparePassword(currentPassword);
      if (!isMatch) {
        return res.status(400).json({ message: "Mật khẩu hiện tại không đúng" });
      }
      if (newPassword.length < 6) {
        return res.status(400).json({ message: "Mật khẩu mới phải ít nhất 6 ký tự" });
      }
      user.password = newPassword;
    }

    await user.save();
    res.json({
      user: { _id: user._id, name: user.name, email: user.email, avatar: user.avatar, balance: user.balance },
      message: "Cập nhật thành công!",
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
  }
});

module.exports = router;

