const express = require("express");
const Showtime = require("../models/Showtime");
const { protect } = require("../middleware/auth");

const router = express.Router();

// ================================================================
// @route   GET /api/showtimes/:movieId
// @desc    Lấy tất cả suất chiếu của 1 phim (group by date)
// @access  Public
// ================================================================
router.get("/:movieId", async (req, res) => {
  try {
    const showtimes = await Showtime.find({ movie: req.params.movieId }).sort({ date: 1, time: 1 });

    // Group theo ngày để frontend dễ render
    const grouped = {};
    showtimes.forEach((s) => {
      if (!grouped[s.date]) grouped[s.date] = [];
      grouped[s.date].push(s);
    });

    res.json({ showtimes, grouped });
  } catch (error) {
    res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
  }
});

// ================================================================
// @route   GET /api/showtimes/detail/:id
// @desc    Lấy chi tiết 1 suất chiếu
// @access  Public
// ================================================================
router.get("/detail/:id", async (req, res) => {
  try {
    const showtime = await Showtime.findById(req.params.id).populate("movie");
    if (!showtime) return res.status(404).json({ message: "Không tìm thấy suất chiếu" });
    res.json({ showtime });
  } catch (error) {
    res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
  }
});

module.exports = router;
