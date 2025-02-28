import  express from "express"
import { getJobDetails } from "../Controllers/job/getJobDetails";



const router = express.Router()

router.get(`/job-details/:id`, getJobDetails);


export default router;