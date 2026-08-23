# 🚀 CodeArea

> A full-stack competitive programming platform where users can discover coding problems, solve them, submit solutions, bookmark problems, and track their coding progress.

[![Live Demo](https://img.shields.io/badge/Live-Demo-success)](https://codearea-56cz.onrender.com)
[![Frontend](https://img.shields.io/badge/Frontend-React-blue)](https://react.dev/)
[![Backend](https://img.shields.io/badge/Backend-Node.js-green)](https://nodejs.org/)
[![Database](https://img.shields.io/badge/Database-MongoDB-brightgreen)](https://www.mongodb.com/)
[![Deployment](https://img.shields.io/badge/Deployed-Render-purple)](https://render.com/)

---

## 🌐 Live Demo

**CodeArea:**
https://codearea-56cz.onrender.com

The application is deployed with:

* React + Vite frontend
* Node.js + Express backend
* MongoDB Atlas database
* Render deployment

---

# 📖 Overview

**CodeArea** is a full-stack coding practice platform inspired by modern competitive programming websites.

It provides users with a complete environment to:

* 🔐 Create an account and authenticate securely
* 📚 Browse coding problems
* 💻 View detailed problem statements
* 🧑‍💻 Write and submit solutions
* 📊 Track submission results
* 🔖 Bookmark problems
* 📜 View submission history
* 👤 Manage their coding profile
* 📈 Track solving and submission statistics

The project was built to understand how a real-world full-stack application works from frontend UI to backend APIs and database operations.

---

# ✨ Features

## 🔐 Authentication

* User registration
* User login
* JWT-based authentication
* Protected routes
* Persistent authentication
* Logout functionality
* Authorization using Bearer tokens

---

## 📚 Problem Management

* Browse coding problems
* View individual problem details
* Problem difficulty information
* Problem categories
* Dynamic problem pages using URL slugs
* Dedicated problem-solving interface

Example:

```text
/problems
/problems/two-sum
```

---

## 💻 Code Submission

Users can submit their solutions directly from the problem page.

Submission flow:

```text
Write Code
    ↓
Submit Solution
    ↓
Frontend API Request
    ↓
Express Backend
    ↓
Submission Processing
    ↓
Submission Result
    ↓
Stored in Database
```

Submission information includes:

* User
* Problem
* Programming language
* Submitted code
* Status
* Submission timestamp

---

## 🔖 Bookmarks

Users can save problems for later.

Features include:

* Add bookmark
* Remove bookmark
* View saved problems
* Navigate directly to bookmarked problems
* Empty-state UI

---

## 📜 Submission History

Users can view previous submissions associated with problems.

Displayed information includes:

* Submission number
* Programming language
* Submission status
* Submission date and time

Supported status displays include:

* ✅ Accepted
* ❌ Wrong Answer
* ❌ Failed
* ⏳ Pending

---

## 👤 User Profile

The profile section provides information such as:

* User name
* Email
* Avatar
* Total submissions
* Accepted submissions
* Problems solved
* Account information
* Logout option

---

## 🎨 Modern Responsive UI

The application includes a developer-focused interface with:

* Dark-themed UI
* Responsive layouts
* Interactive cards
* Hover effects
* Loading states
* Error states
* Empty states
* Mobile-friendly layouts

---

# 🛠️ Tech Stack

## Frontend

| Technology   | Purpose                       |
| ------------ | ----------------------------- |
| React.js     | User interface                |
| React Router | Client-side routing           |
| Axios        | API communication             |
| JavaScript   | Application logic             |
| CSS3         | Styling and responsive design |
| Vite         | Development and build tool    |

## Backend

| Technology | Purpose                    |
| ---------- | -------------------------- |
| Node.js    | Runtime environment        |
| Express.js | REST API framework         |
| Mongoose   | MongoDB object modeling    |
| JWT        | Authentication             |
| Axios      | API communication          |
| CORS       | Cross-origin communication |
| Nodemon    | Development server         |

## Database & Deployment

| Technology    | Purpose                         |
| ------------- | ------------------------------- |
| MongoDB Atlas | Cloud database                  |
| Render        | Frontend and backend deployment |
| Git           | Version control                 |
| GitHub        | Source code hosting             |

---

# 🏗️ System Architecture

```text
                         ┌─────────────────────┐
                         │        User         │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   React Frontend    │
                         │     Vite + React    │
                         │      Render         │
                         └──────────┬──────────┘
                                    │
                              REST API / HTTP
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   Express Backend   │
                         │      Node.js        │
                         │       Render        │
                         └──────────┬──────────┘
                                    │
                         ┌──────────┴──────────┐
                         │                     │
                         ▼                     ▼
                ┌─────────────────┐   ┌─────────────────┐
                │ Authentication  │   │ Application API │
                │      JWT        │   │     Routes      │
                └─────────────────┘   └────────┬────────┘
                                               │
                                               ▼
                                    ┌─────────────────────┐
                                    │    MongoDB Atlas    │
                                    └─────────────────────┘
```

---

# 📁 Project Structure

```text
CodeArea/
│
├── client/
│   ├── public/
│   │
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Problem.js
│   │   ├── Submission.js
│   │   └── Bookmark.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── problemRoutes.js
│   │   ├── submitRoutes.js
│   │   ├── bookmarkRoutes.js
│   │   └── submissionRoutes.js
│   │
│   ├── server.js
│   └── package.json
│
├── .gitignore
├── README.md
└── package.json
```

---

# 🔄 Application Flow

```text
User
 │
 ▼
Register / Login
 │
 ▼
JWT Authentication
 │
 ▼
Dashboard
 │
 ├───────────────┐
 ▼               ▼
Problems       Profile
 │
 ▼
Problem Details
 │
 ├───────────────┐
 ▼               ▼
Submit         Bookmark
 │               │
 ▼               ▼
Submission     Bookmarks
History
```

---

# 🔐 Authentication Flow

CodeArea uses JWT-based authentication.

```text
User Registration
        ↓
Credentials Stored
        ↓
User Login
        ↓
Server Validates Credentials
        ↓
JWT Token Generated
        ↓
Token Stored on Client
        ↓
Token Sent with Protected Requests
        ↓
Backend Middleware Validates Token
        ↓
Protected Resource Returned
```

Protected API requests use:

```http
Authorization: Bearer <token>
```

---

# 📚 Problem Management

Problems are stored in MongoDB and accessed through REST APIs.

A problem can contain information such as:

```text
Title
Description
Difficulty
Category
Slug
Constraints
Test Cases
```

Problems can be accessed using dynamic slugs:

```text
/problems/two-sum
```

This allows every problem to have its own dedicated page.

---

# 🔖 Bookmark Flow

```text
Problem Page
     │
     ▼
Click Bookmark
     │
     ▼
POST Bookmark Request
     │
     ▼
Express Backend
     │
     ▼
MongoDB
     │
     ▼
Bookmark Saved
     │
     ▼
Bookmarks Page
```

Users can later remove saved problems using the bookmark functionality.

---

# 💻 Submission Flow

```text
User Writes Solution
          ↓
      Submit Code
          ↓
   React API Request
          ↓
     Express Route
          ↓
  Submission Processing
          ↓
   Store Submission
          ↓
 Return Submission Status
          ↓
 Display Result to User
```

Submission records contain information such as:

```text
User
Problem
Code
Language
Status
Created At
```

---

# 📜 Submission History

Users can retrieve previous submissions for a problem.

Example:

```http
GET /api/submissions/:problemId
```

The frontend presents submissions in reverse chronological order so the most recent submission appears first.

---

# 🔌 API Endpoints

## Authentication

| Method | Endpoint             | Description                    |
| ------ | -------------------- | ------------------------------ |
| POST   | `/api/auth/register` | Register a new user            |
| POST   | `/api/auth/login`    | Authenticate user              |
| GET    | `/api/auth/me`       | Get current authenticated user |

---

## Problems

| Method | Endpoint              | Description            |
| ------ | --------------------- | ---------------------- |
| GET    | `/api/problems`       | Get available problems |
| GET    | `/api/problems/:slug` | Get a specific problem |

---

## Bookmarks

| Method | Endpoint                    | Description          |
| ------ | --------------------------- | -------------------- |
| GET    | `/api/bookmarks`            | Get user's bookmarks |
| POST   | `/api/bookmarks/:problemId` | Add a bookmark       |
| DELETE | `/api/bookmarks/:problemId` | Remove a bookmark    |

---

## Submissions

| Method | Endpoint                      | Description            |
| ------ | ----------------------------- | ---------------------- |
| POST   | `/api/submit`                 | Submit a solution      |
| GET    | `/api/submissions/:problemId` | Get submission history |

---

## Dashboard

| Method | Endpoint               | Description         |
| ------ | ---------------------- | ------------------- |
| GET    | `/api/dashboard/stats` | Get user statistics |

---

# ⚙️ Local Installation

## Prerequisites

Make sure you have installed:

* Node.js
* npm
* Git
* MongoDB or MongoDB Atlas

---

## 1. Clone the Repository

```bash
git clone https://github.com/vasudevgautam/CodeArea.git
cd CodeArea
```

---

# 📦 Backend Setup

Move into the server directory:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create:

```text
server/.env
```

Example:

```env
PORT=5000

MONGO_URI=mongodb://127.0.0.1:27017/codearea

JWT_SECRET=your_secure_jwt_secret

CLIENT_URL=http://localhost:5173
```

> Never commit your real `.env` file to GitHub.

Start the backend:

```bash
npm run dev
```

Or:

```bash
node server.js
```

The backend runs locally on:

```text
http://localhost:5000
```

---

# 🎨 Frontend Setup

Open another terminal.

From the project root:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Create:

```text
client/.env
```

Add:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the development server:

```bash
npm run dev
```

The frontend normally runs on:

```text
http://localhost:5173
```

---

# 🗄️ MongoDB Setup

CodeArea uses MongoDB for persistent application data.

### Local MongoDB

Example:

```text
mongodb://127.0.0.1:27017/codearea
```

### MongoDB Atlas

For production, the application uses MongoDB Atlas.

The production connection string is stored securely through Render environment variables and is **not committed to GitHub**.

---

# 🔑 Environment Variables

## Backend

Create:

```text
server/.env
```

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
CLIENT_URL=http://localhost:5173
```

## Frontend

Create:

```text
client/.env
```

```env
VITE_API_URL=http://localhost:5000/api
```

### Production

The production frontend uses:

```env
VITE_API_URL=https://codearea-56cz.onrender.com/api
```

Production environment variables are configured directly through Render.

---

# ▶️ Running the Project

The application requires two development processes.

### Terminal 1 — Backend

```bash
cd server
npm install
npm run dev
```

### Terminal 2 — Frontend

```bash
cd client
npm install
npm run dev
```

Open:

```text
http://localhost:5173
```

---

# 🧪 Development Workflow

```text
Start MongoDB
      ↓
Start Express Backend
      ↓
Start React Frontend
      ↓
Register / Login
      ↓
Browse Problems
      ↓
Open Problem
      ↓
Submit Solution
      ↓
View Submission Result
      ↓
View Submission History
      ↓
Bookmark Problems
      ↓
View Profile & Statistics
```

---

# 🚀 Production Deployment

CodeArea is deployed using **Render** and **MongoDB Atlas**.

## Frontend

The React/Vite frontend is deployed as a Render Static Site.

Production API configuration:

```env
VITE_API_URL=https://codearea-56cz.onrender.com/api
```

## Backend

The Node.js/Express server is deployed on Render.

Production environment variables include:

```text
PORT
MONGO_URI
JWT_SECRET
CLIENT_URL
```

## Database

MongoDB Atlas is used as the production database.

---

# 🌐 Production Architecture

```text
                     INTERNET
                         │
                         ▼
              ┌─────────────────────┐
              │   CodeArea Client   │
              │   React + Vite      │
              │      Render         │
              └──────────┬──────────┘
                         │
                         │ HTTPS
                         ▼
              ┌─────────────────────┐
              │   CodeArea Server   │
              │ Node.js + Express   │
              │      Render         │
              └──────────┬──────────┘
                         │
                         │ MongoDB Driver
                         ▼
              ┌─────────────────────┐
              │    MongoDB Atlas    │
              │      Database       │
              └─────────────────────┘
```

---

# 🔒 Security

The project implements several security practices:

* JWT-based authentication
* Protected backend routes
* Bearer token authorization
* Environment variables for sensitive configuration
* Password authentication
* CORS configuration
* MongoDB Atlas network access controls

### Never commit secrets

The following should never be pushed to GitHub:

```text
.env
node_modules/
```

The root `.gitignore` contains:

```gitignore
node_modules/
.env
.env.*
dist/
```

---

# 📱 Responsive Design

CodeArea is designed for different screen sizes:

* 💻 Desktop
* 💻 Laptop
* 📱 Mobile
* 📟 Tablet

Responsive CSS is used to adapt layouts and components to different viewport sizes.

---

# 🐛 Error & Loading Handling

The application provides UI states for:

* Loading
* API failures
* Authentication errors
* Empty problem lists
* Empty bookmarks
* Empty submission history
* Failed submissions
* Invalid requests

General request flow:

```text
API Request
     │
     ▼
 ┌─────────┐
 │         │
 ▼         ▼
Success   Error
 │         │
 ▼         ▼
Data     Error UI
```

---

# 🎯 Project Goals

CodeArea was built to gain practical experience with:

* Full-stack web development
* React application architecture
* REST API development
* Authentication and authorization
* MongoDB database design
* API integration
* CRUD operations
* Protected routes
* Responsive UI development
* Production deployment
* Git and GitHub workflow

---

# 📚 Key Learning Outcomes

## Frontend

* React components
* React Hooks
* `useState`
* `useEffect`
* React Router
* Protected routes
* Axios
* API integration
* Environment variables
* Responsive CSS
* Loading and error states

## Backend

* Node.js
* Express.js
* REST API design
* Middleware
* JWT authentication
* Route handling
* Error handling
* Mongoose
* MongoDB

## Full Stack

* Client-server architecture
* Frontend/backend communication
* Authentication flow
* Database operations
* CRUD functionality
* API debugging
* Environment configuration
* Production deployment

---

# 🔮 Future Improvements

Planned improvements include:

* [ ] Online code execution sandbox
* [ ] Multiple programming language support
* [ ] Automated test-case evaluation
* [ ] Leaderboard
* [ ] Global rankings
* [ ] Daily coding streak
* [ ] Problem search
* [ ] Advanced filtering
* [ ] Tags and topics
* [ ] Profile customization
* [ ] Profile picture upload
* [ ] Advanced submission analytics
* [ ] Admin dashboard
* [ ] Problem creation interface
* [ ] Problem discussion section
* [ ] Comments and discussions
* [ ] Likes/upvotes
* [ ] Dark/light theme options

---

# 🤝 Contributing

Contributions are welcome.

### 1. Fork the repository

### 2. Clone your fork

```bash
git clone https://github.com/vasudevgautam/CodeArea.git
cd CodeArea
```

### 3. Create a feature branch

```bash
git checkout -b feature/new-feature
```

### 4. Make your changes

### 5. Commit your changes

```bash
git add .
git commit -m "Add new feature"
```

### 6. Push your branch

```bash
git push origin feature/new-feature
```

### 7. Open a Pull Request

---

# 📄 License

This project is currently intended for **educational and portfolio purposes**.

A specific open-source license can be added in the future.

---

# 👨‍💻 Author

## Vasudev Gautam

Full-Stack Developer | Competitive Programming Enthusiast

### Interests

* Full-Stack Development
* Data Structures & Algorithms
* Competitive Programming
* Software Engineering
* Machine Learning

---

# ⭐ Support

If you find **CodeArea** useful or interesting, consider giving the repository a ⭐ on GitHub.

---

# 📌 Project Status

🟢 **Deployed & Working**

CodeArea is currently deployed and functional.

### Current Stack

```text
Frontend  → React + Vite
Backend   → Node.js + Express
Database  → MongoDB Atlas
Auth      → JWT
Hosting   → Render
```

### Live Application

🌐 **https://codearea-56cz.onrender.com**

---

## 💡 Why I Built CodeArea

CodeArea was created as a practical full-stack project to understand how modern web applications are designed, developed, connected to databases, authenticated, and deployed to production.

The project combines frontend development, backend API design, database management, authentication, and cloud deployment into a single application.
