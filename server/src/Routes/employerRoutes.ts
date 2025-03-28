import express from "express";
import { createJob } from "../Controllers/Employer/job/createJob";
import { getAllJobs, getJobsByEmployer } from "../Controllers/Employer/job/fetchJobs";
import { deleteJob } from "../Controllers/Employer/job/deleteJob";
import { editJob } from "../Controllers/Employer/job/editJob";
import { getCandidatesByEmployerId } from "../Controllers/job/getJobs";
import { userIdMiddleware } from "../utils/authMiddleware";

const router = express.Router();

router.post(`/create`, createJob);

router.get(`/get-all-jobs`, getAllJobs);

router.get("/get-jobs-by-employer", getJobsByEmployer);

router.delete(`/delete/:id`, deleteJob);

router.put(`/edit/:id`, editJob);
router.get("/get-candidates-by-employer-id", userIdMiddleware, getCandidatesByEmployerId);

export default router;
