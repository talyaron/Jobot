import  express from "express"
import { loginUser } from "../Controllers/user/userLoginCont";
import { registerUser } from "../Controllers/user/usrRegCont";
import { getJobDetails } from "../Controllers/job/getJobDetails";

const router = express.Router()

router.get(`/job-details/:id`, getJobDetails);

import { getJobById } from "../Controllers/job/getJobByID";
import { getCandidatesByJobId } from "../Controllers/job/getCandidatesByJobID";


router.get("/job/:jobId", getJobById);
router.get("/job/getCandidates/:jobId", getCandidatesByJobId);

export default router;
