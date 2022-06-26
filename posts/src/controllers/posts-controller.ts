import { BadRequest } from "@hrioymahmud/blogcommon"
import {  Request, Response } from "express"
import prismaClient from "../client"
import jwt from 'jsonwebtoken';
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
  const token = jwt.sign(
    { id: 1, email: "test@gmail.com" },
    process.env.JWT_SECRET!,
    {
      expiresIn: "24h",
    }
  )
  req.session = ({ jwt: token })
  res.send("hit the endpoint.")
}

export const postTestRouteTwo = async (req: Request, res: Response) => { 
  res.send("successfull.")
}


export const createPost = async (req: Request, res: Response) => {
  const { title, content, author }: PostInterface = req.body

  if(!title || !content || !author) { 
    throw new BadRequest("Invalid post data.", 500)
  }
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

export const updatePost = async (req: Request, res: Response) => {
  const postId = parseInt(req.params.id)
  const currentUser = req.currentUser

  //check if the author is in the post db
  const user = await prismaClient.user.findUnique({where : {userId : parseInt(currentUser!.id!)}})

  //throw an error if the author dosen't exist
  if(!user){
    throw new BadRequest("You are not authorized to update this post.")
  }
  //check if the post exists
  let post;
  post = await prismaClient.post.findUnique({
    where: {
      id: postId,
    },
    include : {
      author : true
    }
  })

  if (!post) {
    throw new BadRequest("Post not found.")
  }

  //throw an error if the post dosen't exist

  //  -------------update the post-----------------

  //updated the title if provided
  if (req.body.title) {
    post = await prismaClient.post.update({
      where: { id: postId },
      data: { title: req.body.title },
      include: {
        author: true,
      },
    })
  }

  //updated the content if provided
   if (req.body.content) {
     post = await prismaClient.post.update({
       where: { id: postId },
       data: { content: req.body.content },
       include: {
         author: true,
       },
     })
   }

  //send the post back to the client
  res.status(200).json({ status: "success", post: post })
}

export const deletePost = async (req: Request, res: Response) => {
  const postId = parseInt(req.params.id)
  //check if the author is in the post db
  const currentUser = req.currentUser

  //check if the author match with the post author
  const user = await prismaClient.user.findUnique({where : {userId : parseInt(currentUser!.id!)}})

  //throw error if dosent't match or found

  if (!user || user.userId != parseInt(req.currentUser!.id)) {
    throw new BadRequest("You are not authorized to delete this post.")
  } 

  //delete the post

  await prismaClient.post.delete({where : {
    id : postId
  }})


  //send operation status to the client
  res.status(200).json({ status: "Delete successful." })

}