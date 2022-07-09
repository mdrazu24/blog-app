import { prismaMock } from "../../test/setup"
import request from 'supertest'
import {app} from "../../app"

test("should return 400 statusCode", async () => {
  const user = {
    id: 3,
    fullName: "Rich Khan",
    email: "test@gmail.com",
    password: "testpassword",
  }

  prismaMock.user.create.mockResolvedValue(user)

  await request(app).post("/api/v1/auth/create-user").send({}).expect(400)

})


test("should create new user and return a cookieSession", async () => {
  const user = {
    id: 1,
    fullName: "Rich Khan",
    email: "test@gmail.com",
    password: "testpassword",
  }

  prismaMock.user.create.mockResolvedValue(user)

  const userData = await request(app).post("/api/v1/auth/create-user").send(user).expect(200)
  console.log(userData.error)

  expect(userData.body).toEqual({
    status: "Signup successful",
    user: {
      userData: { email: "test@gmail.com", fullName: "Rich Khan", id: 1 },
    },
  })

  expect(userData.headers['set-cookie']).toBeDefined()
  console.log(userData.headers["set-cookie"])
})


test("login should return a 500", async () => {
  const user = {
    id: 3,
    fullName: "Rich Khan",
    email: "test@gmail.com",
    password: "testpassword",
  }

await request(app).post("/api/v1/auth/login").send(user).expect(500)

})

test("get user list", async () => {
  //create user and get the cookie
   const user = {
    id: 3,
    fullName: "Rich Khan",
    email: "test@gmail.com",
    password: "testpassword",
  }

  prismaMock.user.create.mockResolvedValue(user)

  const userData = await request(app).post("/api/v1/auth/create-user").send(user).expect(200)
  const userCookie = userData.headers["set-cookie"][0]

 await request(app)
   .get("/api/v1/auth/test")
   .set("Cookie", userCookie)
   .expect(200)

})

// test('update the user information', async () => {

// })



