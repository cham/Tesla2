const authApi = require('../../api/auth')
const validator = require('./validators/auth')

exports.requireAuth = (req, res, next) => {
  validator.token(req, res, () => {
    authApi.verify(req.query.token)
      .then((payload) => {
        req.user = payload
        next()
      })
      .catch(e => res.status(401).send({ message: e.message }))
  })
}
