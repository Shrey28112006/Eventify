import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";

import {
  createEvent,
  deleteEvent,
  getAllEvents,
  getEventById,
  getMyEvents,
  updateEvent,
} from "../controllers/eventController.js";

const router = Router();

/* TEST ROUTE */
router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Eventify event route is running",
  });
});

/* PUBLIC ROUTES */
router.get("/all", getAllEvents);

/* PRIVATE ROUTES */
router.get(
  "/my-events",
  protect,
  getMyEvents
);

/* PUBLIC SINGLE EVENT */
router.get("/:id", getEventById);

/* CREATE EVENT */
router.post(
  "/",
  protect,
  createEvent
);

/* UPDATE EVENT */
router.put(
  "/:id",
  protect,
  updateEvent
);

/* DELETE EVENT */
router.delete(
  "/:id",
  protect,
  deleteEvent
);

export default router;