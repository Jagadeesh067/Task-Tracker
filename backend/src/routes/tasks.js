const express = require("express");
const router = express.Router();
const Database = require("better-sqlite3");
const path = require("path");

// Path to your database file
const dbPath = path.resolve(__dirname, "../database/tasktracker.db");

// Utility: open DB connection
function getDb() {
  return new Database(dbPath);
}

// 🟢 GET all tasks
router.get("/", (req, res) => {
  try {
    const db = getDb();
    const tasks = db.prepare("SELECT * FROM tasks ORDER BY id DESC").all();
    db.close();
    res.json(tasks);
  } catch (err) {
    console.error("Database error (GET /tasks):", err);
    res.status(500).json({ error: "Database error" });
  }
});

// 🟢 POST (add a new task)
router.post("/", (req, res) => {
  const { title, description, priority, status, due_date } = req.body;

  if (!title || typeof title !== "string") {
    return res.status(400).json({ error: "Title is required" });
  }

  // Helper for safe date handling
  function validateDate(dateStr) {
    if (!dateStr) return null;
    const match = /^\d{4}-\d{2}-\d{2}$/.test(dateStr);
    return match ? dateStr : null;
  }

  try {
    const db = getDb();
    const stmt = db.prepare(`
      INSERT INTO tasks (title, description, priority, status, due_date)
      VALUES (?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      title,
      description || "",
      priority || "Low",
      status || "Open",
      validateDate(due_date)
    );

    db.close();
    res.status(201).json({ id: result.lastInsertRowid, message: "Task added" });
  } catch (err) {
    console.error("Database error (POST /tasks):", err);
    res.status(500).json({ error: "Database error" });
  }
});


// 🟢 DELETE a task by ID
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  try {
    const db = getDb();
    const stmt = db.prepare("DELETE FROM tasks WHERE id = ?");
    const result = stmt.run(id);
    db.close();

    if (result.changes === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error("Database error (DELETE /tasks):", err);
    res.status(500).json({ error: "Database error" });
  }
});

module.exports = router;
