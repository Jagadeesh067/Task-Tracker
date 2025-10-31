Task Tracker — Mini (NodeJS + React)
Overview

A small full-stack task tracker featuring a rule-based /insights endpoint that summarizes task data using database-level aggregations and lightweight natural-language generation.

Tech Stack

Backend: Node.js, Express, PostgreSQL

Frontend: React (Create React App or Vite)

Validation: Joi

Quick Start (Local, Postgres)

Clone repo

Backend:

cd backend

Copy .env.example → .env and set DATABASE_URL

Run migration:

psql $DATABASE_URL -f migrations/001_create_tasks_table.sql


Install dependencies:

npm install


Start server:

node src/index.js


Frontend:

cd frontend

npm install

Set environment variable:

REACT_APP_API_BASE=http://localhost:4000


Start dev server:

npm start

Endpoints

POST /tasks — Create a new task

GET /tasks — List tasks (?status=&priority=&sort=due_date_asc|due_date_desc)

PATCH /tasks/:id — Update status or priority

GET /insights — Get task summary and counts

Files of Interest

backend/src/routes/*

frontend/src/components/*

Design Notes
Database

Using PostgreSQL schema with UUID primary keys and CHECK constraints for priority and status.

Added indexes on status, priority, and due_date for efficient filtering and sorting.

Backend

Built with Express + pg for simplicity and direct SQL control (predictable and easy to read).

Used Joi for input validation to prevent invalid data from reaching the database.

/insights implemented using small SQL aggregations at the DB layer for performance, followed by a rule-based generator for natural-language summaries.

Frontend

Minimal React app with three components: AddTask, TaskList, and Insights.

Uses fetch and simple local state — ideal for quick demos and testing.

Potential Improvements

Add JWT authentication and per-user task ownership.

Implement pagination and server-side filtering with OFFSET/LIMIT.

Add a test suite (unit + integration tests).

Use a migration tool (Knex / TypeORM / Sequelize) for production schema management.

Add charts (Chart.js / Recharts) for visualizing timelines or priority distributions.

Improve UX with optimistic UI updates and better styling.