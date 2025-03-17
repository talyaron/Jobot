
import { Types } from "mongoose";
import { ChatModel } from "../../Model/messageModel";

export async function getChats(req: any, res: any) {
    try {
        const { userId } = req.body;

        const chats = await ChatModel.find({ user: userId });


        if (!chats || chats.length === 0) {
            return res.status(200).json({ message: "No chats found", chats: [] });
        } else {
            return res.status(200).json(chats);
        }

    } catch (error) {
        console.error("Error deleting job:", error);
        return res.status(500).json({ message: "Server error" });
    }
}


export async function getOneChat(req: any, res: any) {
    try {
        const { userId, jobId } = req.body;
        const chat = ChatModel.findOne({ user: userId, job: jobId });

        if (!chat) {
            // chat = await ChatModel.create({ user: userId, job: jobId, messages: [] });
          }
       

    } catch (error) {
        console.error("Error deleting job:", error);
        return res.status(500).json({ message: "Server error" });
    }
};