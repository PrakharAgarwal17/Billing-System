import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/MongoConnect.js";
import authRoutes from "./routes/authroutes.js";

dotenv.config();

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectDB();

app.get("/", (req: Request, res: Response) => {
  res.send("Server running successfully ✅");
});

app.use("/api", authRoutes);

app.listen(3000, () => console.log("🚀 Server running on http://localhost:3000"));
