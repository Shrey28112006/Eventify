import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Eventify event route is running"
  });
});

// Example protected route (used by EventPage)
router.get("/dashboard", protect, (req, res) => {
  res.json({
    success: true,
    message: "Protected event dashboard data loaded",
    user: req.user
  });
});


export default router;

