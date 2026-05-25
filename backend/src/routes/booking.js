import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
import { bookTickets, getMyBookings } from "../controllers/bookingController.js";

const router = Router();

router.post("/:eventId", protect, bookTickets);
router.get("/me", protect, getMyBookings);

export default router;

