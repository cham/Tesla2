const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const port = process.env.NS_TESLA_PORT

app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '50mb'
}))

app.use('/v1/auth', require('../routes/auth'))
app.use('/v1/threads', require('../routes/threads'))

app.listen(port, () => {
  console.log(`Worker listening on port ${port}`);
})
