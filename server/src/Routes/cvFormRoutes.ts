import express from "express";
import { updateCvForm } from "../Controllers/cvForm/updateCvForm";
import { getCvForm } from "../Controllers/cvForm/getCvForm"
import { userIdMiddleware } from "../utils/authMiddleware";

const router = express.Router();

router.post(`/updateCvForm`, updateCvForm);
router.get("/getCvForm/:userId", getCvForm);


export default router;
