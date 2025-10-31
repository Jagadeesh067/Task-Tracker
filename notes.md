Design Notes
Database

Using PostgreSQL schema with UUID primary keys and CHECK constraints for priority and status.

Added indexes on status, priority, and due_date for efficient filtering and sorting.

Backend

Built with Express + pg for simplicity and direct SQL control (predictable and easy to read).

Used Joi for request validation to prevent invalid data from reaching the database.

Implemented /insights using lightweight SQL aggregations handled at the DB layer for performance, followed by a small rule-based sentence generator for human-readable summaries.

Frontend

Minimal React app with three components: AddTask, TaskList, and Insights.

Uses fetch and simple local state — suitable for quick demos and testing.

Potential Improvements (time permitting)

Add JWT authentication with per-user task ownership and isolation.

Implement pagination and server-side filtering using OFFSET/LIMIT.

Develop a full test suite (unit tests for endpoints + integration tests).

Introduce a database migration tool (Knex / TypeORM / Sequelize) for production-grade schema management.

Add charts and visualizations (e.g., Chart.js / Recharts) for task timelines and priority distributions.

Implement optimistic UI updates and improved styling for better UX.