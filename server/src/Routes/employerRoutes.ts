import express from "express";
import { createJob } from "../Controllers/Employer/job/createJob";
import { getAllJobs } from "../Controllers/Employer/job/fetchJobs";
import { deleteJob } from "../Controllers/Employer/job/deleteJob";
import { editJob } from "../Controllers/Employer/job/editJob";

const router = express.Router();

router.post(`/create`, createJob);

router.get(`/get-all-jobs`, getAllJobs);

router.delete(`/delete/:id`, deleteJob);

router.put(`/edit/:id`, editJob);

export default router;
