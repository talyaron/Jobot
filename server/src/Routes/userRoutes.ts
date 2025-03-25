import express from "express";
import { getMatchedJobs } from "../Controllers/job/getMatchedJobsByUserID";
import { getUserProfile } from "../Controllers/user/getUserProfile";
import { userIdMiddleware } from "../utils/authMiddleware";
import { setUserPreferences } from "../Controllers/user/setUserPreferences";

const router = express.Router();

router.get("/matched-jobs", userIdMiddleware, getMatchedJobs);
router.post("/set-user-preferences", userIdMiddleware,setUserPreferences );

router.get("/profile", getUserProfile);


export default router;
