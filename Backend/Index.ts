import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/MongoConnect/MongoConnect.js";
import authRoutes from "./routes/authroutes/authroutes.js";
import profileroute from "./routes/ProfileRoute/Profileroute.js"
import shoproute from "./routes/Shoproutes/shopRoute.js"
import productroute from "./routes/Productroutes/Productroutes.js"
import cartroute from "./routes/CartRoute/Cartroutes.js"
import orderroute from "./routes/orderRoute/orderRoute.js"
import paymentroutes from "./routes/paymentroutes/paymentroutes.js"
import expenseroutes from "./routes/expenseroutes/expenseroutes.js";
import businessanalytics from "./routes/businessAnalyticsroute/businessAnalyticsroutes.js"
import ExpressMongoSanitize from "express-mongo-sanitize";
dotenv.config();

const app = express();

app.use(cors({ 
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  methods: ['GET' , 'POST'] ,
  credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(ExpressMongoSanitize())
connectDB();
app.get("/", (req: Request, res: Response) => {
  res.send("Server running successfully ✅");
});

app.use("/api", authRoutes);
app.use("/profile", profileroute);
app.use("/shop" , shoproute)
app.use("/product" , productroute)
app.use("/cart" , cartroute)
app.use("/order" , orderroute)
app.use("/payment" , paymentroutes)
app.use("/expense" , expenseroutes)
app.use("/business" , businessanalytics)
app.listen(3000, () => console.log("🚀 Server running on http://localhost:3000"));
