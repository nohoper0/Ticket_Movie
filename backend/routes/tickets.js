const express = require("express");
const Ticket = require("../models/Ticket");
const User = require("../models/User");
const Transaction = require("../models/Transaction");
const { protect } = require("../middleware/auth");
const { sendTicketEmail } = require("../utils/sendEmail");

const router = express.Router();

// ================================================================
// @route   GET /api/tickets/my-tickets
// @desc    Lấy toàn bộ vé của user đang đăng nhập
// @access  Private
// ================================================================
router.get("/my-tickets", protect, async (req, res) => {
  try {
    const tickets = await Ticket.find({ user: req.user._id })
      .populate("movie", "name imageUrl genre rating duration") // lấy thêm thông tin phim
      .sort({ createdAt: -1 }); // mới nhất lên trước

    res.json({ tickets });
  } catch (error) {
    res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
  }
});

// ================================================================
// @route   POST /api/tickets
// @desc    Tạo vé mới sau khi thanh toán
// @access  Private
// ================================================================
router.post("/", protect, async (req, res) => {
  const { movieId, seats, date, time, total, paymentMethod } = req.body;

  if (!movieId || !seats || seats.length === 0) {
    return res.status(400).json({ message: "Thiếu thông tin vé (movieId hoặc seats)" });
  }

  try {
    // 1. Kiểm tra xem có ghế nào đã bị người khác đặt chưa
    const existingTickets = await Ticket.find({ movie: movieId });
    let bookedSeats = [];
    existingTickets.forEach(t => {
      if (t.seats && Array.isArray(t.seats)) {
        bookedSeats.push(...t.seats);
      }
    });

    const isConflict = seats.some(seat => bookedSeats.includes(seat));
    if (isConflict) {
      return res.status(400).json({ message: "Một hoặc nhiều ghế đã được đặt. Vui lòng chọn ghế khác." });
    }

    // 2. Nếu thanh toán bằng ví, trừ tiền
    if (paymentMethod === "wallet") {
      const user = await User.findById(req.user._id);
      if (user.balance < total) {
        return res.status(400).json({ message: "Số dư ví không đủ để thanh toán. Vui lòng nạp thêm." });
      }
      user.balance -= total;
      await user.save();
      await Transaction.create({
        user: req.user._id,
        type: "payment",
        amount: total,
        note: `Thanh toán vé xem phim`,
        status: "success",
      });
    }

    // 3. Tạo vé mới
    const ticket = await Ticket.create({
      user: req.user._id,
      movie: movieId,
      seats,
      date: date || "Sat, 10 May 2025",
      time: time || "19:45",
      total,
      paymentMethod: paymentMethod || "wallet",
    });

    // Populate thông tin phim để trả về đầy đủ cho client
    await ticket.populate("movie", "name imageUrl genre rating duration");

    // Gửi email hóa đơn ngầm (không đợi để tránh block request)
    User.findById(req.user._id).then(user => {
      if (user) {
        sendTicketEmail(user, ticket, ticket.movie, {
          date: ticket.date,
          time: ticket.time,
          cinema: "Cinema 1",
          format: "IMAX"
        });
      }
    }).catch(err => console.error("Lỗi khi fetch user để gửi email:", err));

    res.status(201).json({ ticket });
  } catch (error) {
    res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
  }
});

// ================================================================
// @route   GET /api/tickets/:id
// @desc    Lấy chi tiết 1 vé
// @access  Private
// ================================================================
router.get("/:id", protect, async (req, res) => {
  try {
    const ticket = await Ticket.findOne({
      _id: req.params.id,
      user: req.user._id, // đảm bảo chỉ xem vé của chính mình
    }).populate("movie", "name imageUrl genre rating duration");

    if (!ticket) {
      return res.status(404).json({ message: "Không tìm thấy vé" });
    }

    res.json({ ticket });
  } catch (error) {
    res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
  }
});

// ================================================================
// @route   GET /api/tickets/booked-seats/:movieId
// @desc    Lấy danh sách các ghế đã được đặt của 1 phim
// @access  Private
// ================================================================
router.get("/booked-seats/:movieId", protect, async (req, res) => {
  try {
    const tickets = await Ticket.find({ movie: req.params.movieId });
    
    let bookedSeats = [];
    tickets.forEach(ticket => {
      if (ticket.seats && Array.isArray(ticket.seats)) {
        bookedSeats.push(...ticket.seats);
      }
    });

    res.json({ bookedSeats });
  } catch (error) {
    res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
  }
});

module.exports = router;
