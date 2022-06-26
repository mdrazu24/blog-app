import express, { Request, Response } from "express"
import morgan from "morgan"
import cookieSession from "cookie-session"
require("express-async-errors")
import { json } from "body-parser"
// import { errorHandler } from './middlewares/errorHandler'
// import { createBullBoard } from "@bull-board/api"
// import { BullMQAdapter } from "@bull-board/api/bullMQAdapter"
// import { ExpressAdapter } from "@bull-board/express"
// import { NotFound } from './errors/notFound'
import { NotFound, errorHandler, authUser } from "@hrioymahmud/blogcommon"
import { PostRouter } from "./routes/posts-route"
// import { Queue, Worker } from "bullmq"
const app = express()
export interface UserInfo {
  fullName?: string
  email: string
  id: string
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserInfo
    }
  }
}

//this check is to catch the unexpected uncaught errors while responding to the pending request.
process.on("uncaughtException", (err) => {
  console.log("uncaughtException Error... System will terminate soon")
  console.log(err.name, err.message, err.stack)
  process.exit(1)
})


// const serverAdapter = new ExpressAdapter()
// serverAdapter.setBasePath("/api/v1/posts/ui")


app.set("trust proxy", true)
app.use(json())
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
    maxAge: 24 * 60 * 60 * 1000, //this is one day.
  })
) // to parser the cookie
app.use(morgan("dev")) //to log the request in the console.

// const myQueue = new Queue("test")

// async function addJobs() {
//   await myQueue.add("testOne", { foo: "bar" })
//   await myQueue.add("testTwo", { qux: "baz" })
// }

// const worker = new Worker('test', async (job) => {
//   // Will print { foo: 'bar'} for the first job
//   // and { qux: 'baz' } for the second.
//   console.log(job.data)
// })

// worker.on("completed", (job) => {
//   console.log(`${job.id} has completed!`)
// })

// worker.on("failed", (job, err) => {
//   console.log(`${job.id} has failed with ${err.message}`)
// })



// const callFunc = async ()=> {
// await addJobs()
// } 
// callFunc()

// createBullBoard({
//   queues: [new BullMQAdapter(new Queue("test"))],
//   serverAdapter,
// })
app.use("/api/v1/posts", PostRouter) //auth router is used to create user account and  other controls.
// app.use("/api/v1/posts/ui", serverAdapter.getRouter())

app.all("*", (req: Request, res: Response) => {
  throw new NotFound("Route not found.")
}) //this is used to catch the error if the route is not found.

app.use(errorHandler) //this is a error handler middleware.

export { app }
