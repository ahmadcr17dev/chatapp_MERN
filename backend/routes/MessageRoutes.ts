import express from "express";
import { SendMessage } from "../controllers/MessageControllers";

const router = express.Router();

router.post("/send/:id", SendMessage);

export default router;