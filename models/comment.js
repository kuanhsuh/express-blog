let mongoose = require('mongoose')

// Comment Schema
let commentSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  _post: {
    type: String,
    ref: 'Post'
  }
})

let Comment = module.exports = mongoose.model('Comment', commentSchema)