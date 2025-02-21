import { Types,Schema, model } from "mongoose";


const MessageSchema = new Schema({
    senderId:Types.ObjectId,
    receiverId:Types.ObjectId,
    content:String,
    sentAt:Date,
    isRead:Boolean
})
export const MessageModel = model("Message",MessageSchema);