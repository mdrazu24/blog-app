import {  Router } from "express"
import {
  postTestRoute,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/posts-controller"
import { authUser} from '@hrioymahmud/blogcommon'



const router = Router()
router.get("/test", postTestRoute)
router.post("/create", authUser, createPost)
router.post("/update/:id", authUser, updatePost)
router.delete("/delete/:id", authUser, deletePost)

export { router as PostRouter}
