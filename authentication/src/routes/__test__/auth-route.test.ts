import { prismaMock } from "../../test/setup"
import request from 'supertest'
import app from "../../app"


test("should create new user ", async () => {
  const user = {
    id: 3,
    fullName: "Rich Khan",
    email: "test@gmail.com",
    password: "testpassword",
  }

  prismaMock.user.create.mockResolvedValue(user)

  const userData = await request(app).post("/api/v1/create-user").send(user)
  expect(userData.status).toBe(201)
})



