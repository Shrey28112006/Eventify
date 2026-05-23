import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import eventRoute from "./src/routes/event.js";
import authRoute from "./src/routes/auth.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/event", eventRoute);


await connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
