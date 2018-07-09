const express = require('express')

const commentsApi = require('../api/comments')
const authMiddleware = require('./middleware/auth')
const requestOptions = require('./utils/requestOptions')

const router = express.Router()

router.get('/', authMiddleware.requireAuth, (req, res) => commentsApi.getComments({}, requestOptions(req))
  .then(comments => res.send({ comments }))
  .catch(e => res.status(400).send({ message: e.message }))
)


module.exports = router
