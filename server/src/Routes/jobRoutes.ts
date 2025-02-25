import  express from "express"
import { loginUser } from "../Controllers/user/userLoginCont";
import { registerUser } from "../Controllers/user/usrRegCont";
import { getJobDetails } from "../Controllers/job/getJobDetails";

const router = express.Router()

router.get(`/job-details/:id`, getJobDetails);

import { getJobById } from "../Controllers/job/getJobByID";


router.get("/job/:jobId", getJobById);

export default router;
