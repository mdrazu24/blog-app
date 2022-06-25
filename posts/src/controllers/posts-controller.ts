import { BadRequest } from "@hrioymahmud/blogcommon"
import {  Request, Response } from "express"
import prismaClient from "../client"
interface PostInterface {
  id?: number
  title: string
  content: string
  author: {
    id: number
    userId: number,
    email : string,
    fullName : string

  }

}

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

export const postTestRoute = async (req: Request, res: Response) => {

  res.send("hit the endpoint.")
}


export const createPost = async (req: Request, res: Response) => {
  const { title, content, author }: PostInterface = req.body

    const userData = req.currentUser

    if (parseInt(userData!.id!) != author.userId) {
      throw new BadRequest("You are not authorized to create this post.")
    }

    

  //check if the author is in the post db
  let  authorAccount;
   authorAccount = await prismaClient.user.findUnique({
     where: { userId: author.userId }, //make userID to unique
   })

  // if not, create the author
  if(!authorAccount){ 
    authorAccount = await prismaClient.user.create({
      data: {
        userId: parseInt(userData!.id),
        email: author.email,
        fullName: author.fullName,
      },
    })
  }

  // create the post
  const newPost = await prismaClient.post.create({
    data: {
      title,
      content,
      author: {
        connect: {
          id : authorAccount.id,          
        },
      },
    },
    include : {
      author : true
    }
  })

  
  // send the post back to the client

    res.status(201).json({ status: "success", post: newPost })

}