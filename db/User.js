const mongoose = require('mongoose')

const schema = mongoose.Schema({
  username: {type: String, index: {unique: true, dropDups: true}},
  urlname: {type: String, index: {unique: true, dropDups: true}},
  password: String,
  email: {type: String},
  activated: {type: Boolean, default: true},
  banned: Boolean,
  ban_reason: String,
  last_ip: String,
  known_ips: [String],
  last_login: Date,
  created: Date,
  modified: Date,
  view_html: {type: Boolean, default: true},
  random_titles: {type: Boolean, default: true},
  emoticon: String,
  custom_css: String,
  threads_count: {type: Number, default: 0},
  comments_count: {type: Number, default: 0},
  hide_enemy_posts: Boolean,
  custom_js: String,
  hide_ads: Boolean,
  points: {type: Number, default: 0, min: 0},
  lastpointusage: Date,
  thread_size: {type: Number, default: 50},
  comment_size: {type: Number, default: 50},
  favourites: [String],
  hidden: [String],
  buddies: [String],
  ignores: [String],
  realname: String,
  location: String,
  about: String,
  websites: [{
    name: String,
    url: String
  }],
  fixed_chat_size: Boolean,
  membernumber: Number
})

module.exports = mongoose.model('User', schema)
