import express from "express";
import { getJobById } from "../Controllers/job/getJobByID";

const router = express.Router();

router.get("/job/:jobId", getJobById);

export default router;
