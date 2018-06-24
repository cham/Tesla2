const requiredParams = require('./requiredParams')

exports.getOne = (req, res, next) => {
  const validationError = requiredParams(req.params, {
    urlname: { type: 'Slug', maxLength: 250 }
  })
  if (validationError) {
    return res.status(400).send({ message: validationError })
  }
  next()
}
