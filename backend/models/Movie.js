const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Tên phim không được để trống"],
      trim: true,
    },
    genre: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 0,
      max: 10,
      default: 7.5,
    },
    // URL ảnh poster từ cloud (Cloudinary, S3, v.v.)
    imageUrl: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      default: "2h 00m",
    },
    synopsis: {
      type: String,
      default: "Chưa có mô tả.",
    },
    // "now_playing" | "coming_soon"
    status: {
      type: String,
      enum: ["now_playing", "coming_soon"],
      default: "now_playing",
    },
    releaseDate: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", MovieSchema);
