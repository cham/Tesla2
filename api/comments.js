const db = require('../db')

const getComments = (filter, options) => db.getConnection()
  .then(() => db.Comment.find(filter)
    .skip(options.skip)
    .limit(options.limit)
    .sort(options.sort)
    .exec()
  )

exports.getComments = getComments
