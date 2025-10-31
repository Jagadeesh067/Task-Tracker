import React, { useState, useEffect } from 'react';
import AddTask from './AddTask';
import TaskList from './TaskList';
import './App.css'; // 👈 Import CSS file

export default function App() {
  const apiBase = 'http://localhost:4000';
  const [tasks, setTasks] = useState([]);

  async function fetchTasks() {
    const res = await fetch(`${apiBase}/tasks`);
    const data = await res.json();
    setTasks(data);
  }

  useEffect(() => { fetchTasks(); }, []);

  return (
    <div className="app-container">
      <h1 className="app-title">📝 Task Tracker</h1>
      <div className="app-content">
        <AddTask apiBase={apiBase} onCreated={fetchTasks} />
        <TaskList tasks={tasks} apiBase={apiBase} onUpdated={fetchTasks} />
      </div>
    </div>
  );
}
