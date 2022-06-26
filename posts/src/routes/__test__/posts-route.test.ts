import { prismaMock} from "../../test/setup"
import request from "supertest"
import { app } from "../../app"

test("should return 200 statusCode from the test endpoint", async () => {

  const req = await request(app).get("/api/v1/posts/test").expect(200)

  console.log(req.headers["set-cookie"][0])
  // console.log(req)
})

test("test 2 with auth", async () => {
  const req = await request(app).get("/api/v1/posts/test").expect(200)
  const cookie = req.headers["set-cookie"][0]

  await request(app)
    .get("/api/v1/posts/test2")
    .set("Cookie", cookie)
    .expect(200)

})



// test("create a post.", async () => {
//    const req = await request(app).get("/api/v1/posts/test").expect(200)
//    const cookie = req.headers["set-cookie"][0]
  
//   const post = {
//     id: 1,
//     title: "second titile",
//     content: "second conetent",
//     createdAt : new Date(),
//     updatedAt : new Date(),
//     authorId : 1,
//     author: {
//       id: 1,
//       userId: 1,
//       email: "test@gmail.com",
//       fullName: "Alif Hossain",
//     },
//   }

//   prismaMock.post.create.mockResolvedValue(post)

//   const userData = await request(app)
//     .post("/api/v1/posts/create").set('Cookie', cookie).expect(500)
   
//   // expect(userData.headers["set-cookie"]).toBeDefined()
// })


