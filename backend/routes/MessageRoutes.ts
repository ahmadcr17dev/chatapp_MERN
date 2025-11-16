import express from "express";
import { SendMessage } from "../controllers/MessageControllers";
import { isLogin } from "../middlewares/islogin";

const router = express.Router();

router.post("/send/:id", isLogin, SendMessage);

export default router;