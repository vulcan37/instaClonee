const Post = require('../models/posts');
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const getAllPosts = async (req, res) => {
  const Posts = await Post.find({}).sort('-createdAt');
  res.status(StatusCodes.OK).json({ Posts })
}


const createPost = async (req, res) => {
  req.body.user = req.user.userId
  req.body.name = req.user.name
  const post = await Post.create(req.body)
  res.status(StatusCodes.CREATED).json({ post })
}

const updatePost = async (req, res) => {
  const {
    user: { userId },
    params: { id: postId },
  } = req


  const post = await Post.findByIdAndUpdate(
    { _id: postId, user: userId },
    req.body,
    { new: true, runValidators: true }
  )
  if (!post) {
    throw new NotFoundError(`No post with id ${postId}`)
  }
  res.status(StatusCodes.OK).json({ post })
}

const deletePost = async (req, res) => {
  const {
    user: { userId },
    params: { id: postId },
  } = req

  const post = await Post.findByIdAndRemove({
    _id: postId,
    createdBy: userId,
  })
  if (!post) {
    throw new NotFoundError(`No post with id ${postId}`)
  }
  res.status(StatusCodes.OK).json({ success: 'true', post })
}

module.exports = { getAllPosts, createPost, updatePost, deletePost }

