import {  Router } from "express"
import {
  postTestRoute,
  createPost
} from "../controllers/posts-controller"
import { authUser} from '@hrioymahmud/blogcommon'



const router = Router()
router.get("/test", postTestRoute)
router.post("/create", authUser, createPost)

export { router as PostRouter}
