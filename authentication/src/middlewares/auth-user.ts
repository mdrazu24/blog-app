import { Request, Response, NextFunction } from "express"
import { AuthValidate } from "../errors/AuthValidate"
import jwt from 'jsonwebtoken'


export const authUser = async (req: Request, res: Response,  next : NextFunction) => { 

    if(req.session && req.session.jwt && jwt.verify(req.session.jwt, process.env.JWT_SECRET!)) {
        next()
    }else {
        throw new AuthValidate("You're not authorized to access this page.")
    }
    

}