import express from "express";
import { createJob } from "../Controllers/Employer/job/createJob";
import { getAllJobs } from "../Controllers/Employer/job/fetchJobs";
import { deleteJob } from "../Controllers/Employer/job/deleteJob";
import { editJob } from "../Controllers/Employer/job/editJob";

const router = express.Router();

// Route to create a new job
router.post(`/jobs/create`, createJob);

// Route to get all jobs
router.get(`/jobs/get-all-jobs`, getAllJobs);

// Route to delete a job by id
router.delete(`/jobs/delete/:id`, deleteJob);

// Route to edit a job by id
router.put(`/jobs/edit/:id`, editJob);

export default router;
