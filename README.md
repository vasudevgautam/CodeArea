# CodeArea

> A full-stack competitive programming platform where users can solve coding problems, submit solutions, bookmark problems, and track their submission history and progress.

---

## 🚀 Overview

**CodeArea** is a full-stack coding practice platform inspired by modern competitive programming websites.

The platform provides a clean environment for users to:

* 🔐 Create an account and log in
* 📚 Browse coding problems
* 💻 View detailed problem statements
* 🧑‍💻 Write and submit solutions
* 📊 Track submission results
* 🔖 Bookmark problems for later
* 📜 View submission history
* 👤 View their coding profile
* 📈 Track solving and submission statistics

The project is built with a **React frontend**, **Node.js + Express backend**, and **MongoDB database**.

---

## ✨ Features

### 🔐 Authentication

* User registration
* User login
* JWT-based authentication
* Protected routes
* Persistent login using browser local storage
* Logout functionality

### 📚 Problem Management

* Browse available coding problems
* View individual problem details
* Problems organized by difficulty/category
* Dynamic problem pages using URL slugs
* Problem-solving interface with code editor

### 💻 Code Submission

* Submit solutions directly from the problem page
* Backend submission processing
* Submission status tracking
* Support for programming language information
* Submission history for individual problems

### 🔖 Bookmarks

* Bookmark coding problems
* View saved problems
* Remove bookmarks
* Quickly navigate from bookmarks to problem pages
* Empty-state UI when no problems are saved

### 📜 Submission History

Users can view their previous submissions for a problem, including:

* Submission number
* Programming language
* Submission status
* Submission date and time

Supported status styles include:

* ✅ Accepted
* ❌ Wrong Answer
* ❌ Failed
* ⏳ Pending

### 👤 Profile

The profile section provides:

* User avatar
* Username/name
* Email
* Total submissions
* Accepted submissions
* Problems solved
* Account ID
* Logout option

### 🎨 Modern UI

The application uses a dark developer-focused interface with:

* Responsive layouts
* Gradient backgrounds
* Hover animations
* Interactive cards
* Responsive mobile design
* Loading states
* Error states
* Empty states

---

# 🛠️ Tech Stack

## Frontend

| Technology   | Purpose                         |
| ------------ | ------------------------------- |
| React.js     | User interface                  |
| React Router | Client-side routing             |
| Axios        | API communication               |
| JavaScript   | Application logic               |
| CSS3         | Styling and responsive UI       |
| Vite         | Frontend development/build tool |

## Backend

| Technology | Purpose                    |
| ---------- | -------------------------- |
| Node.js    | Runtime environment        |
| Express.js | REST API framework         |
| MongoDB    | Database                   |
| Mongoose   | MongoDB object modeling    |
| JWT        | Authentication             |
| Axios      | External/API requests      |
| CORS       | Cross-origin communication |
| Nodemon    | Development server         |

---

# 🏗️ Project Architecture

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

> Folder names may differ slightly depending on the current version of the project.

---

# 🔄 Application Flow

```text
                ┌───────────────────┐
                │      User         │
                └─────────┬─────────┘
                          │
                          ▼
                ┌───────────────────┐
                │   React Client    │
                │   Vite + React    │
                └─────────┬─────────┘
                          │
                    HTTP / REST API
                          │
                          ▼
                ┌───────────────────┐
                │  Express Server   │
                │     Node.js       │
                └─────────┬─────────┘
                          │
              ┌───────────┴───────────┐
              │                       │
              ▼                       ▼
      ┌───────────────┐       ┌───────────────┐
      │ Authentication│       │ Application   │
      │     / JWT     │       │    Routes     │
      └───────────────┘       └───────┬───────┘
                                      │
                                      ▼
                              ┌───────────────┐
                              │    MongoDB    │
                              └───────────────┘
```

---

# 📁 Main Application Modules

## Authentication

Authentication is handled using JWT tokens.

The general authentication flow is:

```text
Register
   ↓
Login
   ↓
Server validates credentials
   ↓
JWT token generated
   ↓
Token stored on client
   ↓
Token sent with protected API requests
```

Protected requests use:

```http
Authorization: Bearer <token>
```

---

## Problems

Problems are stored in MongoDB and accessed through REST APIs.

A problem can contain information such as:

```text
Title
Description
Difficulty
Category
Slug
Test cases / constraints
```

The frontend uses the problem slug to open a problem page:

```text
/problem/two-sum
```

---

## Bookmarks

Bookmarks allow users to save problems for later.

Example flow:

```text
Problem Page
     │
     ▼
Bookmark Problem
     │
     ▼
Bookmark stored in MongoDB
     │
     ▼
Bookmarks Page
     │
     ▼
Open / Remove Bookmark
```

---

## Submissions

When a user submits code:

```text
User writes code
       ↓
Submit solution
       ↓
Frontend sends request
       ↓
Express API
       ↓
Submission processing
       ↓
Submission stored
       ↓
Result returned to frontend
```

Submission records can contain:

```text
User
Problem
Language
Code
Status
Created At
```

---

## Submission History

The submission history page retrieves submissions associated with a particular problem.

Example endpoint:

```http
GET /api/submissions/:problemId
```

The frontend displays the submissions in reverse chronological order.

---

# 🔌 API Endpoints

The following are the major API routes used by the application.

## Authentication

```http
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
```

### Register

```http
POST /api/auth/register
```

Creates a new user account.

### Login

```http
POST /api/auth/login
```

Authenticates a user and returns an authentication token.

### Current User

```http
GET /api/auth/me
```

Returns information about the currently authenticated user.

---

## Problems

```http
GET /api/problems
GET /api/problems/:slug
```

Used to retrieve problems and individual problem details.

---

## Bookmarks

```http
GET    /api/bookmarks
POST   /api/bookmarks/:problemId
DELETE /api/bookmarks/:problemId
```

Used to create, retrieve, and remove user bookmarks.

---

## Submissions

```http
POST /api/submit
GET  /api/submissions/:problemId
```

Used for submitting solutions and retrieving submission history.

---

## Dashboard

```http
GET /api/dashboard/stats
```

Returns user statistics used by the profile/dashboard.

---

# ⚙️ Installation

## 1. Clone the Repository

```bash
git clone https://github.com/vasudevgautam/CodeArea.git
```

Move into the project:

```bash
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

Create a `.env` file inside the `server` directory.

Example:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/codearea
JWT_SECRET=your_secret_key
```

> Never commit your real `.env` file to GitHub.

Start the development server:

```bash
npm run dev
```

If Nodemon is not configured:

```bash
node server.js
```

The backend should run on:

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

Start the Vite development server:

```bash
npm run dev
```

The frontend should normally be available at:

```text
http://localhost:5173
```

---

# 🗄️ MongoDB Setup

The application uses MongoDB.

You can run MongoDB locally using MongoDB Community Server or manage the database using MongoDB Compass.

Example local connection:

```text
mongodb://127.0.0.1:27017/codearea
```

After starting MongoDB, start the backend server.

---

# 🔑 Environment Variables

Create:

```text
server/.env
```

Example:

```env
PORT=5000

MONGO_URI=mongodb://127.0.0.1:27017/codearea

JWT_SECRET=replace_with_a_secure_secret
```

If additional environment variables are required by your current backend, add them to this file.

### Important

Do not upload:

```text
.env
node_modules/
```

to GitHub.

They should be included in `.gitignore`.

---

# ▶️ Running the Project

You need two terminals.

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

Then open:

```text
http://localhost:5173
```

---

# 🧪 Development Workflow

A typical development workflow is:

```text
1. Start MongoDB
       ↓
2. Start Express backend
       ↓
3. Start React frontend
       ↓
4. Register/Login
       ↓
5. Browse Problems
       ↓
6. Open Problem
       ↓
7. Submit Solution
       ↓
8. View Submission History
       ↓
9. Bookmark Problems
       ↓
10. View Profile / Statistics
```

---

# 🔐 Security

The project uses several security-related mechanisms:

* JWT authentication
* Protected API routes
* Authorization headers
* Environment variables for secrets
* Password authentication
* CORS configuration

Sensitive information such as database credentials and JWT secrets should never be committed to the repository.

---

# 📱 Responsive Design

The frontend is designed to work across:

* 💻 Desktop
* 💻 Laptop
* 📱 Mobile
* 📟 Tablet

Responsive CSS media queries are used throughout the application.

---

# 🎯 Project Goals

The main goals of CodeArea are:

* Build a complete full-stack application
* Understand React frontend development
* Build REST APIs using Express
* Work with MongoDB and Mongoose
* Implement JWT authentication
* Practice API integration
* Build reusable UI components
* Handle protected routes
* Implement coding-platform functionality
* Understand real-world frontend/backend communication

---

# 📚 What I Learned

Through this project, I worked with:

### Frontend

* React components
* React Hooks
* `useState`
* `useEffect`
* React Router
* Protected routes
* API integration
* Axios
* Fetch API
* Responsive CSS
* Loading and error states

### Backend

* Node.js
* Express.js
* REST API development
* Middleware
* JWT authentication
* Route handling
* Error handling
* MongoDB
* Mongoose models

### Full Stack

* Frontend ↔ Backend communication
* Authentication flow
* Database operations
* CRUD operations
* API debugging
* Client/server architecture
* Git and GitHub workflow

---

# 🐛 Error Handling

The application includes UI states for:

* Loading
* API errors
* Empty problem lists
* Empty bookmarks
* Empty submission history
* Authentication failures
* Failed submissions

Example:

```text
Loading...
   ↓
API Request
   ↓
 ┌───────────────┐
 │               │
 ▼               ▼
Success         Error
 │               │
 ▼               ▼
Display Data   Error UI
```

---

# 🔮 Future Improvements

The project can be extended with:

* [ ] Online code execution sandbox
* [ ] Multiple programming language support
* [ ] Real-time code execution
* [ ] Test-case evaluation
* [ ] Leaderboard
* [ ] Global user rankings
* [ ] Daily coding streak
* [ ] Difficulty-based filtering
* [ ] Search problems
* [ ] Tags and topics
* [ ] User profile customization
* [ ] Profile picture upload
* [ ] Edit profile
* [ ] Advanced submission analytics
* [ ] Admin dashboard
* [ ] Problem creation interface
* [ ] Problem discussion section
* [ ] Comments
* [ ] Likes/upvotes
* [ ] Dark/light theme
* [ ] Cloud deployment

---

# 🚀 Deployment

The application can be deployed using services such as:

### Frontend

* Vercel
* Netlify

### Backend

* Render
* Railway
* AWS
* Fly.io

### Database

* MongoDB Atlas

For production deployment, environment variables should be configured through the hosting provider instead of committing them to GitHub.

---

# 🤝 Contributing

Contributions are welcome.

### Steps

1. Fork the repository
2. Create a new branch

```bash
git checkout -b feature/new-feature
```

3. Make your changes
4. Commit your changes

```bash
git add .
git commit -m "Add new feature"
```

5. Push the branch

```bash
git push origin feature/new-feature
```

6. Open a Pull Request

---

# 📄 License

This project is currently intended for educational and portfolio purposes.

You may add a specific open-source license such as MIT in the future if required.

---

# 👨‍💻 Author

**Vasudev Gautam**


Interested in:

* Full-Stack Development
* Data Structures & Algorithms
* Competitive Programming
* Software Engineering
* Machine Learning

---

# ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.

---

## 📌 Project Status

🚧 **Active Development**

The project is continuously being improved with new features, UI enhancements, bug fixes, and backend functionality.
