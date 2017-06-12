let mongoose = require('mongoose')

// Post Schema
let postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  comments: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }
})

let Post = module.exports = mongoose.model('Post', postSchema)