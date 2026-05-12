const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema(
  {
    // Liên kết đến User và Movie
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },
    // Danh sách ghế đã chọn, ví dụ: ["A1", "A2", "B3"]
    seats: {
      type: [String],
      required: true,
    },
    // Ngày và giờ chiếu
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    // Tổng tiền sau khi tính phí
    total: {
      type: Number,
      required: true,
    },
    // Phương thức thanh toán đã chọn
    paymentMethod: {
      type: String,
      enum: ["card", "gopay", "wallet", "ovo"],
      default: "wallet",
    },
    // Trạng thái đơn hàng
    status: {
      type: String,
      enum: ["confirmed", "cancelled", "used"],
      default: "confirmed",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ticket", TicketSchema);
