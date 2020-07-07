const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())

const Queue = require('bull')
const redisUri = 'redis://localhost:6379'
const queue = new Queue('my-first-queue', redisUri)

app.post('/job', async (req, res) => {
  const { name } = req.body
  await queue.add('my-process', { name }, { delay: 2000 })
  return res.status(200).json({
    success: true,
    message: 'Job added to the queue!'
  })
})

app.listen(9000, () => console.log('App is running!'))
