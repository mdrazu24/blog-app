import {  Request, Response } from "express"
import {  UserInfo } from "../app"
import { prisma as prismaClient } from "../client"
// import prismaClient from '../test/client'
import { BadRequest } from "../errors/BadRequest"
import { Password } from "../services/Password"
import jwt from "jsonwebtoken"



export const userTestRoute = async (req: Request, res: Response) => {
  const allUse = await prismaClient.user.findMany({
    select: { email: true, password: false, fullName: true, id: true },
  })

  console.log(req.currentUser)

  res.send(allUse)
}

export const createAccount = async (req: Request, res: Response) => {
  const { email, fullName, password } = req.body

  //check user and email is already exists. if exist thorw error.
  const userExists = await prismaClient.user.findFirst({ where: { email } })

  //bad request
  if (userExists) {
    throw new BadRequest("User already exists", 500)
  }

  const hashshedPassowrd = await Password.toHash(password, process.env.SALT!)

  const user = await prismaClient.user.create({
    data: {
      email,
      fullName,
      password: hashshedPassowrd,
    },
  })

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET!,
    {
      expiresIn: "24h",
    }
  )
  //setup a session

  req.session = {
    jwt: token,
  }

  //set a user id in the session

  req.currentUser = {
    id: user.id.toString(),
    email: user.email,
    fullName: user.fullName,
  }

  
  res.status(201).json("Signup successful")
}

export const login = async (req: Request, res: Response) => {
  const { password, email } = req.body
  const user = await prismaClient.user.findFirst({
    where: { email },
  })

  if (!user) {
    throw new BadRequest("Credentials does not exists.", 500)
  }

  const isValid = await Password.compare(
    password,
    user.password,
    process.env.SALT!
  )

  if (!isValid) {
    throw new BadRequest("Credentials does not exists.", 500)
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET!,
    {
      expiresIn: "24h",
    }
  )
  //setup a session

  req.session = {
    jwt: token,
  }

  
  // set a user id in the session
 req.currentUser = {
   id: user.id.toString(),
   email: user.email,
   fullName: user.fullName,
 }
  const { password: uPass, ...userData } = user

  res.status(200).json({ status: "Login successful", user: { userData } })
}


export const updateBasicInfo = async (req: Request, res: Response) => { 
  const { fullName, email } = req.body
  const userId = req.params.id

    if (!fullName && !email) {
      throw new BadRequest("Please enter atleast one field to update.", 500)
    }

    const verifyUser = jwt.verify(req.session!.jwt, process.env.JWT_SECRET!) as UserInfo
  const currentUserId = verifyUser.id

  if(userId != currentUserId) {
    throw new BadRequest("Pleasee login first to change data.", 500)
  }

  let user = await prismaClient.user.findFirst({where : {id : parseInt(userId)}})

  if(!user) {
    throw new BadRequest("User does not exists.", 500)
  }

  if(email){
     user = await prismaClient.user.update({
       where: { id: parseInt(userId) },
       data: {
         email,
       },
     })
  }

  if(fullName) {
    user = await prismaClient.user.update({
      where: { id: parseInt(userId) },
      data: {
        fullName,
      },
    })
  }

const token = jwt.sign(
  { id: user.id, email: user.email },
  process.env.JWT_SECRET!,
  {
    expiresIn: "24h",
  }
)
//setup a session

req.session = {
  jwt: token,
}

//set a user id in the session
req.currentUser = {
  id: user.id.toString(),
  email: user.email,
  fullName: user.fullName,
}
  
  const {password, ...data} = user

    res.status(200).json({
      status: "Update successful",
      user: {...data}
    })
}