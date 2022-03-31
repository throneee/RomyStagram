// 1. Require
const express = require('express');
const router = express.Router();
const postController = require('../controllers/PostController');
const verifyToken = require('../middleware/verifyToken');

// 2. Main

router.post('/', verifyToken, postController.createPost);

router.get('/', verifyToken, postController.getPosts);

router.put('/update/:id', verifyToken, postController.updatePost);

router.delete('/delete/:id', verifyToken, postController.deletePost);

router.post('/like/:id', verifyToken, postController.likePost);

router.post('/unlike/:id', verifyToken, postController.unLikePost);

router.get('/user/:id', verifyToken, postController.getUserPost);

router.get('/explore', verifyToken, postController.getPostExplore);

router.get('/:id', verifyToken, postController.getPostDetail);

// 3. Exports
module.exports = router;
