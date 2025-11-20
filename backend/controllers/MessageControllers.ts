import { Request, Response } from "express";
import { Conversation } from "../models/ConversationModel";
import { Message } from "../models/MessageModel";

const SendMessage = async (req: Request, res: Response) => {
    try {
        const { message } = req.body;
        const { id: reciverId } = req.params;
        const senderId = req.user._id;

        let chats = await Conversation.findOne({
            participants: { $all: [senderId, reciverId] }
        })

        if (!chats) {
            chats = await Conversation.create({
                participants: [senderId, reciverId]
            })
        }

        const newMessages = new Message({
            senderId,
            reciverId,
            message: message,
            conversationId: chats._id
        })

        if (newMessages) {
            chats.messages.push(newMessages._id);
        }

        await Promise.all([chats.save(), newMessages.save()]);
        res.status(201).send(newMessages);
    } catch (error) {
        res.status(500).send({ success: false, message: "Internal Server Error" });
        console.log(`error in sendMessage ${error}`);
    }
}

const GetMessage = async (req: Request, res: Response) => {
    try {
        const { id: reciverId } = req.params;
        const senderId = req.user._id;
        const chats = await Conversation.findOne({
            participants: ([senderId, reciverId])
        }).populate("message");
        if (!chats) {
            return res.status(200).send([]);
        }
        const message = chats.messages;
        res.status(200).send(message);
    } catch (error) {
        res.status(500).send({ success: false, message: "Internal Server Error" });
        console.log("Error in Get Message" + error);
    }
}

export { SendMessage, GetMessage }