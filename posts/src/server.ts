
import prisma  from "./client"
import {app} from './app'
import {Kafka} from 'kafkajs'
import { createClient } from "redis"
// import {KafkaBus, KafkaEventType} from '@hrioymahmud/blogcommon'

const kafka = new Kafka({
  clientId: "blog-app",
  // brokers: ["192.168.1.240:9092"],
  brokers: ["20.24.116.199:9092"]
})
// 192.168.1.240
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
export const redisClient = createClient({
  url: "redis://default:2543@redis:6379",
})

const connectRedis = async () => { 
  
  redisClient.on("error", (err) => {
    console.log("Error " + err)
  }
  )
  redisClient.on("ready", () => {
    console.log("Redis is ready")
  }
  )

  await redisClient.connect()
  // const numAdded = await redis.zAdd("vehicles", [
  //   {
  //     score: 10,
  //     value: "helicopter",
  //   },
  //   {
  //     score: 12,
  //     value: "plane",
  //   },
  // ])
  // console.log(`Added ${numAdded} items.`)

  // for await (const { score, value } of redis.zScanIterator("vehicles")) {
  //   console.log(`${value} -> ${score}`)
  // }


}

connectRedis()


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