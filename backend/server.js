import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./src/config/db.js";

import eventRoute from "./src/routes/event.js";
import authRoute from "./src/routes/auth.js";
import bookingRoute from "./src/routes/booking.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;
const API_BASE = `http://localhost:${PORT}`;

console.log(`[backend] Starting... (port=${PORT})`);

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    service: "eventify-backend",
    timestamp: new Date().toISOString(),
  });
});

// Routes
app.use("/api/auth", authRoute);
app.use("/api/event", eventRoute);
app.use("/api/booking", bookingRoute);

// Safe startup wrapper
async function startServer() {
  try {
    await connectDB();

    console.log("[backend] MongoDB connected. Routes mounted.");

    app.listen(PORT, () => {
      console.log(`[backend] Listening on ${API_BASE}`);
    });
  } catch (error) {
    console.error(
      "[backend] Failed to start server:",
      error
    );
  }
}

startServer();