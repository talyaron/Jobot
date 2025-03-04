import express from "express";
import { getMatchedJobs } from "../Controllers/job/userPreferencesController";
import { getUserProfile } from "../Controllers/user/getUserProfile";

const router = express.Router();

router.get("/matched-jobs/:userId", getMatchedJobs);

router.get("/profile", getUserProfile);


export default router;
