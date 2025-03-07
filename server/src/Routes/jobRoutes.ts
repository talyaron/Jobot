import express from "express";
import { getAllJobs, getJobById } from "../Controllers/job/getJobs";
import { setJobApplication } from "../Controllers/job/setJobApplication";
import { getCandidatesByJobId } from "../Controllers/job/getCandidatesByJobId";


const router = express.Router();

router.get("/get-job-by-id/:jobId", getJobById);
router.get("/get-all-jobs", getAllJobs);
router.get("/get-candidates/:jobId", getCandidatesByJobId);

router.post("/set-job-application", setJobApplication);


export default router;
