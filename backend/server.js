const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
require("dotenv").config();
const path = require("path");

// Import Routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const movieRoutes = require("./routes/movies");
const ticketRoutes = require("./routes/tickets");
const showtimeRoutes = require("./routes/showtimes");
const reviewRoutes = require("./routes/reviews");
const promoRoutes = require("./routes/promos");
const walletRoutes = require("./routes/wallet");

const app = express();
const PORT = process.env.PORT || 5000;

// ================================================================
// MIDDLEWARE
// ================================================================

app.use(cors()); // Cho phép React Native gọi API
app.use(express.json()); // Parse JSON body
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize()); // Chống NoSQL Injection
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use('/img', express.static(path.join(__dirname, 'public/img')));

// ================================================================
// KẾT NỐI DATABASE
// ================================================================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Kết nối MongoDB thành công"))
  .catch((err) => {
    console.error("❌ Lỗi kết nối MongoDB:", err.message);
    process.exit(1);
  });

// ================================================================
// ROUTES
// ================================================================
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/showtimes", showtimeRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/promos", promoRoutes);
app.use("/api/wallet", walletRoutes);

// Route kiểm tra server còn sống
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Ticket Movie API đang chạy 🎬" });
});

// ================================================================
// GLOBAL ERROR HANDLER
// ================================================================
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Lỗi máy chủ không xác định" });
});

// ================================================================
// KHỞI ĐỘNG SERVER
// ================================================================
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
  console.log(`📡 API Base URL: http://localhost:${PORT}/api`);
});
