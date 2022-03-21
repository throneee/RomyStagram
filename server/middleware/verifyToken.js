const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

const verifyToken = async (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res
            .status(401)
            .json({ success: false, message: 'Access Token not found.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findOne({ _id: decoded.userID });
        req.user = user;
        req.userID = decoded.userID;
        next();
    } catch (error) {
        console.log(error);
        return res
            .status(403)
            .json({ success: false, message: 'Invalid Token' });
    }
};

module.exports = verifyToken;
