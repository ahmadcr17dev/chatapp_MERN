import { Request, Response } from "express";
import User from "../models/UserModel";
import { Conversation } from "../models/ConversationModel";
import mongoose from "mongoose";

const GetUserBySearch = async (req: Request, res: Response) => {
    try {
        const search = req.query.search || '';
        const users = await User.find({
            $and: [
                {
                    $or: [
                        { fullname: { $regex: search, $options: "i" } },
                        { username: { $regex: search, $options: "i" } },
                        { phone: search }
                    ]
                }
            ]
        }).select("-password");  // return all relevant fields except password

        res.status(200).send(users);
    } catch (error) {
        res.status(500).send({ success: false, message: "Internal Server Error" });
        console.log("Error in Searching: ", error);
    }
};

const GetChatters = async (req: Request, res: Response) => {
    try {
        const currentUserId = new mongoose.Types.ObjectId(req.user._id);

        // 1. Get conversations where current user is a participant
        const conversations = await Conversation.find({
            participants: currentUserId
        }).sort({ updatedAt: -1 });

        if (conversations.length === 0) {
            return res.status(200).send([]);
        }

        // 2. Collect all other participant IDs
        let otherIds: mongoose.Types.ObjectId[] = [];

        conversations.forEach(convo => {
            convo.participants.forEach(id => {
                if (id.toString() !== currentUserId.toString()) {
                    otherIds.push(new mongoose.Types.ObjectId(id));
                }
            });
        });

        // Remove duplicates
        otherIds = [...new Set(otherIds.map(x => x.toString()))].map(id => new mongoose.Types.ObjectId(id));

        // 3. Fetch user data
        const users = await User.find({
            _id: { $in: otherIds }
        }).select("-password");

        return res.status(200).send(users);

    } catch (error) {
        console.log("Error in Chatters:", error);
        return res.status(500).send({ message: "Internal Server Error" });
    }
}

export { GetUserBySearch, GetChatters };