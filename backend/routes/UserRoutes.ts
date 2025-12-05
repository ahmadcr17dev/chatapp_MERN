import express from "express";
import { isLogin } from "../middlewares/islogin";
import { GetChatters, GetUserBySearch } from "../controllers/UserControllers";
const router = express.Router();

router.get("/search", isLogin, GetUserBySearch);
router.get("/chatters", isLogin, GetChatters);

export default router;