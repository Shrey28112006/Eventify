import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createEvent,
  deleteEvent,
  getAllEvents,
  getEventById,
  updateEvent
} from "../controllers/eventController.js";

const router = Router();

// Home route
router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Eventify event route is running"
  });
});

// Public read
router.get("/all", getAllEvents);
router.get("/:id", getEventById);

// Protected write (beginner-friendly: only organizer can edit/delete)
router.post("/", protect, createEvent);
router.put("/:id", protect, updateEvent);
router.delete("/:id", protect, deleteEvent);

export default router;


