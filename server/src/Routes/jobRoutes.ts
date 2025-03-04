import  express from "express"
import { loginUser } from "../Controllers/user/userLoginCont";
import { registerUser } from "../Controllers/user/usrRegCont";
import { getJobDetails } from "../Controllers/job/getJobDetails";
import { getJobById } from "../Controllers/job/getJobByID";

const router = express.Router()

router.get(`/job-details/:id`, getJobDetails);

router.get("/job/:jobId", getJobById);

export default router;
