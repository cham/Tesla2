const db = require('../db')

const getComments = () => new Promise((resolve, reject) => {
  db.getConnection()
    .then(() => db.Comment.find()
      .limit(50)
      .sort('-created')
      .exec((err, comments) => {
        if (err) {
          return reject(err)
        }
        resolve(comments)
      })
    )
})

exports.getComments = getComments
