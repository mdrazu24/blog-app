import {  Router } from "express"
import {
  postTestRoute,
  createPost,
  updatePost,
  deletePost,
  postTestRouteTwo,
} from "../controllers/posts-controller"
import { authUser} from '@hrioymahmud/blogcommon'
import { getAllPost, getSinglePost } from '../controllers/posts-controller';



const router : Router = Router()
router.get("/test", postTestRoute)
router.get("/test2", authUser, postTestRouteTwo)
router.get("/all", authUser, getAllPost)
router.get("/:id", authUser, getSinglePost)
router.post("/create", authUser, createPost)
router.post("/update/:id", authUser, updatePost)
router.delete("/delete/:id", authUser, deletePost)

export { router as PostRouter}
