const jwt = require('jsonwebtoken')

const verifyToken = token => new Promise((resolve, reject) => {
  jwt.verify(token, process.env.NS_TESLA_JWT_SECRET, (err, tokenData) => {
    if (err || !tokenData) {
      return reject(err)
    }
    resolve(tokenData)
  })
})

const generateToken = payload => new Promise((resolve, reject) => {
  jwt.sign(payload, process.env.NS_TESLA_JWT_SECRET, { expiresIn: '1 year' }, (err, token) => {
    if (err || !token) {
      return reject(err)
    }
    resolve(token)
  })
})

exports.login = (username, password) => generateToken({ username })

exports.verify = verifyToken
