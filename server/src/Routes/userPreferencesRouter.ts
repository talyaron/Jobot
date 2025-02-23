import express from "express";
import { getMatchedJobs } from "../Controllers/job/userPreferencesController";

const router = express.Router();

// Get matched jobs based on preferences
router.get("/matched-jobs/:userId", getMatchedJobs);

export default router;
