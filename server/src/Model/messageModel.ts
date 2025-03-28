import { Schema, model, Types } from "mongoose";

const MessageSchema = new Schema({
  content: { type: String, required: true },
  sentAt: { type: Date, default: Date.now },
  isRead: { type: Boolean, default: false },
  senderId: { type: Types.ObjectId, required: true }, 
});

const ChatSchema = new Schema({
    job: { type: Types.ObjectId, ref: "Job", required: false },
    user: { type: Types.ObjectId, ref: "User", required: true },
  messages: [MessageSchema], 
  lastUpdated: { type: Date, default: Date.now, required: false}, 
});

export const ChatModel = model("Chat", ChatSchema);