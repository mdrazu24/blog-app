
import prisma  from "./client"
import {app} from './app'
import {Kafka} from 'kafkajs'

// import {KafkaBus, KafkaEventType} from '@hrioymahmud/blogcommon'

const kafka = new Kafka({
  clientId: "blog-app",
  brokers: ["192.168.1.240:9092"],
})

export const producer = kafka.producer()

async function connectProducer () {
  await producer.connect().then(() => console.log("producer connected.") )
}

connectProducer()
// KafkaBus.send(
//     KafkaEventType.POST_CREATED
// ,
//   {
//     type: KafkaEventType.POST_CREATED,
//     data: { id: "1", title: "title", content: "content", authorId: 1 },
//   }
// )

// KafkaBus.recieve(KafkaEventType.POST_CREATED).then(consumer => {
//   consumer.run({
//     eachMessage: async ({ topic, message }) => {
//      const val = message.value
//      console.log(topic)
//       console.log(val && val.toString())
//     }
//   })
// }
// )


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