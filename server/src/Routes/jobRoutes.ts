import express from "express";
import { getJobDetails } from "../Controllers/job/getJobDetails";
import { getJobById } from "../Controllers/job/getJobByID";

const router = express.Router();

router.get(`/job-details/:id`, getJobDetails);

import { getAllJobs, getJobById } from "../Controllers/job/getJobByID";
import { setJobApplication } from "../Controllers/job/setJobApplication";
import { getCandidatesByJobId } from "../Controllers/job/getCandidatesByJobId";

router.get("/job/:jobId", getJobById);
router.get("/get-all-jobs", getAllJobs);

router.get("/job/getCandidates/:jobId", getCandidatesByJobId);
router.post("/job/setJobApplication", setJobApplication);


export default router;
