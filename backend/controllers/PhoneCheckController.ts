import { Request, Response } from "express";
import User from "../models/UserModel";

const CheckPhoneNumber = async (req: Request, res: Response) => {
    try {
        const { phone } = req.body;
        if (!phone) {
            return res.status(400).json({ success: false, message: "Phone Number is required" });
        }
        const user = await User.findOne({ phone }).select(
            "fullname username profilepic"
        );
        if (!user) {
            return res.status(404).json({ success: false, message: "This Number is not registered" });
        }
        return res.status(200).json({ success: true, user });
    } catch (error) {
        console.log("Error in Phone number: ", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export { CheckPhoneNumber };