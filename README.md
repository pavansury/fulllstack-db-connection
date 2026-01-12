# Fullstack MySQL DB Connection App

This is a simple fullstack project demonstrating how to connect a React frontend to a Node.js/Express backend with a MySQL database.

- Backend: Node.js, Express, MySQL (mysql2), dotenv, cors
- Frontend: React (Create React App), Axios

The app:
- Tests the database connection
- Lists users from a `users` table
- Allows creating new users via a form

## Project Structure

- `backend/` – Express API server and MySQL connection
  - `server.js` – Express app, routes under `/api`
    - `GET /api/test-db` – test DB connection
    - `GET /api/users` – list users
    - `POST /api/users` – create user
  - `db.js` – MySQL connection pool using environment variables
  - `.env` – backend environment variables (not committed)
- `frontend/` – React single-page app
  - `src/App.js` – main UI, calls API to test DB, list and create users
  - `src/services/api.js` – Axios client using `REACT_APP_API_URL`
  - `.env` – frontend environment variables (not committed)

## Prerequisites

- Node.js (LTS recommended)
- MySQL server

## Database Setup

Create a database and a `users` table similar to:

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

Note the database name and credentials for the backend `.env` file.

## Backend Setup

1. Open a terminal in the `backend` folder:

   ```bash
   cd backend
   npm install
   ```

2. Create a `.env` file in `backend/` with values for your MySQL instance, for example:

   ```env
   PORT=5000
   DB_HOST=localhost
   DB_USER=your_mysql_user
   DB_PASSWORD=your_mysql_password
   DB_NAME=your_database_name
   DB_PORT=3306
   ```

3. Start the backend server:

   ```bash
   # for development with auto-restart
   npm run dev

   # or
   npm start
   ```

The server will run by default at `http://localhost:5000` and expose APIs under `/api` (e.g. `http://localhost:5000/api/users`).

## Frontend Setup

1. Open another terminal in the `frontend` folder:

   ```bash
   cd frontend
   npm install
   ```

2. Create a `.env` file in `frontend/` to point to the backend API. For example, if the backend runs on port 5000:

   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

3. Start the React development server:

   ```bash
   npm start
   ```

The frontend will typically run at `http://localhost:3000`.

## How It Works

- On load, `App.js` calls `testDBConnection()` from `src/services/api.js`:
  - Hits `GET /api/test-db` to verify the database connection.
  - On success, it sets a success status message and fetches users.
- `getUsers()` calls `GET /api/users` to populate the users table.
- The "Add New User" form uses `createUser()` which sends `POST /api/users` with `username` and `email`.

## Available Scripts

### Backend (`backend/package.json`)

- `npm start` – start Express server with Node
- `npm run dev` – start Express server with nodemon (auto-reload)

### Frontend (`frontend/package.json`)

- `npm start` – start React dev server
- `npm run build` – build production assets
- `npm test` – run tests (if any configured)

## Notes

- Ensure MySQL is running and credentials in the backend `.env` are correct.
- Ensure `REACT_APP_API_URL` in the frontend `.env` matches the backend URL (including `/api` prefix).
- `.env` files are not committed; keep your credentials private.