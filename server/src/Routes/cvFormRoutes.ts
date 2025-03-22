import express from "express";
import { updateCvForm } from "../Controllers/cvForm/updateCvForm"; // האם הנתיב הזה נכון?
import { getCvForm } from "../Controllers/cvForm/getCvForm"
import { userIdMiddleware } from "../utils/authMiddleware";

const router = express.Router();

router.post(`/updateCvForm`, updateCvForm);
// router.get(`/getCvForm`, userIdMiddleware, getCvForm);
router.get("/getCvForm/:userId", getCvForm);


export default router;
