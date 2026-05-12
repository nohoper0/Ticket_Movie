const express = require("express");
const Movie = require("../models/Movie");

const router = express.Router();

// ================================================================
// @route   GET /api/movies/now-playing
// @desc    Lấy danh sách phim đang chiếu
// @access  Public
// ================================================================
router.get("/now-playing", async (req, res) => {
  try {
    const movies = await Movie.find({ status: "now_playing" }).sort({ createdAt: -1 });
    res.json({ movies });
  } catch (error) {
    res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
  }
});

// ================================================================
// @route   GET /api/movies/coming-soon
// @desc    Lấy danh sách phim sắp chiếu
// @access  Public
// ================================================================
router.get("/coming-soon", async (req, res) => {
  try {
    const movies = await Movie.find({ status: "coming_soon" }).sort({ createdAt: -1 });
    res.json({ movies });
  } catch (error) {
    res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
  }
});

// ================================================================
// @route   GET /api/movies/search?q=&genre=Action&minRating=7&sort=rating&status=now_playing
// @desc    Tìm kiếm & lọc phim nâng cao
// @access  Public
// ================================================================
router.get("/search", async (req, res) => {
  const { q = "", genre, minRating, sort, status } = req.query;

  try {
    const filter = {};

    // Tìm theo tên hoặc tên thể loại
    if (q.trim()) {
      filter.$or = [
        { name: { $regex: q, $options: "i" } },
        { genre: { $regex: q, $options: "i" } },
      ];
    }

    // Lọc theo thể loại (có thể truyền nhiều: genre=Action&genre=Sci-Fi)
    if (genre && genre !== "All") {
      const genres = Array.isArray(genre) ? genre : [genre];
      filter.genre = { $regex: genres.join("|"), $options: "i" };
    }

    // Lọc theo rating tối thiểu
    if (minRating && !isNaN(minRating)) {
      filter.rating = { $gte: parseFloat(minRating) };
    }

    // Lọc theo trạng thái
    if (status && status !== "all") {
      filter.status = status;
    }

    // Sắp xếp
    let sortOption = { createdAt: -1 };
    if (sort === "rating") sortOption = { rating: -1 };
    else if (sort === "name") sortOption = { name: 1 };
    else if (sort === "newest") sortOption = { createdAt: -1 };

    const movies = await Movie.find(filter).sort(sortOption).limit(30);
    res.json({ movies, total: movies.length });
  } catch (error) {
    res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
  }
});


// ================================================================
// @route   GET /api/movies/:id
// @desc    Lấy chi tiết 1 phim
// @access  Public
// ================================================================
router.get("/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Không tìm thấy phim" });
    }
    res.json({ movie });
  } catch (error) {
    res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
  }
});

// ================================================================
// @route   POST /api/movies
// @desc    Thêm phim mới (dùng để seed data)
// @access  Public (chỉ dùng khi phát triển)
// ================================================================
router.post("/", async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    res.status(201).json({ movie });
  } catch (error) {
    res.status(400).json({ message: "Dữ liệu không hợp lệ", error: error.message });
  }
});

module.exports = router;
