import {  Router } from "express"
import { createAccount, login, userTestRoute } from "../controllers/auth-controller"
import { CREATE_ACCOUNT, LOGIN } from "../validation/auth-validation"
import {validateRequest} from '../errors/validationError'
import { authUser } from '../middlewares/auth-user';



const router = Router()

router.get("/test", authUser, userTestRoute)
router.post("/create-user", CREATE_ACCOUNT, validateRequest, createAccount)
router.post("/login", LOGIN, validateRequest, login)


export { router as AuthRouter}
