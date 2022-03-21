// 1. Require
const Post = require('../models/PostModal');

// 2. Main
const postController = {
    createPost: async (req, res) => {
        try {
            const { content, images } = req.body;

            if (images.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Image is required.',
                });
            }

            const newPost = new Post({
                content,
                images,
                user: req.userID,
            });

            await newPost.save();

            return res.json({
                success: true,
                message: 'Post have created !',
                post: newPost,
            });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: 'Internal Server Error.' });
        }
    },
    getPosts: async (req, res) => {
        try {
            const posts = await Post.find({
                user: [...req.user.following, req.userID],
            }).populate('user', 'username avatar');

            return res.json({ success: true, posts });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: 'Internal Server Error.' });
        }
    },
};

// 3. Export
module.exports = postController;
