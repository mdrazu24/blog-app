import express, {Request, Response} from 'express'
import morgan from 'morgan'
import cookieSession from 'cookie-session'
require('express-async-errors')
import {json} from 'body-parser'
import { errorHandler } from './middlewares/errorHandler'
import { NotFound } from './errors/notFound'
import { AuthRouter } from './routes/auth-route'
// import {Client} from 'pg'
import { PrismaClient } from '@prisma/client'


const app = express()

//this check is to catch the unexpected uncaught errors while responding to the pending request.
process.on('uncaughtException', (err) => {
    console.log("uncaughtException Error... System will terminate soon")
    console.log(err.name, err.message, err.stack)
    process.exit(1)
})

export const prisma = new PrismaClient()
app.set('trust proxy', true)
app.use(json())
app.use(cookieSession(
  {signed : false,
     secure : process.env.NODE_ENV !== 'test', maxAge : 24 * 60 * 60 * 1000
    }
  )) // to parser the cookie
app.use(morgan('dev')) //to log the request in the console.



// const client = new Client(
//   "postgres://root:2543@postgres-auth-srv:5432/blogapp"
// )


app.use('/api/v1', AuthRouter) //auth router is used to create user account and  other controls.



app.all('*', (req: Request, res: Response) => { 
    throw new NotFound("Route not found.")
}) //this is used to catch the error if the route is not found.

app.use(errorHandler) //this is a error handler middleware.


async function startDb ()  {
await prisma.$connect().then(() => {console.log("Database connected")}).catch(err => {console.log(err)})

//this is to connect the database with pg library.
  // await client
  //   .connect()
  //   .then((asd) => {
  //     console.log("database connected")
    
  //     // console.log(client)
  //   })
  //   .catch((err : Error)  => {

  //     console.log(err)
  //   })
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