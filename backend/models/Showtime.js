const mongoose = require("mongoose");

const ShowtimeSchema = new mongoose.Schema(
  {
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },
    cinema: {
      type: String,
      required: true,
    },
    date: {
      type: String, // "2025-05-10"
      required: true,
    },
    time: {
      type: String, // "19:45"
      required: true,
    },
    format: {
      type: String,
      enum: ["Regular", "IMAX", "4DX", "Dolby"],
      default: "Regular",
    },
    price: {
      type: Number,
      default: 50000,
    },
    availableSeats: {
      type: Number,
      default: 56,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Showtime", ShowtimeSchema);
