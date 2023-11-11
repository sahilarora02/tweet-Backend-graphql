const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  previousPost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  },
  // Other post-related fields
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;