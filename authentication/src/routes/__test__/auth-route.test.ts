import { createUser, updateUsername } from "../../test/auth-db-test"
import { prismaMock } from "../../test/setup"
import request from 'supertest'


import app from "../../app"
test("should create new user ", async () => {
  const user = {
    id: 3,
    fullName: "Rich Khan",
    email: "helloasd1@gmail.com",
    password: "testpassword",
  }

  prismaMock.user.create.mockResolvedValue(user)

  //   const userData =  await createUser(user)
  // console.log(userData)
  const userData = await request(app).post("/api/v1/create-user").send(user)
  console.log(userData)
  // expect(userData.status).toBe(201)
})

// test("should update a users name ", async () => {
//   const user = {
//     id: 1,
//     name: "Rich Haines",
//     email: "hello@prisma.io",
//   }

//   prismaMock.user.update.mockResolvedValue(user)

//   await expect(updateUsername(user)).resolves.toEqual({
//     id: 1,
//     name: "Rich Haines",
//     email: "hello@prisma.io",
//   })
// })

