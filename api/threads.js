const db = require('../db')
const commentsApi = require('./comments')

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

const getThread = (filter, options) => new Promise((resolve, reject) => {
  db.getConnection()
    .then(() => db.Thread.findOne(filter, (err, thread) => {
      if (err) {
        return reject(err)
      }
      if (!thread) {
        return reject(new Error('Thread not found'))
      }
      thread = thread.toObject()
      if (options && options.populate) {
        return commentsApi.getComments({ threadid: thread._id })
          .then(comments => resolve(Object.assign({}, { comments }, thread)))
          .catch(reject)
      }
      resolve(thread)
    }))
})

exports.getThreads = getThreads
exports.getThread = getThread
