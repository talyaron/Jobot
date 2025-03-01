import express from "express";
import { getJobDetails } from "../Controllers/job/getJobDetails";

const router = express.Router();

router.get(`/job-details/:id`, getJobDetails);

import { getJobById } from "../Controllers/job/getJobByID";
import { setJobApplication } from "../Controllers/job/setJobApplication";

router.get("/job/:jobId", getJobById);
router.post("/job/setJobApplication", setJobApplication);

export default router;
