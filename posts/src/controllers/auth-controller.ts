import {  Request, Response } from "express"
// import prismaClient  from "../client"



export const postTestRoute = async (req: Request, res: Response) => {

  res.send("hit the endpoint.")
}
