
import prisma  from "./client"
import {app} from './app'
import {KafkaEventType} from '@hrioymahmud/blogcommon'
import {Kafka} from 'kafkajs'

const kafka = new Kafka({
  clientId: "blog-app",
  brokers: ["20.239.14.146:9092"],
  // brokers: ["192.168.1.240:9092"],
})
// 192.168.1.240
const consumer = kafka.consumer({ groupId: "blog-app" })

async function consumerConnect (){  
  await consumer.connect().then(() => console.log("consumer connected.") )
  
  await consumer.subscribe({
    topics: [KafkaEventType.POST_CREATED, KafkaEventType.POST_DELETED, KafkaEventType.POST_UPDATED],
    fromBeginning: true,
  })

  await consumer.run({
    eachMessage: async ({ topic, message }) => {
      console.log(topic)
      console.log({
        value: message.value!.toString(),
      })
    },
  })


} 

consumerConnect()

async function startDb() {
  await prisma
    .$connect()
    .then(() => {
      console.log("Database connected")
    })
    .catch((err) => {
      console.log(err)
    })

}




const server = app.listen(3000, () => {
  console.log("listenign on port 3000")
}) // creating a server and storing it's value in a variable.
//
startDb()

// this is to make sure the server does not go down before completing the pending request when there is an error.
process.on("unhandledRejection", (err: Error) => {
  console.log("unhandledRejection Error... System will terminate soon")
  console.log(err.name, err.message, err.stack)
  server.close(() => {
    process.exit(1)
  })
})