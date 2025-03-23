
import { Types } from "mongoose";
import { ChatModel } from "../../Model/messageModel";

export async function getChats(req: any, res: any) {
    try {
        const { userId } = req.body;

        const chats = await ChatModel.find({ user: userId }).populate('job');


        if (!chats || chats.length === 0) {
            return res.status(200).json({ message: "No chats found", chats: [] });
        } else {
            return res.status(200).json(chats);
        }

    } catch (error) {
        console.error("Error getting chats", error);
        return res.status(500).json({ message: "Server error" });
    }
}


export async function getChatMessages(req: any, res: any) {
    try {
        console.log("in...")
        const { chatId } = req.body;
        const chat = await ChatModel.findOne({ _id: chatId });
        console.log(chat);

        const messages = chat?.messages;
        if (!chat || !messages) {
            return res.status(200).json({ message: "No chats found", messages: [] });
        } else {
            return res.status(200).json(messages);
        }
       

    } catch (error) {
        console.error("Error getting chat", error);
        return res.status(500).json({ message: "Server error" });
    }
};