import { Request, Response, NextFunction } from "express"
import { AuthValidate } from "../errors/AuthValidate"
import jwt from "jsonwebtoken"

export const authUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.session && req.session.jwt) {
    try {
      const user = jwt.verify(req.session.jwt, process.env.JWT_SECRET!) as {
        id: string
        email: string
      }
      req.currentUser = {
        id: user.id,
        email: user.email,
      }

      next()
    } catch (err) {
      req.session = null
      console.log(err)
      throw new AuthValidate("You're not authorized to access this page.")
    }
  } else {
    throw new AuthValidate("You're not authorized to access this page.")
  }
}
