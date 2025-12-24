import express from "express";
import { isLogin } from "../middlewares/islogin";
import { GetChatters, GetUserBySearch } from "../controllers/UserControllers";
import { CheckPhoneNumber } from "../controllers/PhoneCheckController";
const router = express.Router();

router.get("/search", isLogin, GetUserBySearch);
router.get("/chatters", isLogin, GetChatters);
router.post("/checkphone", isLogin, CheckPhoneNumber);

export default router;