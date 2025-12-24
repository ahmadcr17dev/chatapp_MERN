import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/UserModel";

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

const isLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).send({ success: false, message: "Unauthorized Access Denied" });
        }
        const decrypt = jwt.verify(token, process.env.JWT_TOKEN as string) as { userid: string };
        const user = await User.findById(decrypt.userid).select("-password");
        if (!user) {
            return res.status(404).send({ success: false, message: "User not found" });
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(`error in isLogin middleware ${error}`);
        res.status(500).send({
            success: false,
            message: (error as Error).message
        })
    }
}

export { isLogin }