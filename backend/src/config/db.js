import mongoose from "mongoose";

async function connectDB() {
  try {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
      throw new Error(
        "MONGODB_URI is not defined in the environment"
      );
    }

    console.log("[backend][db] Connecting to MongoDB...");

    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log("[backend][db] Connected to MongoDB");

    mongoose.connection.on("disconnected", () => {
      console.log("[backend][db] MongoDB disconnected");
    });

    mongoose.connection.on("reconnected", () => {
      console.log("[backend][db] MongoDB reconnected");
    });

    mongoose.connection.on("error", (error) => {
      console.error(
        "[backend][db] MongoDB runtime error:",
        error.message
      );
    });
  } catch (error) {
    console.error(
      "[backend][db] MongoDB connection error:",
      error.message
    );

    // IMPORTANT:
    // DO NOT kill backend process
    // process.exit(1) removed
  }
}

export default connectDB;