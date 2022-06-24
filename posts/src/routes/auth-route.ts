import {  Router } from "express"
import {
  postTestRoute
} from "../controllers/auth-controller"
// import { authUser} from '@hrioymahmud/blogcommon'



const router = Router()
router.get("/test", postTestRoute)

export { router as PostRouter}
