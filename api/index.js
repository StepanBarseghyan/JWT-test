import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3500;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Mongo connected");
  })
  .catch((err) => {
    console.log("mongoerror", err);
  });

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.use("/auth", authRoutes);
app.use("/", profileRoutes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
