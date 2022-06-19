
import { prisma } from "./client"
import app from './app'

async function startDb() {
  await prisma
    .$connect()
    .then(() => {
      console.log("Database connected")
    })
    .catch((err) => {
      console.log(err)
    })

  //this is to connect the database with pg library.
  // await client
  //   .connect()
  //   .then((asd) => {
  //     console.log("database connected")

  //     // console.log(client)
  //   })
  //   .catch((err : Error)  => {

  //     console.log(err)
  //   })
}

export const server = app.listen(3000, () => {
  console.log("listenign on port 3000")
}) // creating a server and storing it's value in a variable.

startDb()

// this is to make sure the server does not go down before completing the pending request when there is an error.
process.on("unhandledRejection", (err: Error) => {
  console.log("unhandledRejection Error... System will terminate soon")
  console.log(err.name, err.message, err.stack)
  server.close(() => {
    process.exit(1)
  })
})