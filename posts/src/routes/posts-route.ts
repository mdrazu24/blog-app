import {  Router } from "express"
import {
  postTestRoute,
  createPost,
  updatePost,
  deletePost,
  postTestRouteTwo,
} from "../controllers/posts-controller"
import { authUser} from '@hrioymahmud/blogcommon'



const router = Router()
router.get("/test", postTestRoute)
router.get("/test2", postTestRouteTwo)
router.post("/create", authUser, createPost)
router.post("/update/:id", authUser, updatePost)
router.delete("/delete/:id", authUser, deletePost)

export { router as PostRouter}
