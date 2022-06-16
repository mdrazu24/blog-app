import express, {Request, Response} from 'express'
import morgan from 'morgan'
import cookieSession from 'cookie-session'
require('express-async-errors')
import {json} from 'body-parser'
import { errorHandler } from './middlewares/errorHandler'
import { NotFound } from './errors/notFound'
import { AuthRouter } from './routes/auth-route'
import {Client} from 'pg'
const app = express()

//this check is to catch the unexpected uncaught errors while responding to the pending request.
process.on('uncaughtException', (err) => {
    console.log("uncaughtException Error... System will terminate soon")
    console.log(err.name, err.message, err.stack)
    process.exit(1)
})

app.use(json())
app.use(cookieSession({signed : false, secure : process.env.NODE_ENV !== 'test'})) // to parser the cookie
app.use(morgan('dev')) //to log the request in the console.

// console.log(process.env.POSTGRES_HOST)

const client = new Client(
  "postgres://root:2543@postgres-auth-srv:5432/blogapp"
)

app.get('/test', async (req: Request, res: Response) => {
  
  res.send('Hello World... not you')

 } )

app.use('/api/v1', AuthRouter) //auth router is used to create user account and  other controls.



app.all('*', (req: Request, res: Response) => { 
    throw new NotFound("Route not found.")
}) //this is used to catch the error if the route is not found.

app.use(errorHandler) //this is a error handler middleware.


const startDb = async () => {
  await client
    .connect()
    .then((client) => {
      console.log("database connected")
      // console.log(client)
    })
    .catch((err) => {
      console.log(err)
    })
}


const server = app.listen(3000, () => { 
    console.log('listenign on port 3000')
}) // creating a server and storing it's value in a variable.

startDb()


// this is to make sure the server does not go down before completing the pending request when there is an error.
process.on("unhandledRejection", (err : Error) => {
  console.log("unhandledRejection Error... System will terminate soon")
  console.log(err.name, err.message, err.stack)
  server.close(() => {
    process.exit(1)
  })
})