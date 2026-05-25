import Event from "../models/Event.js";

async function createEvent(req, res) {
  try {
    const {
      title,
      description,
      category,
      date,
      venue,
      capacity,
    } = req.body;

    if (
      !title ||
      !description ||
      !category ||
      !date ||
      !venue ||
      capacity == null
    ) {
      return res.status(400).json({
        success: false,
        message:
          "All fields are required: title, description, category, date, venue, capacity",
      });
    }

    const event = await Event.create({
      title,
      description,
      category,
      date,
      venue,
      capacity,
      availableSeats: capacity,
      organizer: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Event created successfully",
      event,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Event creation failed",
      error: error.message,
    });
  }
}

async function getAllEvents(req, res) {
  try {
    const { q, category } = req.query;

    const filter = {};

    if (category && category !== "All") {
      filter.category = category;
    }

    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
        { venue: { $regex: q, $options: "i" } },
      ];
    }

    const events = await Event.find(filter).sort({
      date: 1,
    });

    return res.status(200).json({
      success: true,
      events,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch events",
      error: error.message,
    });
  }
}

/* NEW */
async function getMyEvents(req, res) {
  try {
    const events = await Event.find({
      organizer: req.user._id,
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      events,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch your events",
      error: error.message,
    });
  }
}

async function getEventById(req, res) {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    return res.status(200).json({
      success: true,
      event,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch event",
      error: error.message,
    });
  }
}

async function updateEvent(req, res) {
  try {
    const {
      title,
      description,
      category,
      date,
      venue,
      capacity,
    } = req.body;

    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    if (
      String(event.organizer) !==
      String(req.user._id)
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this event",
      });
    }

    if (title != null) event.title = title;
    if (description != null)
      event.description = description;
    if (category != null)
      event.category = category;
    if (date != null) event.date = date;
    if (venue != null) event.venue = venue;
    if (capacity != null)
      event.capacity = capacity;

    await event.save();

    return res.status(200).json({
      success: true,
      message: "Event updated successfully",
      event,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Event update failed",
      error: error.message,
    });
  }
}

async function deleteEvent(req, res) {
  try {
    const event = await Event.findById(
      req.params.id
    );

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    if (
      String(event.organizer) !==
      String(req.user._id)
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this event",
      });
    }

    await event.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Event deletion failed",
      error: error.message,
    });
  }
}

export {
  createEvent,
  getAllEvents,
  getMyEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};