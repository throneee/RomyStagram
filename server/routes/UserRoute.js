// 1. Require
const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const verifyToken = require('../middleware/verifyToken');

// 2. Main

router.get('/', verifyToken, userController.checkUserSigned);

router.post('/signup', userController.signUp);

router.post('/signin', userController.signIn);

router.get('/search', verifyToken, userController.searchUser);

router.get('/:id', verifyToken, userController.getUser);

router.put('/update/:id', verifyToken, userController.updateUser);

router.post('/follow/:id', verifyToken, userController.followUser);

router.post('/unfollow/:id', verifyToken, userController.unFollowUser);

// 3. Exports
module.exports = router;
