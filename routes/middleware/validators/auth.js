const requiredParams = require('./requiredParams')

exports.login = (req, res, next) => {
  const validationError = requiredParams(req.body, {
    username: { type: 'String', maxLength: 50 },
    password: { type: 'String', maxLength: 50 }
  })
  if (validationError) {
    return res.status(400).send({ message: validationError })
  }
  next()
}

exports.token = (req, res, next) => {
  const validationError = requiredParams(req.query, {
    token: { type: 'JWT' }
  })
  if (validationError) {
    return res.status(400).send({ message: validationError })
  }
  next()
}
