const express = require('express')

const threadsApi = require('../api/threads')
const threadsValidator = require('./middleware/validators/threads')
const authMiddleware = require('./middleware/auth')

const router = express.Router()

router.get('/', authMiddleware.requireAuth, (req, res) => threadsApi.getThreads()
  .then(threads => res.send({ threads }))
  .catch(e => res.status(400).send({ message: e.message }))
)

router.get('/:urlname/complete', authMiddleware.requireAuth, threadsValidator.getOne, (req, res) => threadsApi.getThread({ urlname: req.params.urlname }, { populate: true })
  .then(thread => res.send(thread))
  .catch(e => res.status(400).send({ message: e.message }))
)

router.get('/:urlname', authMiddleware.requireAuth, threadsValidator.getOne, (req, res) => threadsApi.getThread({ urlname: req.params.urlname })
  .then(thread => res.send(thread))
  .catch(e => res.status(400).send({ message: e.message }))
)


module.exports = router
