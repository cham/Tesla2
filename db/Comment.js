const mongoose = require('mongoose')

const schema = mongoose.Schema({
  threadid: {type: String, ref: 'Thread'},
  postedby: String,
  created: Date,
  edit_percent: Number,
  points: Number,
  content: String
})

schema.index({threadid:  1})
schema.index({threadid: -1})
schema.index({created: -1})
schema.index({created: 1})

module.exports = mongoose.model('Comment', schema)
