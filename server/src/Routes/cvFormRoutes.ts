import express from "express";
import { updateCvForm } from "../Controllers/cvForm/updateCvForm"; // האם הנתיב הזה נכון?

const router = express.Router();

router.post(`/updateCvForm`, updateCvForm);

export default router;
