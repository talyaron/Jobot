import { ChatModel } from "../../Model/messageModel";

export async function sendMessage(req:any, res:any) {
    const { userId, jobId, message } = req.body;
  
    let chat = await ChatModel.findOne({ job: jobId, users: userId });
  
    if (!chat) {
      chat = await ChatModel.create({
        users: [userId],
        job: jobId,
        messages: [{ content: message, senderId: userId }],
      });
    } else {
      chat.messages.push({ content: message, senderId: userId });
      chat.lastUpdated = new Date();
      await chat.save();
    }
  
    return res.status(200).json(chat);
  }