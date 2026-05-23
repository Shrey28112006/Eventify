# Eventify

Beginner-friendly MERN stack starter for an Event Management app.

## Tech Stack
- Frontend: React + Vite
- Styling: Tailwind CSS
- Routing: React Router
- Backend: Express.js
- Database: MongoDB Atlas

## Project Structure
```txt
eventify/
├─ frontend/
│  ├─ src/
│  │  ├─ assets/
│  │  ├─ components/
│  │  ├─ pages/
│  │  ├─ routes/
│  │  ├─ App.jsx
│  │  ├─ index.css
│  │  └─ main.jsx
│  ├─ index.html
│  ├─ package.json
│  ├─ postcss.config.js
│  ├─ tailwind.config.js
│  └─ vite.config.js
├─ backend/
│  ├─ src/
│  │  ├─ config/
│  │  ├─ controllers/
│  │  ├─ middleware/
│  │  ├─ models/
│  │  ├─ routes/
│  │  └─ utils/
│  ├─ .env.example
│  ├─ package.json
│  └─ server.js
├─ .gitignore
└─ README.md
```

## Setup Overview
1. Install dependencies inside `frontend/` and `backend/`.
2. Create your environment variables from the provided `.env.example`.
3. Connect the backend to MongoDB Atlas.
4. Run the frontend and backend separately during development.

## Notes
- The setup is kept intentionally clean and beginner-friendly.
- No unnecessary setup scripts are included.
- The structure is ready to scale with features like events, bookings, authentication, and dashboards.
