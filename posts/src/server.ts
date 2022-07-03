
import prisma  from "./client"
import {app} from './app'
import {Kafka} from 'kafkajs'

const kafka = new Kafka({
  clientId: "blogapp",
  brokers: ["192.168.1.240:9092"],
})



const producer = kafka.producer()

const sendMessage = async () => {
await producer.connect()
await producer.send({
  topic: "testing",
  messages: [{ value: "Hello from the post service!" }],
})
 }

sendMessage()

async function startDb() {
  await prisma
    .$connect()
    .then(() => {
      console.log("Database connected")
    })
    .catch((err : Error) => {
      console.log(err)
    })

}

const server = app.listen(3000, () => {
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