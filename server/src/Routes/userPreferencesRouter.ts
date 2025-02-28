import express from "express";
import { getMatchedJobs } from "../Controllers/job/getMatchedJobsByUserID";
import { authMiddleware } from "../utils/authMiddleware";

const router = express.Router();

// Get matched jobs based on preferences
router.get("/matched-jobs", authMiddleware, getMatchedJobs);

export default router;
