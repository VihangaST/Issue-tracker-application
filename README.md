# Issue Tracker Application

A full-stack Issue Tracker application built using **React (Vite)** for the frontend, **Express.js** for the backend, and **MySQL (Sequelize ORM)** as the database.

This project demonstrates CRUD operations, authentication with JWT, pagination, filtering, status analytics, and clean UI/UX design.

---

## 🚀 Live Demo

- **URL** - https://issue-tracker-application-blond.vercel.app/

---

# 🧩 Features

## ✅ Issue Management

- Create new issues (title, description, priority, status)
- View all issues with pagination (limit & offset)
- View detailed issue information
- Update issue details (including status changes)
- Delete issues with confirmation dialog
- Issue status options:
  - `Open`
  - `In progress`
  - `Resolved`
- Update issue status with confirmation dialog
- Visual indicators for status & priority (badges/colors)
- Search issues by title
- Filter issues by status and priority
- Display issue counts by status (Open / In Progress / Resolved)
- Export filtered issue list to JSON

---

## 🔐 Authentication & Authorization

- User registration (email + password)
- Password hashing using **bcrypt**
- JWT-based authentication
- Token expiry: **1 hour**
- Token stored in **localStorage**
- Protected routes using `authenticateToken` middleware
- Authorization header format:

```
Authorization: Bearer <token>
```

---

# 🛠 Tech Stack

## Frontend

- React (Vite)
- React Router
- Zustand (State Management)
- Fetch API
- Tailwind CSS

## Backend

- Node.js
- Express.js
- Sequelize ORM
- MySQL
- bcrypt
- jsonwebtoken (JWT)

## Deployment

- Frontend: **Vercel**
- Backend: **Render**
- Database: **Aiven MySQL**

---

# 🗄 Database Schema

## 🧑 Users Table

| Field           | Type                          | Description           |
| --------------- | ----------------------------- | --------------------- |
| id              | INTEGER (PK, Auto Increment)  | Unique user ID        |
| email           | STRING(150), UNIQUE, NOT NULL | User email            |
| password        | STRING, NOT NULL              | Hashed password       |
| confirmPassword | STRING, NOT NULL              | Confirmation password |
| created_at      | TIMESTAMP                     | Auto managed          |
| updated_at      | TIMESTAMP                     | Auto managed          |

---

## 🐞 Issues Table

| Field       | Type                                  | Description       |
| ----------- | ------------------------------------- | ----------------- |
| id          | INTEGER (PK, Auto Increment)          | Unique issue ID   |
| title       | STRING, NOT NULL                      | Issue title       |
| description | TEXT, NOT NULL                        | Issue description |
| status      | ENUM('open','in progress','resolved') | Default: open     |
| priority    | ENUM('low','medium','high')           | Default: medium   |
| userId      | INTEGER (FK → users.id), NOT NULL     | Owner of issue    |
| created_at  | TIMESTAMP                             | Auto managed      |
| updated_at  | TIMESTAMP                             | Auto managed      |

---

# 📁 Project Structure

## Backend

```
backend/
 ├── controllers/
 ├── models/
 ├── routes/
 ├── middleware/
 ├── config/
 └── server.js
```

## Frontend

```
frontend/
 ├── components/
 ├── pages/
 ├── store/
 │    ├── useAuthStore.js
 │    └── useFormStore.js
 ├── utils/
 └── main.jsx
```

---

# 📦 Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/VihangaST/Issue-tracker-application.git
cd issue-tracker
```

---

## 🔹 Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```
PORT=5000
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=your_db_host
DB_PORT=your_db_port
JWT_SECRET=your_secret_key
```

Start backend:

```bash
npm run dev
```

---

## 🔹 Frontend Setup

```bash
cd frontend
npm install
```

Create `.env` file:

```
VITE_API_URL=http://localhost:5000/api
```

Start frontend:

```bash
npm run dev
```

---

# 📊 API Overview

## Auth Routes

- POST `/api/auth/register`
- POST `/api/auth/login`

## Issue Routes (Protected)

- GET `/api/issues`
- GET `/api/issues/:id`
- POST `/api/issues`
- PUT `/api/issues/:id`
- DELETE `/api/issues/:id`

---

# 🧠 Architectural Decisions

- Used **Sequelize ORM** for structured relational data management
- Implemented **limit & offset pagination** for scalability
- Used **GET query parameters** for search & filtering
- JWT-based stateless authentication
- Zustand for lightweight global state management
- Reusable components
- Clean separation of concerns

---

# 👩‍💻 Author

Vihanga Thalangedara

---
