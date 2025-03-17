
import { ChatModel } from "../../Model/messageModel";

export async function sendMessage(req:any, res:any) {
    const { userId, jobId, message } = req.body;
  
    let chat = await ChatModel.findOne({ job: jobId, user: userId });
    console.log("f", chat, "fff",  )
    if (!chat) {
      chat = await ChatModel.create({
        user: userId,
        job: jobId,
        messages: [{ content: message, senderId: userId, sentAt: new Date() }],
      });
      await chat.save();
    } else {
      chat.messages.push({ content: message, senderId: userId, sentAt: new Date() });
      chat.lastUpdated = new Date();
      await chat.save();
    }
  
    return res.status(200).json(chat);
  }