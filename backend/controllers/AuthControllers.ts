import User from "../models/UserModel";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jsonwebtoken from "../config/jsonwebtoken";

const Register = async (req: Request, res: Response) => {
    try {
        const { fullname, username, email, password, gender, profilepic, phone } = req.body;
        const userApp = await User.findOne({ username, email });
        if (userApp) {
            return res.send({ status: false, message: "username or email already exists" });
        }
        const hashPassword = bcrypt.hashSync(password, 10);
        const profileboy = profilepic || `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const profilegirl = profilepic || `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
            fullname,
            username,
            email,
            password: hashPassword,
            gender,
            profilepic: gender === "male" ? profileboy : profilegirl,
            phone,
        });

        if (newUser) {
            await newUser.save();
            jsonwebtoken(newUser._id.toString(), res);
        } else {
            return res.status(500).send({ success: false, message: "Invalid user data" });
        }

        res.status(201).send({
            _id: newUser.id,
            fullname: newUser.fullname,
            username: newUser.username,
            email: newUser.email,
            password: newUser.password,
            gender: newUser.gender,
            profilepic: newUser.profilepic,
            phone: newUser.phone
        });

    } catch (error) {
        console.log("Error: ", error);
        return res.status(500).send({ success: false, message: "Internal Server Error" });
    }
};

const Login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const existedUser = await User.findOne({ username });
        if (!existedUser) {
            return res.status(500).send({ success: false, message: "User not found" });
        }
        const comparePassword = bcrypt.compareSync(password, existedUser.password || "");
        if (!comparePassword) {
            return res.status(500).send({ success: false, message: "Password not matched" });
        }
        jsonwebtoken(existedUser._id.toString(), res);
        res.status(200).send({
            _id: existedUser.id,
            username: existedUser.email,
            message: "Login Successfully"
        })
    } catch (error) {
        console.log("Error: ", error);
        return res.status(500).send({ success: false, message: "Internal Server Error" });
    }
}

const Logout = async (req: Request, res: Response) => {
    try {
        res.cookie("jwt", "", {
            maxAge: 0
        })
        res.status(200).send({ success: true, message: "User Logout Successfully" });
    } catch (error) {
        console.log("Error: ", error);
        return res.status(500).send({ success: false, message: "Internal Server Error" });
    }
}

export { Register, Login, Logout };