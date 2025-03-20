import express from "express";
import { getChats, getOneChat } from "../Controllers/chat/getChats";
import { sendMessage } from "../Controllers/chat/sendMessage";

const router = express.Router();

router.post("/get-chats", getChats);
router.post("/get-one-chat", getOneChat);
router.post("/send-message", sendMessage);


export default router;
