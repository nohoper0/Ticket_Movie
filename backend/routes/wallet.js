const express = require("express");
const User = require("../models/User");
const Transaction = require("../models/Transaction");
const { protect } = require("../middleware/auth");

const router = express.Router();

// ================================================================
// @route   GET /api/wallet
// @desc    Lấy số dư ví và lịch sử giao dịch
// @access  Private
// ================================================================
router.get("/", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("balance name");
    const transactions = await Transaction.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(20);

    res.json({ balance: user.balance, transactions });
  } catch (error) {
    res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
  }
});

// ================================================================
// @route   POST /api/wallet/topup
// @desc    Nạp tiền vào ví
// @access  Private
// ================================================================
router.post("/topup", protect, async (req, res) => {
  const { amount } = req.body;
  const validAmounts = [50000, 100000, 150000, 200000, 500000];

  if (!amount || !validAmounts.includes(Number(amount))) {
    return res.status(400).json({
      message: `Mệnh giá không hợp lệ. Chọn: ${validAmounts.map((a) => `Rp ${a.toLocaleString()}`).join(", ")}`,
    });
  }

  try {
    const user = await User.findById(req.user._id);
    user.balance += Number(amount);
    await user.save();

    await Transaction.create({
      user: req.user._id,
      type: "topup",
      amount: Number(amount),
      note: `Nạp Rp ${Number(amount).toLocaleString()} vào ví`,
      status: "success",
    });

    res.json({
      balance: user.balance,
      message: `Nạp thành công Rp ${Number(amount).toLocaleString()}!`,
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
  }
});

module.exports = router;
