const jwt = require('jsonwebtoken')
const db = require('../db')
const bcrypt = require('bcrypt')

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

const login = (username, password) => new Promise((resolve, reject) => {
  db.getConnection()
    .then(() => db.User.findOne({ username }, (err, user) => {
      if (err) {
        return reject(err)
      }
      if (!user) {
        return reject(new Error('User not found'))
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return reject(new Error('Invalid credentials'))
      }
      resolve(generateToken(user.toObject()))
    }))
    .catch(reject)
})

exports.login = login
exports.verify = verifyToken
