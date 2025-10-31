Task Tracker with Smart Insights

This project helps users manage their tasks effectively. It allows creating, editing, and updating tasks and provides a short summary showing the number of pending, completed, and upcoming tasks.

Tech Stack:
Backend - Node.js, Express.js, PostgreSQL
Frontend - React.js
Environment setup - dotenv

Setup Instructions:

Backend

Go to the backend folder and install dependencies using npm install.

Rename the .env.example file to .env and update your database details.

Run node src/init-db.js to initialize the database.

Start the backend server using node src/index.js. It runs on http://localhost:4000

Frontend

Move to the frontend folder and install dependencies using npm install.

Add the backend URL in the .env file as REACT_APP_API_URL=http://localhost:4000

Start the app using npm start and open it in the browser at http://localhost:3000

Features:

Create, view, and update tasks

Change task status and priority

Display task summaries and upcoming deadlines

Example Insight:
You have 5 pending tasks, 2 of which are high priority and due soon.

Notes:
The project logic and writing were done manually without using AI tools.
