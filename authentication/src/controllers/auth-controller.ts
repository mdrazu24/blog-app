import { request, Request, Response } from "express"
import { prisma as prismaClient } from "../app"
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
    { userId: user.id, email: user.email },
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

  res.status(200).json("Signup successful")
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
    { userId: user.id, email: user.email },
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

  const { password: uPass, ...userData } = user

  res.status(200).json({ status: "Login successful", user: { userData } })
}
