import  express from "express"
import { loginUser } from "../Controllers/user/userLoginCont";
import { registerUser } from "../Controllers/user/usrRegCont";



const router = express.Router()

router.get(`/user-login`,loginUser );
router.post(`/user-register`,registerUser );


export default router;