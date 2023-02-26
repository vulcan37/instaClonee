const express = require('express');
const postsRouter = express.Router();
const { getAllPosts, createPost, updatePost, deletePost } = require('../controllers/posts')


postsRouter.route('/').post(createPost).get(getAllPosts);
postsRouter.route('/:id').put(updatePost).delete(deletePost);

module.exports = postsRouter;