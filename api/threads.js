const db = require('../db')

const getThreads = () => new Promise((resolve, reject) => {
  db.getConnection()
    .then(() => db.Thread.find().limit(50).exec((err, threads) => {
      if (err) {
        return reject(err)
      }
      resolve(threads)
    }))
})

exports.getThreads = getThreads