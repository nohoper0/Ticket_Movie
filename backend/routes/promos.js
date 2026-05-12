const express = require("express");
const Promo = require("../models/Promo");
const { protect } = require("../middleware/auth");

const router = express.Router();

// ================================================================
// @route   POST /api/promos/validate
// @desc    Xác thực mã giảm giá và tính số tiền được giảm
// @access  Private
// ================================================================
router.post("/validate", protect, async (req, res) => {
  const { code, orderTotal } = req.body;

  if (!code) {
    return res.status(400).json({ message: "Vui lòng nhập mã giảm giá" });
  }

  try {
    const promo = await Promo.findOne({ code: code.toUpperCase().trim() });

    if (!promo) {
      return res.status(404).json({ message: "Mã giảm giá không tồn tại" });
    }

    if (!promo.isActive) {
      return res.status(400).json({ message: "Mã giảm giá đã bị vô hiệu hóa" });
    }

    if (new Date() > promo.expiryDate) {
      return res.status(400).json({ message: "Mã giảm giá đã hết hạn" });
    }

    if (promo.usedCount >= promo.usageLimit) {
      return res.status(400).json({ message: "Mã giảm giá đã hết lượt sử dụng" });
    }

    if (orderTotal < promo.minOrder) {
      return res.status(400).json({
        message: `Đơn hàng tối thiểu Rp ${promo.minOrder.toLocaleString()} để dùng mã này`,
      });
    }

    // Tính số tiền được giảm
    const rawDiscount = Math.floor((orderTotal * promo.discountPercent) / 100);
    const discount = Math.min(rawDiscount, promo.maxDiscount);

    res.json({
      valid: true,
      promo: {
        code: promo.code,
        discountPercent: promo.discountPercent,
        description: promo.description,
      },
      discount,
      finalTotal: orderTotal - discount,
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
  }
});

module.exports = router;
