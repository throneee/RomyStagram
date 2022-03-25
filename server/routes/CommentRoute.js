// 1. Require
const express = require('express');
const router = express.Router();
const commentController = require('../controllers/CommentController');
const verifyToken = require('../middleware/verifyToken');

// 2. Main

router.post('/', verifyToken, commentController.createComment);

router.put('/:id', verifyToken, commentController.updateComment);

router.delete('/:id', verifyToken, commentController.deleteComment);

router.put('/like/:id', verifyToken, commentController.likeComment);

router.put('/unlike/:id', verifyToken, commentController.unLikeComment);

// 3. Exports
module.exports = router;
