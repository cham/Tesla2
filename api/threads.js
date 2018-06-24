const db = require('../db')

const getThreads = () => new Promise((resolve, reject) => {
  db.getConnection()
    .then(() => db.Thread.find()
      .limit(50)
      .sort('-last_comment_time')
      .exec((err, threads) => {
        if (err) {
          return reject(err)
        }
        resolve(threads)
      })
    )
})

const getThread = filter => new Promise((resolve, reject) => {
  db.getConnection()
    .then(() => db.Thread.find(filter, (err, thread) => {
      if (err) {
        return reject(err)
      }
      if (!thread) {
        return reject(new Error('Thread not found'))
      }
      resolve(thread)
    }))
})

exports.getThreads = getThreads
exports.getThread = getThread
