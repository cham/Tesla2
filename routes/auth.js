const express = require('express')

const authApi = require('../api/auth')
const authValidator = require('./middleware/validators/auth')
const authMiddleware = require('./middleware/auth')

const router = express.Router()

/* GET */
router.get('/verify-token', authMiddleware.requireAuth, (req, res) => res.end())

/* POST */
router.post('/login', authValidator.login, (req, res) => authApi.login(req.body.username, req.body.password)
  .then(token => res.send({ token }))
  .catch(e => res.status(400).send({ message: e.message }))
)

module.exports = router
