import {  Router } from "express"
import {
  postTestRoute
} from "../controllers/posts-controller"
// import { authUser} from '@hrioymahmud/blogcommon'



const router = Router()
router.get("/test", postTestRoute)

export { router as PostRouter}
