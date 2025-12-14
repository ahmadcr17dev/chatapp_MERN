import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import AuthRoutes from "./routes/AuthRoutes";
import MessageRoutes from "./routes/MessageRoutes";
import UserRoutes from "./routes/UserRoutes";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const PORT = 8080;

// Middlewares
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Auth routes
app.use("/api/auth", AuthRoutes);

// Message Routes
app.use("/api/message", MessageRoutes);

// Search Routes
app.use("/api/user", UserRoutes);

// Bind port immediately
app.listen(PORT, () => {
    console.log(`✅ Server running on PORT ${PORT}`);
    // Connect to MongoDB asynchronously AFTER binding TCP
    mongoose.connect(process.env.MONGO_URI!)
        .then(() => console.log("✅ Database Connected"))
        .catch(err => console.error("❌ MongoDB connection error:", err));
});