import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import AuthRoutes from "./routes/AuthRoutes";
import MessageRoutes from "./routes/MessageRoutes";

dotenv.config();
const app = express();
const PORT = 8080;

// Middlewares
app.use(cors());
app.use(express.json());

// Auth routes
app.use("/api/auth", AuthRoutes);

// Message Routes
app.use("/api/message", MessageRoutes);

// Bind port immediately
app.listen(PORT, () => {
    console.log(`✅ Server running on PORT ${PORT}`);
    // Connect to MongoDB asynchronously AFTER binding TCP
    mongoose.connect(process.env.MONGO_URI!)
        .then(() => console.log("✅ Database Connected"))
        .catch(err => console.error("❌ MongoDB connection error:", err));
});