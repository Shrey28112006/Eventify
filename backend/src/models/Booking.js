import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    tickets: {
      type: Number,
      required: true,
      min: [1, "Tickets must be at least 1"],
    },
  },
  { timestamps: true }
);

// Prevent accidental duplicate bookings for the same user/event/ticket count
// (You can remove this if you want multiple bookings per user/event)
bookingSchema.index({ event: 1, user: 1 });

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;

