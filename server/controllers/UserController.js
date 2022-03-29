// 1. Require
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

// 2. Main
const userController = {
    checkUserSigned: async (req, res) => {
        try {
            const user = await User.findById(req.userID).select('-password');
            if (!user) {
                return res
                    .status(400)
                    .json({ success: false, message: 'User not found.' });
            }
            return res.json({ success: true, user });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: 'Internal Server Error.' });
        }
    },

    signUp: async (req, res) => {
        try {
            const { fullname, username, email, password } = req.body;
            let newUsername = username.toLowerCase().replace(/ /g, '');

            // check username existed or not
            const usernameCheck = await User.findOne({ username: newUsername });
            if (usernameCheck) {
                return res.status(400).json({
                    success: false,
                    message: 'This username already existed.',
                });
            }

            // check email existed or not
            const emailCheck = await User.findOne({ email });
            if (emailCheck) {
                return res.status(400).json({
                    success: false,
                    message: 'This email already existed.',
                });
            }

            // check password length < 6
            if (password.length < 6) {
                return res.status(400).json({
                    success: false,
                    message: 'Password must be at least 6 characters.',
                });
            }

            const hashedPassword = await argon2.hash(password);
            const newUser = new User({
                fullname,
                username: newUsername,
                email,
                password: hashedPassword,
            });
            await newUser.save();

            // Return Token
            const accessToken = jwt.sign(
                { userID: newUser._id },
                process.env.ACCESS_TOKEN_SECRET
            );

            return res.json({
                success: true,
                message: 'Sign Up Successfully.',
                accessToken,
            });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: 'Internal Server Error.' });
        }
    },

    signIn: async (req, res) => {
        try {
            const { email, password } = req.body;

            // check email
            const user = await User.findOne({ email }).populate(
                'followers following',
                '-password'
            );
            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: 'Incorrect Email or Password.',
                });
            }

            // check password
            const passwordValid = await argon2.verify(user.password, password);
            if (!passwordValid) {
                return res.status(400).json({
                    success: false,
                    message: 'Incorrect Email or Password.',
                });
            }

            const accessToken = jwt.sign(
                { userID: user._id },
                process.env.ACCESS_TOKEN_SECRET
            );

            return res.json({
                success: true,
                message: 'Sign In Successfully.',

                accessToken,
            });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: 'Internal Server Error.' });
        }
    },

    searchUser: async (req, res) => {
        try {
            const users = await User.find({
                username: { $regex: req.query.username },
            })
                .limit(10)
                .select('fullname username avatar');
            return res.json({
                success: true,
                message: 'Search Successfully.',
                users,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error.',
            });
        }
    },

    getUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.id)
                .select('-password')
                .populate('followers following', '-password');

            if (!user) {
                return res
                    .status(400)
                    .json({ success: false, message: 'User not found.' });
            }

            return res.json({
                success: true,
                message: 'Get User Successfully.',
                user,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error.',
            });
        }
    },

    updateUser: async (req, res) => {
        try {
            const { fullname, avatar, gender, phone, address, birthday, bio } =
                req.body;

            if (!fullname) {
                return res.status(400).json({
                    success: false,
                    message: 'Fullname not be empty.',
                });
            }

            let updatedUser = {
                fullname,
                avatar:
                    avatar ||
                    'https://www.sibberhuuske.nl/wp-content/uploads/2016/10/default-avatar.png',
                gender: gender || 'Male',
                phone: phone || '',
                address: address || '',
                birthday: birthday || '',
                bio: bio || '',
            };

            const updateUserCondition = {
                _id: req.params.id,
                user: req.userID,
            };

            updatedUser = await User.findOneAndUpdate(
                updateUserCondition,
                updatedUser,
                { new: true }
            );

            // User not authorised or post not found
            if (!updatedUser) {
                return res.status(401).json({
                    success: false,
                    message: 'User not found.',
                });
            }

            return res.json({
                success: true,
                message: 'User have updated.',
                user: updatedUser,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error.',
            });
        }
    },

    followUser: async (req, res) => {
        try {
            // Check user is followed or not
            const user = await User.find({
                _id: req.params.id,
                followers: req.userID,
            });
            if (user.length > 0) {
                return res.status(400).json({
                    success: false,
                    message: 'You followed this user.',
                });
            }

            // Update followers
            await User.findOneAndUpdate(
                { _id: req.params.id },
                {
                    $push: { followers: req.userID },
                },
                { new: true }
            );

            // Update following
            await User.findOneAndUpdate(
                { _id: req.userID },
                {
                    $push: { following: req.params.id },
                },
                { new: true }
            );

            const userFollow = await User.find({ _id: req.userID });

            return res.json({
                success: true,
                message: 'Followed User.',
                userFollow,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error.',
            });
        }
    },

    unFollowUser: async (req, res) => {
        try {
            // Check user is followed or not
            const user = await User.find({
                _id: req.params.id,
                followers: req.userID,
            });
            if (user.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: 'You did not follow this user.',
                });
            }

            // Update followers
            await User.findOneAndUpdate(
                { _id: req.params.id },
                {
                    $pull: { followers: req.userID },
                },
                { new: true }
            );

            // Update following
            await User.findOneAndUpdate(
                { _id: req.userID },
                {
                    $pull: { following: req.params.id },
                },
                { new: true }
            );

            const userUnFollow = await User.find({ _id: req.userID });

            return res.json({
                success: true,
                message: 'UnFollowed User.',
                userUnFollow,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error.',
            });
        }
    },
};

// 3. Export
module.exports = userController;
