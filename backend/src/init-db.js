// src/init-db.js
require("dotenv").config();
const pool = require("./db");

(async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        priority TEXT CHECK(priority IN ('Low', 'Medium', 'High')) DEFAULT 'Low',
        status TEXT CHECK(status IN ('Open', 'In Progress', 'Done', 'Blocked')) DEFAULT 'Open',
        due_date DATE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("✅ PostgreSQL tasks table ready!");
  } catch (error) {
    console.error("❌ Error creating table:", error);
  } finally {
    pool.end();
  }
})();
