import { prismaMock, authPrismaMock } from "../../test/setup"
import request from "supertest"
import { app } from "../../app"
import {app as autAPp} from '../../../../authentication/src/app'
test("should return 400 statusCode", async () => {
  const user = {
    id: 3,
    fullName: "Rich Khan",
    email: "test@gmail.com",
    password: "testpassword",
    userId : 1
  }

  authPrismaMock.user.create.mockResolvedValue(user)

  await request(autAPp).post("/api/v1/auth/create-user").send({}).expect(400)
})

test("should create new user and return a cookieSession", async () => {
  const user = {
    id: 1,
    fullName: "Rich Khan",
    email: "test@gmail.com",
    password: "testpassword",
    userId: 1,
  }

  authPrismaMock.user.create.mockResolvedValue(user)

  const userData = await request(autAPp).post("/api/v1/auth/create-user").send(user).expect(200)
   

  expect(userData.headers["set-cookie"]).toBeDefined()
  console.log(userData.headers["set-cookie"][0])
})


