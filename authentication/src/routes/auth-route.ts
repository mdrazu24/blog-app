import {  Router } from "express"
import { createAccount } from "../controllers/auth-controller"
import { CREATE_ACCOUNT } from "../validation/auth-validation"
import {validateRequest} from '../errors/validationError'



const router = Router()


router.post("/create-user", CREATE_ACCOUNT, validateRequest, createAccount)

export { router as AuthRouter}
