const express = require("express");
const Database = require("better-sqlite3");

const db = new Database("./database/tasktracker.db");
const router = express.Router();

// ✅ GET /insights
router.get("/", (req, res) => {
  try {
    // 1) Counts by priority
    const priorityRows = db.prepare(`
      SELECT priority, COUNT(*) as count
      FROM tasks GROUP BY priority
    `).all();

    // 2) Due soon (within next 7 days)
    const dueSoonRows = db.prepare(`
      SELECT COUNT(*) as due_soon_count
      FROM tasks
      WHERE due_date IS NOT NULL
        AND date(due_date) <= date('now', '+7 day')
        AND status <> 'Completed'
    `).get();

    // 3) Busiest day of week (day with most due tasks)
    const busiestRow = db.prepare(`
      SELECT strftime('%w', due_date) as day_of_week, COUNT(*) as count
      FROM tasks
      WHERE due_date IS NOT NULL
      GROUP BY day_of_week
      ORDER BY count DESC
      LIMIT 1
    `).get();

    // 4) Total open tasks
    const openCountRow = db.prepare(`
      SELECT COUNT(*) as open_count
      FROM tasks
      WHERE status <> 'Completed'
    `).get();

    const priorityCounts = {};
    for (const row of priorityRows) {
      priorityCounts[row.priority] = row.count;
    }

    const dueSoonCount = dueSoonRows?.due_soon_count || 0;
    const openCount = openCountRow?.open_count || 0;

    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const busiestDay = busiestRow ? daysOfWeek[parseInt(busiestRow.day_of_week)] : null;

    // Generate summary
    let summary = `You have ${openCount} open tasks.`;
    const topPriority = Object.entries(priorityCounts).sort((a, b) => b[1] - a[1])[0];
    if (topPriority) summary += ` Most tasks are ${topPriority[0]} priority.`;
    if (dueSoonCount) summary += ` ${dueSoonCount} tasks are due within 7 days.`;
    if (busiestDay) summary += ` The busiest due day is ${busiestDay}.`;

    res.json({
      counts_by_priority: priorityCounts,
      due_soon_count: dueSoonCount,
      busiest_day: busiestDay,
      open_count: openCount,
      summary,
    });
  } catch (err) {
    console.error("❌ Insights error:", err);
    res.status(500).json({ error: "Failed to compute insights" });
  }
});

module.exports = router;
