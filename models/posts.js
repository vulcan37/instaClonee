const mongoose = require('mongoose');
const PostSchema = new mongoose.Schema({
  caption: {
    type: String,
    required: [true, 'please provide caption'],
    default: 'hi'
  },
  image: {
    type: String,
    default: 0
  },
  name: {
    type: String,
    required: [true, 'please provide name'],
    minlength: [5, 'name should be min 5 characters'],
    maxlength: 50
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide user'],
  }
}, { timestamps: true })
module.exports = mongoose.model('Posts', PostSchema)