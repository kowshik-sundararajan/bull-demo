const Queue = require('bull')
const redisUri = 'redis://localhost:6379'

const queue = new Queue('my-first-queue', redisUri)

queue.process('my-process', (job) => {
  console.log('Processing job')
  console.log(job.data)
  return Promise.resolve()
})
