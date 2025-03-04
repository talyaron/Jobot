import express from "express";
import { getMatchedJobs } from "../Controllers/job/getMatchedJobsByUserID";
import { authMiddleware } from "../utils/authMiddleware";
import { getUserProfile } from "../Controllers/user/getUserProfile";

const router = express.Router();

router.get("/matched-jobs/:userId",authMiddleware, getMatchedJobs);

router.get("/profile", getUserProfile);


export default router;
