const mongoose = require('mongoose')
const User = require('./User')
const Thread = require('./Thread')

const makeConnection = () => {
  mongoose.connect('mongodb://localhost/tesladb')
}
const db = mongoose.connection
let connected = false
let pending = []

db.on('error', () => {
  console.error('mongoose connection error')
  setTimeout(makeConnection, 5000)
})

db.once('open', () => {
  console.log('mongoose connection ok')
  connected = true
  if (!pending.length) {
    return
  }
  pending.forEach(resolve => resolve(db))
  pending = []
})

makeConnection()

exports.getConnection = () => new Promise((resolve, reject) => {
  if (connected) {
    return resolve(db)
  }
  pending.push(resolve)
})

exports.User = User
exports.Thread = Thread
