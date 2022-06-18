import { Request, Response, NextFunction } from "express"
import { AuthValidate } from "../errors/AuthValidate"
import jwt from 'jsonwebtoken'


export const authUser = async (req: Request, res: Response,  next : NextFunction) => { 
    // console.log(jwt.verify(req.session!.jwt, process.env.JWT_SECRET!))
    if(req.session && req.session.jwt && jwt.verify(req.session.jwt, process.env.JWT_SECRET!)) {
        const user = jwt.verify(req.session!.jwt, process.env.JWT_SECRET!) as {id: string, email: string}

       req.currentUser = {
         id: user.id,
         email: user.email,
       }
      next()
    }else {
        throw new AuthValidate("You're not authorized to access this page.")
    }
    

}