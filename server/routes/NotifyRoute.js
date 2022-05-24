// 1. Require
const express = require('express');
const router = express.Router();
const notifyController = require('../controllers/NotifyController');
const verifyToken = require('../middleware/verifyToken');

// 2. Main
router.post('/', verifyToken, notifyController.createNotify);

router.get('/', verifyToken, notifyController.getNotify);

router.delete('/:id', verifyToken, notifyController.deleteNotify);

// 3. Exports
module.exports = router;
