const Database = require("better-sqlite3");
const path = require("path");

// Correct relative path — goes up one directory from src/
const dbPath = path.resolve(__dirname, "../database/tasktracker.db");
const db = new Database(dbPath);

console.log(`✅ Connected to SQLite database at: ${dbPath}`);

module.exports = db;
