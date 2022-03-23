// 1. Require
const express = require('express');
const router = express.Router();
const commentController = require('../controllers/CommentController');
const verifyToken = require('../middleware/verifyToken');

// 2. Main

router.post('/', verifyToken, commentController.createComment);

// 3. Exports
module.exports = router;
