import { Request, Response } from "express"
//this is the endpoint that will be used to create user account.


export const createAccount = async (req: Request, res: Response) => {
    const {email, fullName, password} = req.body

    console.log(email, fullName, password)
  res.status(200).json("form the controller folder")
}