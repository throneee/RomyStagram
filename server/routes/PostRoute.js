// 1. Require
const express = require('express');
const router = express.Router();
const postController = require('../controllers/PostController');
const verifyToken = require('../middleware/verifyToken');

// 2. Main

router.post('/', verifyToken, postController.createPost);
router.get('/', verifyToken, postController.getPosts);

// 3. Exports
module.exports = router;
