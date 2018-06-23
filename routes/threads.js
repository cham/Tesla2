const express = require('express')

const threadsApi = require('../api/threads')
const authMiddleware = require('./middleware/auth')

const router = express.Router()

router.get('/', authMiddleware.requireAuth, (req, res) => threadsApi.getThreads()
  .then(threads => res.send({ threads }))
  .catch(e => res.status(400).send({ message: e.message }))
)

module.exports = router
