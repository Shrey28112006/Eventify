# Eventify

Beginner-friendly MERN stack starter for an Event Management app with JWT authentication.

## Tech Stack
- Frontend: React + Vite
- Styling: Tailwind CSS
- Routing: React Router
- Backend: Express.js
- Database: MongoDB Atlas
- Authentication: JWT + bcryptjs

## Features
- User signup
- User login
- Password hashing
- JWT token generation
- Protected backend route
- Protected frontend dashboard and event page

## Project Structure
```txt
eventify/
├─ frontend/
│  ├─ src/
│  │  ├─ pages/
│  │  │  ├─ DashboardPage.jsx
│  │  │  ├─ EventPage.jsx
│  │  │  ├─ LoginPage.jsx
│  │  │  └─ SignupPage.jsx
│  │  ├─ utils/
│  │  │  └─ auth.js
│  │  ├─ App.jsx
│  │  ├─ index.css
│  │  └─ main.jsx
│  ├─ index.html
│  ├─ package.json
│  ├─ tailwind.config.js
│  └─ vite.config.js
├─ backend/
│  ├─ src/
│  │  ├─ config/
│  │  │  └─ db.js
│  │  ├─ controllers/
│  │  │  └─ authController.js
│  │  ├─ middleware/
│  │  │  └─ authMiddleware.js
│  │  ├─ models/
│  │  │  └─ User.js
│  │  ├─ routes/
│  │  │  ├─ auth.js
│  │  │  └─ event.js
│  │  └─ utils/
│  │     └─ generateToken.js
│  ├─ .env.example
│  ├─ package.json
│  └─ server.js
├─ .gitignore
└─ README.md
```

## Routes

### Frontend
- `/` — Home
- `/login` — Login page
- `/signup` — Signup page
- `/dashboard` — Protected dashboard page
- `/event` — Protected event page

### Backend
- `POST /api/auth/signup` — Create a new account
- `POST /api/auth/login` — Log in with email and password
- `GET /api/event` — Public event route
- `GET /api/event/dashboard` — Protected event route

## Environment Variables

### backend/.env
```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```

## Setup Overview
1. Install dependencies inside `frontend/` and `backend/`.
2. Copy `backend/.env.example` to `backend/.env` and fill in your values.
3. Connect the backend to MongoDB Atlas.
4. Run the frontend and backend separately during development.
5. Log in or sign up from the frontend to access protected pages.

## Notes
- The setup is intentionally clean and beginner-friendly.
- No unnecessary setup scripts are included.
- The structure is ready to scale with features like events, bookings, authentication, and dashboards.
