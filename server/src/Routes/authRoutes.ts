import  express from "express"
import { registerUser } from "../Controllers/user/usrRegCont";
import { loginUser } from "../Controllers/user/userLoginCont";


const router = express.Router()

router.post(`/register`,registerUser );
router.post(`/login`,loginUser)

export default router;