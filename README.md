# CodeArea

CodeArea is a full-stack coding-practice platform. Users can register, solve C++ problems, bookmark problems, track submissions, use light/dark mode, and follow study resources.

## Features

- User registration and login with JWT authentication
- Coding problem list, search, difficulty filters, and bookmarks
- C++ code run and submission workflow
- Solved-problem indicators and submission history
- Profile statistics, responsive layout, light/dark themes, sidebar, and footer

## Run locally

### Server

```bash
cd server
npm install
```

Create `server/.env` from `server/.env.example`, then set your MongoDB connection string and JWT secret.

```bash
npm run dev
```

### Client

```bash
cd client
npm install
npm run dev
```

Open the local URL shown by Vite, usually `http://localhost:5173`.

## Seed problems

```bash
cd server
npm run seed:problems
```

This adds or updates the included example problems without creating duplicates.

## Before GitHub upload

The `.env` files are intentionally ignored. Never upload your MongoDB URI or JWT secret.
