const dotenv = require("dotenv");
dotenv.config();

const app = require("./app"); // app.js'i içeri al
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Sunucu ${PORT} portunda başarıyla çalışıyor.`);
    });
  })
  .catch((err) => {
    console.error("❌ Veritabanı bağlantısı başarısız oldu:", err);
  });
