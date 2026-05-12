

# 🎬 Tên đề tài: Ứng dụng Đặt Vé Xem Phim — Ticket Movie App

---

<h1 style="font-size: 60px; font-weight: bold;">
  Link video demo:
</h1>

https://drive.google.com/file/d/1sAk9MWgPbxP8DCFyqoEKR5pPAzl-hO9M/view?usp=sharing


## 📖 Giới thiệu Website / Hệ thống

**Ticket Movie App** là một ứng dụng di động đặt vé xem phim trực tuyến được xây dựng trên nền tảng **React Native (Expo)**. Ứng dụng cho phép người dùng duyệt danh sách phim đang chiếu & sắp chiếu, xem thông tin chi tiết phim, chọn rạp — suất chiếu — chỗ ngồi, và tiến hành thanh toán đặt vé chỉ trong vài thao tác.

### ✨ Tính năng chính

| # | Tính năng | Mô tả |
|:-:|:---|:---|
| 1 | 🏠 **Trang chủ phim** | Hiển thị danh sách phim đang chiếu (Now Playing) và sắp chiếu (Coming Soon) với giao diện carousel trực quan |
| 2 | 🔍 **Tìm kiếm phim** | Tìm kiếm phim theo tên, thể loại với bộ lọc thông minh |
| 3 | 🎬 **Chi tiết phim** | Xem poster, mô tả, thể loại, thời lượng, đánh giá và đánh giá từ cộng đồng |
| 4 | 🕐 **Chọn suất chiếu** | Chọn rạp, ngày chiếu, giờ chiếu và định dạng (Regular / IMAX / 4DX) |
| 5 | 💺 **Chọn ghế ngồi** | Giao diện chọn ghế trực quan dạng sơ đồ rạp chiếu phim |
| 6 | 💳 **Thanh toán & Đặt vé** | Xác nhận thông tin, áp dụng mã khuyến mãi, thanh toán qua ví điện tử |
| 7 | 🎟️ **Quản lý vé** | Xem danh sách vé đã đặt kèm mã QR xác nhận |
| 8 | 👤 **Hồ sơ cá nhân** | Đăng ký, đăng nhập, chỉnh sửa thông tin cá nhân, đổi avatar |
| 9 | 💰 **Ví điện tử** | Nạp tiền và quản lý số dư ví để thanh toán vé |
| 10 | ❤️ **Danh sách yêu thích** | Lưu phim yêu thích để xem lại sau |
| 11 | ⭐ **Đánh giá phim** | Viết đánh giá và chấm điểm phim sau khi xem |
| 12 | 🎁 **Khuyến mãi** | Hệ thống mã giảm giá / promo code |

### 📐 Kiến trúc hệ thống

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND (Mobile App)                │
│         React Native · Expo · React Navigation          │
│                                                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐  │
│  │  Screens │  │Components│  │  Context  │  │  Utils  │  │
│  │ (16 màn) │  │          │  │ Auth/Ticket│  │ API,.. │  │
│  └──────────┘  └──────────┘  └──────────┘  └────────┘  │
│                        │ Axios (REST API)                │
└────────────────────────┼────────────────────────────────┘
                         │
                    HTTP Request
                         │
┌────────────────────────┼────────────────────────────────┐
│                    BACKEND (Server)                      │
│           Node.js · Express.js · JWT Auth                │
│                                                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐  │
│  │  Routes  │  │Middleware│  │  Models   │  │  Utils  │  │
│  │ (8 API)  │  │ (Auth)   │  │ (7 model)│  │        │  │
│  └──────────┘  └──────────┘  └──────────┘  └────────┘  │
│                        │ Mongoose ODM                    │
└────────────────────────┼────────────────────────────────┘
                         │
                    MongoDB Atlas
                         │
┌────────────────────────┼────────────────────────────────┐
│                    DATABASE                              │
│  MongoDB (Atlas / Local)                                 │
│                                                         │
│  Collections: Users, Movies, Showtimes, Tickets,         │
│               Reviews, Promos, Transactions              │
└─────────────────────────────────────────────────────────┘
```

---

## 👥 Danh sách thành viên & Phân công nhiệm vụ

| STT | Họ và tên | MSSV | Vai trò | Phân công nhiệm vụ cụ thể |
|:---:|:---|:---:|:---:|:---|
| 1 | Nguyễn Trung Kiên | 23810310311 | 👑 Leader | Thiết kế & phát triển Frontend (React Native), UI/UX toàn bộ ứng dụng, tích hợp API, Navigation, Context State Management, Deploy & Fix bug |
| 2 | Vũ Quang Huy | 23810310290 | Member | Phát triển Backend (Node.js, Express), thiết kế Database Schema (MongoDB), xây dựng RESTful API, Middleware Auth (JWT) |
| 3 | Tăng Thành Đạt | 23810310311 | Member | Viết báo cáo đồ án, tìm tài liệu tham khảo, kiểm thử ứng dụng (Testing), Fix bug, thiết kế Seed Data, hỗ trợ Frontend |

## 🛠 Công nghệ sử dụng

### Frontend (Mobile Application)

| Công nghệ | Phiên bản | Mục đích |
|:---|:---:|:---|
| **React Native** | 0.81.5 | Framework phát triển ứng dụng di động đa nền tảng (iOS, Android, Web) |
| **Expo** | ~54.0 | Bộ công cụ phát triển nhanh cho React Native, hỗ trợ build & test |
| **React Navigation** | 7.x | Điều hướng giữa các màn hình (Stack, Bottom Tabs) |
| **Axios** | 1.16.0 | HTTP Client gọi RESTful API từ Backend |
| **AsyncStorage** | 2.2.0 | Lưu trữ dữ liệu cục bộ (token, user info) |
| **Expo Linear Gradient** | ~15.0 | Hiệu ứng gradient cho giao diện |
| **React Native Reanimated** | ~4.1 | Animation mượt mà cho UI |
| **React Native QRCode SVG** | 6.3.21 | Tạo mã QR trên vé điện tử |
| **Expo Image Picker** | ~17.0 | Chọn & upload ảnh đại diện |
| **Expo Haptics** | ~15.0 | Phản hồi rung khi tương tác |

### Backend (Server API)

| Công nghệ | Phiên bản | Mục đích |
|:---|:---:|:---|
| **Node.js** | ≥ 14 | Runtime JavaScript phía server |
| **Express.js** | 4.19.2 | Framework xây dựng RESTful API |
| **MongoDB** | — | Cơ sở dữ liệu NoSQL lưu trữ dữ liệu |
| **Mongoose** | 8.4.0 | ODM (Object Data Modeling) cho MongoDB |
| **JSON Web Token (JWT)** | 9.0.2 | Xác thực và phân quyền người dùng |
| **bcryptjs** | 2.4.3 | Mã hóa mật khẩu người dùng |
| **Helmet** | 8.1.0 | Bảo mật HTTP Headers |
| **express-mongo-sanitize** | 2.2.0 | Chống tấn công NoSQL Injection |
| **express-rate-limit** | 8.5.1 | Giới hạn số request, chống DDoS |
| **Nodemailer** | 8.0.7 | Gửi email (quên mật khẩu, xác nhận) |
| **dotenv** | 16.4.5 | Quản lý biến môi trường (.env) |
| **Nodemon** | 3.1.3 | Tự động restart server khi dev |

### Công cụ phát triển

| Công cụ | Mục đích |
|:---|:---|
| **Visual Studio Code** | Code Editor chính |
| **Git & GitHub** | Quản lý phiên bản mã nguồn |
| **MongoDB Atlas** | Dịch vụ Database đám mây |
| **Expo Go** | Ứng dụng test trên điện thoại thật |
| **Postman** | Test API Backend |

---

## ⚙️ Hướng dẫn cài đặt

### 📋 Yêu cầu hệ thống (Prerequisites)

Trước khi bắt đầu, hãy đảm bảo máy tính đã cài đặt đầy đủ:

| Yêu cầu | Phiên bản tối thiểu | Link tải |
|:---|:---:|:---|
| **Node.js** | ≥ 14.x | [https://nodejs.org](https://nodejs.org) |
| **npm** | ≥ 6.x | (Đi kèm Node.js) |
| **Git** | Bất kỳ | [https://git-scm.com](https://git-scm.com) |
| **MongoDB** | — | Local hoặc [MongoDB Atlas](https://cloud.mongodb.com) |
| **Expo Go** *(điện thoại)* | Mới nhất | [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent) / [App Store](https://apps.apple.com/app/expo-go/id982107779) |

> **💡 Khuyến nghị:** Sử dụng **MongoDB Atlas** (miễn phí) để không cần cài MongoDB trên máy local.

### 📥 Bước 1: Clone dự án về máy

```bash
git clone https://github.com/nohoper0/TicketMovie_Fixed_v3.git
cd TicketMovie_Fixed_v3
```

### 📦 Bước 2: Cài đặt dependencies cho Backend

```bash
# Di chuyển vào thư mục backend
cd "TicketMovie_Fixed_v3 (1)/ticketmovie_fixed/backend"

# Cài đặt tất cả thư viện cần thiết
npm install
```

### 🔧 Bước 3: Cấu hình biến môi trường Backend

Tạo file `.env` trong thư mục `backend/` (hoặc sửa file có sẵn):

```bash
# Sao chép file mẫu
cp .env.example .env
```

Mở file `.env` và điền thông tin:

```env
# MongoDB Atlas Connection String
# Tạo cluster miễn phí tại: https://cloud.mongodb.com
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/ticket_movie?retryWrites=true&w=majority

# JWT Secret Key - Đặt một chuỗi bí mật bất kỳ
JWT_SECRET=ticket_movie_super_secret_key_2025

# Port Server
PORT=5000
```

### 📦 Bước 4: Cài đặt dependencies cho Frontend

```bash
# Mở Terminal mới, di chuyển vào thư mục frontend
cd "TicketMovie_Fixed_v3 (1)/ticketmovie_fixed/frontend"

# Cài đặt tất cả thư viện cần thiết
npm install
```

---

## 🚀 Hướng dẫn chạy Project

Project gồm **2 phần** cần chạy đồng thời: **Backend (Server API)** và **Frontend (Mobile App)**.  
Vui lòng mở **2 cửa sổ Terminal riêng biệt**.

### Terminal 1️⃣ — Khởi động Backend Server

```bash
# Di chuyển vào thư mục backend
cd Ticket_Movie/backend

# (Lần đầu) Khởi tạo dữ liệu mẫu vào MongoDB
node seed.js

# Khởi chạy server ở chế độ development (tự restart khi thay đổi code)
npm run dev

# Hoặc khởi chạy server ở chế độ production
npm start
```

✅ Nếu thành công, Terminal sẽ hiển thị:

```
✅ Kết nối MongoDB thành công
🚀 Server đang chạy tại http://localhost:5000
📡 API Base URL: http://localhost:5000/api
```

> Kiểm tra server hoạt động bằng cách truy cập: [http://localhost:5000/api/health](http://localhost:5000/api/health)

---

### Terminal 2️⃣ — Khởi động Frontend App

```bash
# Di chuyển vào thư mục frontend
cd Ticket_Movie/frontend

# Khởi chạy ứng dụng với Expo
npx expo start
```

Sau khi Expo khởi động, chọn nền tảng chạy:

| Phím tắt | Nền tảng | Ghi chú |
|:---:|:---|:---|
| `w` | 🌐 Web Browser | Chạy ngay trên trình duyệt |
| `a` | 🤖 Android Emulator | Cần cài Android Studio |
| `i` | 🍎 iOS Simulator | Chỉ trên macOS, cần Xcode |
| QR Code | 📱 Điện thoại thật | Quét QR bằng app **Expo Go** |

---

### 📱 Cấu hình cho điện thoại thật (qua Expo Go)

Nếu chạy trên **điện thoại thật**, cần cấu hình IP để App kết nối được tới Backend:

1. Mở Terminal / CMD, gõ lệnh:

   ```bash
   # Windows
   ipconfig

   # macOS / Linux
   ifconfig
   ```

2. Tìm địa chỉ **IPv4 Address** (ví dụ: `192.168.1.5`)

3. Mở file `frontend/utils/api.js`, tìm dòng:

   ```javascript
   const BASE_URL = 'http://192.168.100.17:5000/api';
   ```

4. Đổi `192.168.100.17` thành IP của máy bạn:

   ```javascript
   const BASE_URL = 'http://192.168.1.5:5000/api';
   ```

> **📝 Lưu ý:** Điện thoại và máy tính phải kết nối **cùng mạng WiFi**. Nếu chạy trên Emulator hoặc Web thì **không cần** đổi IP.

---

## 🔐 Tài khoản Demo

Sau khi chạy lệnh `node seed.js` để khởi tạo dữ liệu mẫu, bạn có thể đăng ký tài khoản mới hoặc sử dụng tài khoản test:

| Loại tài khoản | Email | Mật khẩu |
|:---|:---|:---|
| 👤 Người dùng | `test@gmail.com` | `123456` |
| 👤 Người dùng 2 | `user@gmail.com` | `123456` |

> **📝 Lưu ý:** Nếu tài khoản demo chưa có trong database, vui lòng **Đăng ký tài khoản mới** trực tiếp trên ứng dụng bằng cách nhấn **"Đăng ký"** tại màn hình Login. Ứng dụng hỗ trợ đăng ký tự do.

---

## 📁 Cấu trúc thư mục dự án

```
TicketMovie_Fixed_v3/
├── README.md                          # 📄 File hướng dẫn (file này)
└── TicketMovie_Fixed_v3 (1)/
    └── ticketmovie_fixed/
        ├── backend/                   # ⚙️ SERVER API
        │   ├── server.js              #    Entry point - Khởi tạo Express server
        │   ├── seed.js                #    Script khởi tạo dữ liệu mẫu
        │   ├── .env                   #    Biến môi trường (MongoDB URI, JWT Secret)
        │   ├── .env.example           #    File mẫu biến môi trường
        │   ├── package.json           #    Dependencies Backend
        │   ├── models/                #    📊 Mongoose Schema
        │   │   ├── User.js            #       Người dùng
        │   │   ├── Movie.js           #       Phim
        │   │   ├── Showtime.js        #       Suất chiếu
        │   │   ├── Ticket.js          #       Vé đã đặt
        │   │   ├── Review.js          #       Đánh giá phim
        │   │   ├── Promo.js           #       Mã khuyến mãi
        │   │   └── Transaction.js     #       Giao dịch ví
        │   ├── routes/                #    🛣️ API Endpoints
        │   │   ├── auth.js            #       /api/auth (Đăng nhập, Đăng ký)
        │   │   ├── users.js           #       /api/users (Quản lý người dùng)
        │   │   ├── movies.js          #       /api/movies (CRUD phim)
        │   │   ├── showtimes.js       #       /api/showtimes (Suất chiếu)
        │   │   ├── tickets.js         #       /api/tickets (Đặt vé)
        │   │   ├── reviews.js         #       /api/reviews (Đánh giá)
        │   │   ├── promos.js          #       /api/promos (Khuyến mãi)
        │   │   └── wallet.js          #       /api/wallet (Ví điện tử)
        │   ├── middleware/            #    🔒 Middleware
        │   │   └── auth.js            #       Xác thực JWT Token
        │   ├── utils/                 #    🔧 Tiện ích
        │   └── public/img/            #    🖼️ Ảnh poster phim
        │
        └── frontend/                  # 📱 MOBILE APPLICATION
            ├── App.js                 #    Entry point - Root Component
            ├── index.js               #    Expo entry
            ├── app.json               #    Cấu hình Expo
            ├── package.json           #    Dependencies Frontend
            ├── screens/               #    📺 Các màn hình chính
            │   ├── SplashScreen.js     #       Màn hình khởi động
            │   ├── LoginScreen.js      #       Đăng nhập
            │   ├── RegisterScreen.js   #       Đăng ký
            │   ├── MovieHomeScreen.js  #       Trang chủ phim
            │   ├── SearchScreen.js     #       Tìm kiếm phim
            │   ├── MovieDetailScreen.js#       Chi tiết phim
            │   ├── ShowtimeScreen.js   #       Chọn suất chiếu
            │   ├── SeatSelectionScreen.js #    Chọn ghế ngồi
            │   ├── CheckoutScreen.js   #       Thanh toán
            │   ├── BookingConfirmedScreen.js # Xác nhận đặt vé
            │   ├── MyTicketsScreen.js   #      Vé của tôi
            │   ├── WalletScreen.js     #       Ví điện tử
            │   ├── WishlistScreen.js   #       Phim yêu thích
            │   ├── ProfileScreen.js    #       Hồ sơ cá nhân
            │   ├── EditProfileScreen.js#       Chỉnh sửa hồ sơ
            │   └── WriteReviewScreen.js#       Viết đánh giá
            ├── navigation/            #    🧭 Điều hướng
            │   ├── RootNavigator.js   #       Root (Auth check)
            │   ├── AuthStack.js       #       Stack đăng nhập/đăng ký
            │   ├── MainStack.js       #       Stack chính
            │   └── AppTabs.js         #       Bottom Tab Navigator
            ├── context/               #    🗃️ State Management
            │   ├── AuthContext.js      #       Context xác thực
            │   └── TicketContext.js    #       Context quản lý vé
            ├── components/            #    🧩 Components tái sử dụng
            ├── utils/                 #    🔧 Tiện ích
            │   ├── api.js             #       Axios client + Interceptors
            │   ├── colors.js          #       Bảng màu ứng dụng
            │   ├── storage.js         #       AsyncStorage helper
            │   └── alert.js           #       Alert helper
            └── assets/                #    🎨 Tài nguyên (icon, splash, ảnh)
```

---

## 🔌 API Endpoints

Tổng hợp các API Endpoint của Backend:

| Method | Endpoint | Mô tả | Auth |
|:---:|:---|:---|:---:|
| `POST` | `/api/auth/register` | Đăng ký tài khoản mới | ❌ |
| `POST` | `/api/auth/login` | Đăng nhập | ❌ |
| `GET` | `/api/users/profile` | Lấy thông tin người dùng | ✅ |
| `PUT` | `/api/users/profile` | Cập nhật thông tin cá nhân | ✅ |
| `GET` | `/api/movies` | Lấy danh sách phim | ❌ |
| `GET` | `/api/movies/:id` | Lấy chi tiết phim | ❌ |
| `GET` | `/api/showtimes` | Lấy suất chiếu theo phim | ❌ |
| `POST` | `/api/tickets` | Đặt vé xem phim | ✅ |
| `GET` | `/api/tickets/my` | Lấy danh sách vé đã đặt | ✅ |
| `POST` | `/api/reviews` | Viết đánh giá phim | ✅ |
| `GET` | `/api/reviews/:movieId` | Lấy đánh giá của phim | ❌ |
| `GET` | `/api/promos` | Lấy danh sách khuyến mãi | ✅ |
| `GET` | `/api/wallet/balance` | Xem số dư ví | ✅ |
| `POST` | `/api/wallet/topup` | Nạp tiền vào ví | ✅ |
| `GET` | `/api/health` | Kiểm tra trạng thái server | ❌ |

> ✅ = Cần gửi JWT Token trong Header `Authorization: Bearer <token>`

---

## ❓ Xử lý lỗi thường gặp

<details>
<summary><strong>❌ Lỗi "expo: command not found"</strong></summary>

```bash
# Cài đặt Expo CLI global
npm install -g expo-cli

# Hoặc chạy trực tiếp bằng npx
npx expo start
```

</details>

<details>
<summary><strong>❌ Lỗi kết nối MongoDB</strong></summary>

1. Kiểm tra file `.env` đã có `MONGO_URI` hợp lệ chưa
2. Kiểm tra IP hiện tại đã được whitelist trên MongoDB Atlas chưa
   - Vào Atlas → Network Access → Add IP: `0.0.0.0/0` (cho phép tất cả)
3. Kiểm tra username/password MongoDB Atlas

</details>

<details>
<summary><strong>❌ Lỗi "Network Error" khi gọi API từ App</strong></summary>

1. Kiểm tra Backend đã chạy chưa (`http://localhost:5000/api/health`)
2. Nếu chạy trên điện thoại thật: đổi IP trong `frontend/utils/api.js`
3. Đảm bảo điện thoại và máy tính cùng mạng WiFi

</details>

<details>
<summary><strong>❌ Lỗi "Module not found"</strong></summary>

```bash
# Xóa node_modules và cài lại
rm -rf node_modules package-lock.json
npm install
```

</details>

---

## 📸 Ảnh chụp màn hình *(Screenshots)*

## 📱 1 số giao diện của ứng dụng

<table align="center">
  <tr>
    <td align="center" width="220">
      <img src="https://github.com/user-attachments/assets/27ba144c-757f-473c-bba0-3fd9930fcf37" width="180"/><br/>
      <b>Home Screen</b>
    </td>
    <td align="center" width="220">
      <img src="https://github.com/user-attachments/assets/f8b8e7a2-b8be-45f7-82e5-65d7cd721be0" width="180"/><br/>
      <b>Search Screen</b>
    </td>
    <td align="center" width="220">
      <img src="https://github.com/user-attachments/assets/877f79d4-0faa-4fbf-a466-31fc516944e6" width="180"/><br/>
      <b>Movie Detail</b>
    </td>
  </tr>

  <tr>
    <td align="center" width="220">
      <img src="https://github.com/user-attachments/assets/10c81e09-afdc-4741-9951-95df76834c09" width="180"/><br/>
      <b>Showtime Selection</b>
    </td>
    <td align="center" width="220">
      <img src="https://github.com/user-attachments/assets/9b667c2f-1646-41e2-a33a-ecede2187651" width="180"/><br/>
      <b>Seat Selection</b>
    </td>
    <td align="center" width="220">
      <img src="https://github.com/user-attachments/assets/8101c97f-8629-4b09-9cfb-16a7d689e095" width="180"/><br/>
      <b>Payment Screen</b>
    </td>
  </tr>

  <tr>
    <td align="center" width="220">
      <img src="https://github.com/user-attachments/assets/afa7002f-201f-4cd0-ae1e-d02354fae768" width="180"/><br/>
      <b>My Ticket</b>
    </td>
    <td align="center" width="220">
      <img src="https://github.com/user-attachments/assets/39daa3bd-1c90-40ed-87cf-873b8b65db30" width="180"/><br/>
      <b>Profile Screen</b>
    </td>
    <td align="center" width="220">
      <img src="https://github.com/user-attachments/assets/06cc9524-f5af-43fe-9ee0-97fe792de9d8" width="180"/><br/>
      <b>Change Password</b>
    </td>
  </tr>
</table>


## Link video demo: 

https://drive.google.com/file/d/1sAk9MWgPbxP8DCFyqoEKR5pPAzl-hO9M/view?usp=sharing

## 📄 License
Dự án này được phát triển phục vụ mục đích **học tập** tại trường đại học.  
© 2025 — Ticket Movie Team. All rights reserved.
<p align="center">
  Made with ❤️ by <strong>Ticket Movie Team</strong>
</p>
