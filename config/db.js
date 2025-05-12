require("dotenv").config();
const mysql = require("mysql2/promise");

let pool;

if (process.env.DATABASE_URL) {
  // 🌐 Opción 1: Usar cadena de conexión completa desde DATABASE_URL
  pool = mysql.createPool(process.env.DATABASE_URL);
  console.log("✅ Conectando con DATABASE_URL...");
} else {
  // 🧩 Opción 2: Usar variables separadas
  pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
  });

  console.log("✅ Conectando con variables separadas...");
  console.log("Env vars:", {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
    port: process.env.DB_PORT,
  });
}

module.exports = pool;
