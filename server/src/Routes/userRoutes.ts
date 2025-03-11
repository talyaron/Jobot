import express from "express";
import { getMatchedJobs } from "../Controllers/job/getMatchedJobsByUserID";
import { getUserProfile } from "../Controllers/user/getUserProfile";
import { userIdMiddleware } from "../utils/authMiddleware";

const router = express.Router();

router.get("/matched-jobs/:userId", userIdMiddleware, getMatchedJobs);

router.get("/profile", getUserProfile);


export default router;
