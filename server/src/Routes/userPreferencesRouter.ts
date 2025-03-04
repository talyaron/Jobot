import express from "express";
import { getMatchedJobs } from "../Controllers/job/userPreferencesController";
import { getUserProfile } from "../Controllers/user/getUserProfile";

const router = express.Router();

// Get matched jobs based on preferences
router.get("/matched-jobs/:userId", getMatchedJobs);
// get user profile
router.get("/profile", getUserProfile);


export default router;
