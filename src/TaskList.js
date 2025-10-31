// src/TaskList.js
import React, { useState } from "react";

export default function TaskList(props) {
  const { tasks = [], apiBase, onUpdated } = props;
  const [deletingId, setDeletingId] = useState(null);

  // ensure we have a base URL string (fallback to localhost:5000)
  const base = apiBase?.replace(/\/$/, "") || "https://task-tracker-kbud.onrender.com/tasks";


  if (!Array.isArray(tasks)) {
    return <p>No tasks loaded</p>;
  }

  async function handleDelete(id) {
  if (!window.confirm("Are you sure you want to delete this task?")) return;

  const url = base + "/" + id; // ✅ fixed URL

  try {
    setDeletingId(id);
    const res = await fetch(url, { method: "DELETE" });
    let body = null;
    try {
      body = await res.json();
    } catch (e) {
      body = await res.text();
    }

    if (res.ok) {
      window.alert("Task deleted successfully");
      if (typeof onUpdated === "function") onUpdated();
    } else {
      const msg =
        (body && (body.message || body.error || JSON.stringify(body))) ||
        `Server returned ${res.status}`;
      console.error("Delete failed:", res.status, msg);
      window.alert("Failed to delete task: " + msg);
    }
  } catch (err) {
    console.error("Network error while deleting task:", err);
    window.alert("Network error while deleting task");
  } finally {
    setDeletingId(null);
  }
}

  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <p>No tasks found</p>
      ) : (
        tasks.map((task) => (
          <div key={task.id} className="task-item">
            <div className="task-details">
              <div className="task-title">{task.title}</div>

              {task.description && (
                <div className="task-description">{task.description}</div>
              )}

              <div className="task-meta">
                {task.priority} | {task.status} | Due: {task.due_date || "N/A"}
              </div>
            </div>

            <div className="task-actions">
              <button
                className="delete"
                onClick={() => handleDelete(task.id)}
                disabled={deletingId === task.id}
              >
                {deletingId === task.id ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
