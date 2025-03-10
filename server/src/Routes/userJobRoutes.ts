import express from "express";
import { checkApplicationStatus } from "../Controllers/userJob/applicationStatus";

const router = express.Router();

router.get("/get-job-by-id/:jobId", checkApplicationStatus);

export default router;
