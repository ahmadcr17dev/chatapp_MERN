import User from "../models/UserModel";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jsonwebtoken from "../config/jsonwebtoken";

const Register = async (req: Request, res: Response) => {
    try {
        // Trim input (THIS FIXES YOUR ISSUE)
        const fullname = req.body.fullname?.trim();
        const username = req.body.username?.trim().toLowerCase();
        const email = req.body.email?.trim().toLowerCase();
        const password = req.body.password;
        const gender = req.body.gender;
        const phone = req.body.phone?.trim();
        const profilepic = req.body.profilepic;

        // check username
        const usernameExist = await User.findOne({ username });
        if (usernameExist) {
            return res.status(400).json({ status: false, message: "Username already exist" });
        }

        // check email
        const emailExist = await User.findOne({ email });
        if (emailExist) {
            return res.status(400).json({ status: false, message: "Email already exist" });
        }

        // check phone number
        const phoneExist = await User.findOne({ phone });
        if (phoneExist) {
            return res.status(400).json({ status: false, message: "Phone Number already exist" });
        }

        // encrypt password
        const hashPassword = bcrypt.hashSync(password, 10);

        const avatar =
            profilepic ||
            (gender === "male"
                ? `https://avatar.iran.liara.run/public/boy?username=${username}`
                : `https://avatar.iran.liara.run/public/girl?username=${username}`);

        const newUser = new User({
            fullname,
            username,
            email,
            password: hashPassword,
            gender,
            profilepic: avatar,
            phone,
        });

        await newUser.save();

        res.status(201).json({
            success: true,
            message: "User Registered Successfully",
            user: {
                _id: newUser.id,
                fullname: newUser.fullname,
                username: newUser.username,
                email: newUser.email,
                gender: newUser.gender,
                profilepic: newUser.profilepic,
                phone: newUser.phone
            }
        });

    } catch (error: any) {
        console.log("Register Error: ", error);

        // Duplicate Key Error from Mongo
        if (error.code === 11000) {
            return res.status(400).json({
                status: false,
                message: `${Object.keys(error.keyPattern)[0]} already exists`,
            });
        }

        return res.status(500).json({ status: false, message: "Internal Server Error" });
    }
};

const Login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const existedUser = await User.findOne({ username });
        if (!existedUser) {
            return res.status(400).json({ success: false, message: "User not found" });
        }
        const comparePassword = bcrypt.compareSync(password, existedUser.password || "");
        if (!comparePassword) {
            return res.status(400).json({ success: false, message: "Password not matched" });
        }
        jsonwebtoken(existedUser._id.toString(), res);
        return res.status(200).json({
            success: true,
            message: "Login Successfully",
            user: {
                _id: existedUser.id,
                username: existedUser.username,
                email: existedUser.email,
                gender: existedUser.gender,
                profilepic: (existedUser.gender === "male"
                    ? `https://avatar.iran.liara.run/public/boy?username=${username}`
                    : `https://avatar.iran.liara.run/public/girl?username=${username}`)
            }
        })
    } catch (error) {
        console.log("Error: ", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const Logout = async (req: Request, res: Response) => {
    try {
        res.cookie("jwt", "", {
            maxAge: 0
        })
        res.status(200).json({ success: true, message: "User Logout Successfully" });
    } catch (error) {
        console.log("Error: ", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export { Register, Login, Logout };