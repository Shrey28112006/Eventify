import mongoose from "mongoose";
import Event from "../models/Event.js";
import Booking from "../models/Booking.js";

async function bookTickets(req, res) {
  try {
    const { eventId } = req.params;
    const { tickets } = req.body;

    const ticketsCount = Number(tickets);
    if (!eventId) {
      return res.status(400).json({
        success: false,
        message: "eventId is required",
      });
    }

    if (!Number.isFinite(ticketsCount) || ticketsCount < 1) {
      return res.status(400).json({
        success: false,
        message: "tickets must be a number >= 1",
      });
    }

    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }

    const session = await mongoose.startSession();
    let createdBooking = null;

    await session.withTransaction(async () => {
      // Ensure seats are available and decrement atomically.
      const updatedEvent = await Event.findOneAndUpdate(
        {
          _id: eventId,
          availableSeats: { $gte: ticketsCount },
        },
        { $inc: { availableSeats: -ticketsCount } },
        { new: true, session }
      );

      if (!updatedEvent) {
        throw new Error("Not enough available seats");
      }

      createdBooking = await Booking.create(
        [
          {
            event: eventId,
            user: userId,
            tickets: ticketsCount,
          },
        ],
        { session }
      );
    });

    // createdBooking is an array because Booking.create([..])
    const bookingDoc = createdBooking?.[0];

    return res.status(201).json({
      success: true,
      message: "Tickets booked successfully",
      booking: bookingDoc,
    });
  } catch (error) {
    const msg = error?.message || "Booking failed";
    const isSeatError = msg.toLowerCase().includes("not enough available seats");

    return res.status(isSeatError ? 409 : 500).json({
      success: false,
      message: msg,
      error: isSeatError ? undefined : msg,
    });
  }
}

async function getMyBookings(req, res) {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }

    const bookings = await Booking.find({ user: userId })
      .sort({ createdAt: -1 })
      .populate("event", "title category date venue capacity availableSeats")
      .lean();

    return res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch bookings",
      error: error.message,
    });
  }
}

export { bookTickets, getMyBookings };

