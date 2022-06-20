import express, {Request, Response} from 'express'
import morgan from 'morgan'
import cookieSession from 'cookie-session'
require('express-async-errors')
import {json} from 'body-parser'
// import { errorHandler } from './middlewares/errorHandler'

// import { NotFound } from './errors/notFound'
import { NotFound, errorHandler } from '@hrioymahmud/blogcommon'
import { AuthRouter } from './routes/auth-route'

const app = express()
export interface UserInfo {
  fullName?: string
  email: string,
  id : string
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserInfo
    }
  }
}

//this check is to catch the unexpected uncaught errors while responding to the pending request.
process.on('uncaughtException', (err) => {
    console.log("uncaughtException Error... System will terminate soon")
    console.log(err.name, err.message, err.stack)
    process.exit(1)
})

app.set('trust proxy', true)
app.use(json())
app.use(cookieSession(
  {signed : false,
     secure : process.env.NODE_ENV !== 'test', maxAge : 24 * 60 * 60 * 1000 //this is one day.
    }
  )) // to parser the cookie
app.use(morgan('dev')) //to log the request in the console.


app.use('/api/v1/auth', AuthRouter) //auth router is used to create user account and  other controls.


app.all('*', (req: Request, res: Response) => { 
    throw new NotFound("Route not found.")
}) //this is used to catch the error if the route is not found.

app.use(errorHandler) //this is a error handler middleware.


export {app};