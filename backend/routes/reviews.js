const express = require("express");
const Review = require("../models/Review");
const Ticket = require("../models/Ticket");
const { protect } = require("../middleware/auth");

const router = express.Router();

// ================================================================
// @route   GET /api/reviews/:movieId
// @desc    Lấy tất cả review của 1 phim
// @access  Public
// ================================================================
router.get("/:movieId", async (req, res) => {
  try {
    const reviews = await Review.find({ movie: req.params.movieId })
      .populate("user", "name avatar")
      .sort({ createdAt: -1 });

    // Tính điểm trung bình
    const avgRating =
      reviews.length > 0
        ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
        : 0;

    res.json({ reviews, avgRating: parseFloat(avgRating), total: reviews.length });
  } catch (error) {
    res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
  }
});

// ================================================================
// @route   POST /api/reviews
// @desc    Tạo hoặc cập nhật review cho 1 phim
// @access  Private (phải có vé đã dùng của phim đó)
// ================================================================
router.post("/", protect, async (req, res) => {
  const { movieId, rating, comment } = req.body;

  if (!movieId || !rating) {
    return res.status(400).json({ message: "Thiếu thông tin đánh giá" });
  }

  try {
    // Upsert: nếu đã review thì update, chưa thì tạo mới
    const review = await Review.findOneAndUpdate(
      { user: req.user._id, movie: movieId },
      { rating, comment },
      { new: true, upsert: true, runValidators: true }
    );

    await review.populate("user", "name avatar");
    res.status(201).json({ review, message: "Đánh giá đã được lưu!" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
  }
});

// ================================================================
// @route   GET /api/reviews/my/:movieId
// @desc    Lấy review của user hiện tại cho 1 phim
// @access  Private
// ================================================================
router.get("/my/:movieId", protect, async (req, res) => {
  try {
    const review = await Review.findOne({
      user: req.user._id,
      movie: req.params.movieId,
    });
    res.json({ review });
  } catch (error) {
    res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
  }
});

module.exports = router;
