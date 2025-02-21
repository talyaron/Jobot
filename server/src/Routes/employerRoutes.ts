import  express from "express"
import { craeteJob } from "../Controllers/Employer/job/createJob"
import { getAllJobs } from "../Controllers/Employer/job/fetchJobs";
import { deleteJob } from "../Controllers/Employer/job/deleteJob";
import { editJob } from "../Controllers/Employer/job/editJob";

const router = express.Router()

router.post(`/create-job`, craeteJob);
router.put(`/edit-job`, editJob);
router.delete(`/delete-job/:id`, deleteJob);
router.get(`/fetch-jobs`, getAllJobs);


export default router;