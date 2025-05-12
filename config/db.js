require("dotenv").config();
const mysql = require("mysql2/promise");

let pool;

(async () => {
  try {
    if (process.env.DATABASE_URL) {
      // 🌐 Opción 1: Conexión con URL completa (ej. Railway)
      pool = mysql.createPool(process.env.DATABASE_URL);
      console.log("✅ Conectando con DATABASE_URL...");
    } else {
      // 🧩 Opción 2: Conexión con variables individuales
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

    // 🔍 Probar conexión inicial
    const connection = await pool.getConnection();
    await connection.ping();
    console.log("✅ Conexión a MySQL establecida exitosamente.");
    connection.release();
  } catch (error) {
    console.error("❌ Error conectando a MySQL:", error.message);
    process.exit(1); // Detiene la app si falla la conexión
  }
})();

module.exports = {
  query: (...args) => pool.query(...args),
  pool,
};
