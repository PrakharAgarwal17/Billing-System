import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/MongoConnect/MongoConnect.js";
import authRoutes from "./routes/authroutes/authroutes.js";
import profileroute from "./routes/ProfileRoute/Profileroute.js";
dotenv.config();
const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
connectDB();
app.get("/", (req, res) => {
    res.send("Server running successfully ✅");
});
app.use("/api", authRoutes);
app.use("/profile", profileroute);
app.listen(3000, () => console.log("🚀 Server running on http://localhost:3000"));
//# sourceMappingURL=Index.js.map