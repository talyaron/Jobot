import express from "express";
import { getMatchedJobs } from "../Controllers/job/getMatchedJobsByUserID";
import { authMiddleware } from "../utils/authMiddleware";
import { getUserProfile } from "../Controllers/user/getUserProfile";

const router = express.Router();

// Get matched jobs based on preferences
router.get("/matched-jobs", authMiddleware, getMatchedJobs);
router.get("/profile", getUserProfile);


export default router;
