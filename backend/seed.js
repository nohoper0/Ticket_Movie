const mongoose = require("mongoose");
const Movie = require("./models/Movie");
const Showtime = require("./models/Showtime");
require("dotenv").config();

const sampleMovies = [
  {
    name: "Avengers: Secret Wars",
    genre: "Action, Sci-Fi",
    rating: 9.1,
    imageUrl: "http://192.168.100.17:5000/img/avengers.jpg",
    duration: "2h 45m",
    synopsis: "The Avengers face their greatest challenge yet.",
    status: "now_playing",
    releaseDate: "May 2025",
  },
  {
    name: "Spider-Man Beyond",
    genre: "Action, Adventure",
    rating: 8.8,
    imageUrl: "http://192.168.100.17:5000/img/spider_man.jpg",
    duration: "2h 20m",
    synopsis: "Miles Morales embarks on a new multiverse adventure.",
    status: "now_playing",
    releaseDate: "May 2025",
  },
  {
    name: "Tenki no Ko",
    genre: "Drama, Romance",
    rating: 8.2,
    imageUrl: "http://192.168.100.17:5000/img/tenki_no_ko.jpg",
    duration: "1h 55m",
    synopsis: "A boy meets a girl who can control the weather.",
    status: "now_playing",
    releaseDate: "June 2025",
  },
  {
    name: "Your Name",
    genre: "Sci-Fi, Drama",
    rating: 8.9,
    imageUrl: "http://192.168.100.17:5000/img/your_name.jpg",
    duration: "1h 52m",
    synopsis: "Two strangers find themselves linked in a bizarre way.",
    status: "now_playing",
    releaseDate: "June 2025",
  },
  {
    name: "Tử Chiến Trên Không",
    genre: "Action, Thriller",
    rating: 8.5,
    imageUrl: "http://192.168.100.17:5000/img/tu_chien_tren_khong.jpg",
    duration: "2h 10m",
    synopsis: "An intense aerial battle for survival.",
    status: "now_playing",
    releaseDate: "July 2025",
  },
  {
    name: "Alien",
    genre: "Horror, Sci-Fi",
    rating: 8.7,
    imageUrl: "http://192.168.100.17:5000/img/alien.jpg",
    duration: "1h 57m",
    synopsis: "The crew of a spacecraft encounters a deadly alien.",
    status: "now_playing",
    releaseDate: "July 2025",
  },
  {
    name: "Tafiti Náo Loạn Sa Mạc",
    genre: "Animation, Adventure",
    rating: 8.4,
    imageUrl: "http://192.168.100.17:5000/img/tafiti_nao_loan_sa_mac.jpg",
    duration: "1h 40m",
    synopsis: "An animated adventure in the wild desert.",
    status: "coming_soon",
    releaseDate: "Aug 2025",
  },
  {
    name: "Câu Chuyện Đồ Chơi",
    genre: "Animation, Family",
    rating: 8.4,
    imageUrl: "http://192.168.100.17:5000/img/cau_chuyen_do_choi_5.jpg",
    duration: "1h 45m",
    synopsis: "Woody and friends are back for another adventure.",
    status: "coming_soon",
    releaseDate: "Aug 2025",
  },
  {
    name: "The Godfather",
    genre: "Crime, Drama",
    rating: 9.2,
    imageUrl: "http://192.168.100.17:5000/img/the_godfather.jpg",
    duration: "2h 55m",
    synopsis: "The aging patriarch of a crime dynasty.",
    status: "coming_soon",
    releaseDate: "Sep 2025",
  },
  {
    name: "Deep Water",
    genre: "Mystery, Thriller",
    rating: 8.6,
    imageUrl: "http://192.168.100.17:5000/img/deep_water.jpg",
    duration: "1h 50m",
    synopsis: "A husband allows his wife to have affairs.",
    status: "coming_soon",
    releaseDate: "Sep 2025",
  },
];

const getUpcomingDates = () => {
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    dates.push(d.toISOString().split("T")[0]);
  }
  return dates;
};

const cinemas = ["XXI Grand Indonesia", "CGV Blitz Megamall", "Cinépolis Kota Kasablanka"];
const timeSlots = [
  { time: "10:00", format: "Regular", price: 45000 },
  { time: "13:15", format: "IMAX", price: 85000 },
  { time: "16:30", format: "Regular", price: 50000 },
  { time: "19:45", format: "IMAX", price: 90000 },
  { time: "22:00", format: "4DX", price: 100000 },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Kết nối MongoDB thành công");

    await Movie.deleteMany({});
    await Showtime.deleteMany({});
    console.log("🗑️  Đã xóa dữ liệu cũ (phim + suất chiếu)");

    const insertedMovies = await Movie.insertMany(sampleMovies);
    console.log(`🎬 Đã seed ${insertedMovies.length} phim thành công!`);

    const dates = getUpcomingDates();
    const showtimeDocs = [];
    const nowPlayingMovies = insertedMovies.filter((m) => m.status === "now_playing");

    nowPlayingMovies.forEach((movie) => {
      dates.forEach((date) => {
        cinemas.slice(0, 2).forEach((cinema) => {
          timeSlots.slice(0, 3).forEach((slot) => {
            showtimeDocs.push({
              movie: movie._id,
              cinema,
              date,
              time: slot.time,
              format: slot.format,
              price: slot.price,
              availableSeats: Math.floor(Math.random() * 20) + 36,
            });
          });
        });
      });
    });

    await Showtime.insertMany(showtimeDocs);
    console.log(`📅 Đã seed ${showtimeDocs.length} suất chiếu thành công!`);

    mongoose.connection.close();
    console.log("🔌 Đóng kết nối MongoDB");
  } catch (error) {
    console.error("❌ Lỗi seed database:", error);
    process.exit(1);
  }
};

seedDB();