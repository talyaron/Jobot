import  express from "express"
import { registerUser } from "../Controllers/user/usrRegCont";
import { loginUser } from "../Controllers/user/userLoginCont";
import { checkAuthStatus } from "../Controllers/user/checkAuthStatus"; // Ensure this path is correct


const router = express.Router()



router.post(`/register`,registerUser );
router.post(`/login`,loginUser);
router.get(`/check-auth`, checkAuthStatus);
router.get(`/validate`,);


export default router;