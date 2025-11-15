import jwt from "jsonwebtoken";
import { Response } from "express";

const jsonwebtoken = (userid: string, res: Response): void => {
    const token = jwt.sign({ userid }, process.env.JWT_TOKEN as string, {
        expiresIn: "3d"
    })

    res.cookie("jwt", token, {
        maxAge: 3 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: true
    })
}

export default jsonwebtoken;