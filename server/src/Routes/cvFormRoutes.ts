import express from "express";
import { addCvForm } from "../Controllers/cvForm/addCvForm";
import { updateCvForm } from "../Controllers/cvForm/updateCvForm"; // האם הנתיב הזה נכון?

const router = express.Router();

router.post(`/addCvForm`, addCvForm);
router.post(`/updateCvForm`, updateCvForm);

export default router;
