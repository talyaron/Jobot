import express from "express";
import { checkApplicationStatus } from "../Controllers/userJob/applicationStatus";
import { applyToJob } from "../Controllers/userJob/userApplyToJob";

const router = express.Router();

router.post("/get-job-by-id", checkApplicationStatus);
router.post("/apply-job/:jobId", applyToJob);

export default router;
