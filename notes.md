Development Notes - THworks Task Tracker

Database:

One table named tasks.

Columns include id, title, description, priority, status, due_date, and created_at.

Priority can be Low, Medium, or High.

Status values include Open, In Progress, Done, and Blocked.

API Endpoints:
POST /tasks - Add a new task
GET /tasks - Get all tasks
PATCH /tasks/:id - Update a task
GET /insights - View summary of all tasks

Insight Rules:

Count total and pending tasks.

Identify tasks due soon.

Show number of high-priority tasks.

Display short summary text for insights.

Future Enhancements:

Add login for multiple users.

Add charts for analytics.

Add drag-and-drop for task movement.
