const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Tên không được để trống"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email không được để trống"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Email không hợp lệ"],
    },
    password: {
      type: String,
      required: [true, "Mật khẩu không được để trống"],
      minlength: [6, "Mật khẩu tối thiểu 6 ký tự"],
    },
    avatar: {
      type: String,
      default: "https://ui-avatars.com/api/?background=ff6b2c&color=fff&name=User",
    },
    balance: {
      type: Number,
      default: 150000,
    },
    wishlist: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
    }],
  },
  { timestamps: true }
);

// Hash mật khẩu trước khi lưu vào DB
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Phương thức so sánh mật khẩu khi đăng nhập
UserSchema.methods.comparePassword = async function (inputPassword) {
  return bcrypt.compare(inputPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
