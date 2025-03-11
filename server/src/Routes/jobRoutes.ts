import express from "express";
import { getAllJobs, getJobById } from "../Controllers/job/getJobs";
import { setJobApplication } from "../Controllers/job/setJobApplication";
import { getCandidatesByJobId } from "../Controllers/job/getCandidatesByJobId";
import { getUserJobs, removeSavedJob } from "../Controllers/job/getSavedJobsByUserID";
import { userIdMiddleware } from "../utils/authMiddleware";
import { saveJobForUser } from "../Controllers/job/saveJobForUser";


const router = express.Router();

router.get("/get-job-by-id/:jobId", getJobById);
router.get("/get-all-jobs", getAllJobs);
router.get("/get-candidates/:jobId", getCandidatesByJobId);
router.post("/set-job-application", setJobApplication);
router.get("/user-jobs", userIdMiddleware, getUserJobs);
router.delete("/saved-jobs/:jobId", userIdMiddleware, removeSavedJob);
router.post("/saved-jobs", userIdMiddleware, saveJobForUser);


export default router;
