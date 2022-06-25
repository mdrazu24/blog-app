import { prismaMock } from "../../test/setup"
import request from 'supertest'
import {app} from "../../app"



test("should create new user and return a cookieSession", async () => {
  const user = {
    id: 1,
    fullName: "Rich Khan",
    email: "test@gmail.com",
    password: "testpassword",
    userId : 1
  }

  prismaMock.user.create.mockResolvedValue(user)

  const userData = await request(app).post("/api/v1/auth/create-user").send(user)
  console.log(userData.error)
  // expect(userData.body).toEqual("Signup successful")

  // expect(userData.headers['set-cookie']).toBeDefined()

})


// test("login should return a 500", async () => {
//   const user = {
//     id: 3,
//     fullName: "Rich Khan",
//     email: "test@gmail.com",
//     password: "testpassword",
//   }

// await request(app).post("/api/v1/login").send(user).expect(500)

// })

// test("get user list", async () => {
//   //create user and get the cookie
//    const user = {
//      id: 3,
//      fullName: "Rich Khan",
//      email: "test@gmail.com",
//      password: "testpassword",
//      userId: 1,
//    }

//   prismaMock.user.create.mockResolvedValue(user)

//   const userData = await request(app).post("/api/v1/create-user").send(user).expect(201)
//   const userCookie = userData.headers["set-cookie"][0]

//  await request(app)
//    .get("/api/v1/test")
//    .set("Cookie", userCookie)
//    .expect(200)

// })




