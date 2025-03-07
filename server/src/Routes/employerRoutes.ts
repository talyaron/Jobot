import express from "express";
import { createJob } from "../Controllers/Employer/job/createJob";
import { getAllJobs, getJobsByEmployer } from "../Controllers/Employer/job/fetchJobs";
import { deleteJob } from "../Controllers/Employer/job/deleteJob";
import { editJob } from "../Controllers/Employer/job/editJob";

const router = express.Router();

router.post(`/create`, createJob);

router.get(`/get-all-jobs`, getAllJobs);

router.get("/get-jobs-by-employer", getJobsByEmployer);

router.delete(`/delete/:id`, deleteJob);

router.put(`/edit/:id`, editJob);

export default router;
