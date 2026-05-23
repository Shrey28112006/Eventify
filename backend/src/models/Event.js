import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
      index: true
    },
    date: {
      type: Date,
      required: [true, "Date is required"]
    },
    venue: {
      type: String,
      required: [true, "Venue is required"],
      trim: true
    },
    capacity: {
      type: Number,
      required: [true, "Capacity is required"],
      min: [0, "Capacity must be a positive number"]
    },
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);

export default Event;

