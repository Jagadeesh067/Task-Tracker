const Database = require("better-sqlite3");
const path = require("path");

// point to your current database
const dbPath = path.resolve(__dirname, "./database/tasktracker.db");
const db = new Database(dbPath);

console.log("🔄 Migrating tasks table to support more statuses...");

// Rename the old table temporarily
db.exec(`
  ALTER TABLE tasks RENAME TO tasks_old;
`);

// Create a new table with updated constraints
db.exec(`
  CREATE TABLE tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    priority TEXT CHECK(priority IN ('Low','Medium','High')) DEFAULT 'Low',
    status TEXT CHECK(status IN ('Open','In Progress','Done','Blocked')) DEFAULT 'Open',
    due_date TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );
`);

// Copy data from the old table
db.exec(`
  INSERT INTO tasks (id, title, description, priority, status, due_date, created_at)
  SELECT id, title, description, priority,
         CASE
           WHEN status = 'Completed' THEN 'Done'
           ELSE status
         END,
         due_date, created_at
  FROM tasks_old;
`);

// Drop the old table
db.exec(`DROP TABLE tasks_old;`);

console.log("✅ Migration completed successfully!");
db.close();
