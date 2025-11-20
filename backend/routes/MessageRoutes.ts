import express from "express";
import { SendMessage, GetMessage } from "../controllers/MessageControllers";
import { isLogin } from "../middlewares/islogin";

const router = express.Router();

router.post("/send/:id", isLogin, SendMessage);
router.post("/:id", isLogin, GetMessage);

export default router;