import express from "express";
import { getChatMessages, getChats } from "../Controllers/chat/getChats";
import { sendMessage } from "../Controllers/chat/sendMessage";

const router = express.Router();

router.post("/get-chats", getChats);
router.post("/get-chat-messages", getChatMessages);
router.post("/send-message", sendMessage);


export default router;
