// src/index.js
const express = require("express");
const cors = require("cors");
const tasksRouter = require("./routes/tasks");

const app = express();
const PORT = process.env.PORT || 4000; // 👈 Use Render’s port if available

app.use(cors());
app.use(express.json());

app.use("/tasks", tasksRouter);

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
