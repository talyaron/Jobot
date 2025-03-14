import express from "express";
import { getChats, getOneChat } from "../Controllers/chat/getChats";
import { sendMessage } from "../Controllers/chat/sendMessage";

const router = express.Router();

router.post("/get-chats", getChats);
router.get("/get-one-chat", getOneChat);
router.get("/send-message", sendMessage);


export default router;
