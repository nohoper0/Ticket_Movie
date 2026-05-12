const nodemailer = require("nodemailer");

// Tạo transporter sử dụng Ethereal Email để test
const createTestTransporter = async () => {
  try {
    // Tạo tài khoản test ngẫu nhiên (nếu muốn tài khoản thật, thay config)
    const testAccount = await nodemailer.createTestAccount();
    
    return nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true cho port 465, false cho các port khác
      auth: {
        user: testAccount.user, // email tạo ngẫu nhiên
        pass: testAccount.pass, // password tạo ngẫu nhiên
      },
    });
  } catch (error) {
    console.error("Lỗi khi tạo test email account:", error);
    return null;
  }
};

/**
 * Hàm gửi email hóa đơn vé phim
 */
const sendTicketEmail = async (user, ticket, movie, showtime) => {
  try {
    const transporter = await createTestTransporter();
    if (!transporter) return;

    // Nội dung HTML của email
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <h2 style="color: #8B5CF6; text-align: center;">🎬 Ticket Movie - Đặt Vé Thành Công!</h2>
        <p>Xin chào <strong>${user.name || "Khách hàng"}</strong>,</p>
        <p>Cảm ơn bạn đã đặt vé qua hệ thống Ticket Movie. Dưới đây là thông tin vé của bạn:</p>
        
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #333;">${movie?.name || "Tên phim chưa cập nhật"}</h3>
          <p><strong>🕒 Thời gian:</strong> ${showtime?.date || ticket.date} - ${showtime?.time || ticket.time}</p>
          <p><strong>📍 Rạp:</strong> ${showtime?.cinema || "Cinema 1"} - ${showtime?.format || "IMAX"}</p>
          <p><strong>💺 Ghế:</strong> ${ticket.seats.join(", ")}</p>
          <p><strong>💰 Tổng tiền:</strong> ${ticket.total.toLocaleString("vi-VN")} đ</p>
        </div>

        <div style="text-align: center; margin-top: 30px;">
          <p style="font-size: 14px; color: #666;">Mã vé điện tử của bạn:</p>
          <div style="font-size: 24px; letter-spacing: 2px; font-weight: bold; background: #eee; display: inline-block; padding: 10px 20px; border-radius: 5px;">
            ${ticket._id.toString().slice(-8).toUpperCase()}
          </div>
          <p style="font-size: 12px; color: #999; margin-top: 10px;">Vui lòng xuất trình mã này cho nhân viên rạp khi đến nơi.</p>
        </div>
      </div>
    `;

    // Thiết lập thông tin người gửi và người nhận
    const mailOptions = {
      from: '"Ticket Movie" <noreply@ticketmovie.com>',
      to: user.email || "customer@example.com",
      subject: `[Ticket Movie] Hóa đơn đặt vé - ${movie?.name || "Phim"}`,
      html: htmlContent,
    };

    // Gửi email
    const info = await transporter.sendMail(mailOptions);

    console.log("-----------------------------------------");
    console.log("✉️ Email sent: %s", info.messageId);
    console.log("🔗 Xem trước email tại: %s", nodemailer.getTestMessageUrl(info));
    console.log("-----------------------------------------");
    
    return info;
  } catch (error) {
    console.error("Lỗi khi gửi email:", error);
  }
};

module.exports = {
  sendTicketEmail,
};
