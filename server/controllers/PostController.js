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
            })
                .sort('-createdAt')
                .populate('user likes', 'username avatar')
                .populate({
                    path: 'comments',
                    populate: {
                        path: 'user likes',
                        select: '-password',
                    },
                });
            return res.json({ success: true, posts });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: 'Internal Server Error.' });
        }
    },
    updatePost: async (req, res) => {
        try {
            const { content, images } = req.body;

            if (images.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Image is required.',
                });
            }

            let updatedPost = {
                content,
                images,
            };

            const updatePostCondition = {
                _id: req.params.id,
                user: req.userID,
            };

            updatedPost = await Post.findOneAndUpdate(
                updatePostCondition,
                updatedPost,
                { new: true }
            )
                .populate('user likes', 'username avatar')
                .populate({
                    path: 'comments',
                    populate: {
                        path: 'user likes',
                        select: '-password',
                    },
                });

            // User not authorised or post not found
            if (!updatedPost) {
                return res.status(401).json({
                    success: false,
                    message: 'User not authorised or Post not found.',
                });
            }

            return res.json({
                success: true,
                message: 'Post have updated.',
                post: updatedPost,
            });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: 'Internal Server Error.' });
        }
    },
    deletePost: async (req, res) => {
        try {
            const deletePostCondition = {
                _id: req.params.id,
                user: req.userID,
            };
            const deletedPost = await Post.findOneAndDelete(
                deletePostCondition
            );

            // User not authorised or post not found
            if (!deletedPost) {
                return res.status(401).json({
                    success: false,
                    message: 'User not authorised or post not found.',
                });
            }

            return res.json({
                success: true,
                message: 'Post is deleted !',
                post: deletedPost,
            });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: 'Internal Server Error.' });
        }
    },
    likePost: async (req, res) => {
        try {
            // Check post is liked or not
            const post = await Post.find({
                _id: req.params.id,
                likes: req.userID,
            });
            if (post.length > 0) {
                return res.status(400).json({
                    success: false,
                    message: 'You liked this post.',
                });
            }

            // Update post is liked
            const newPost = await Post.findOneAndUpdate(
                { _id: req.params.id },
                {
                    $push: { likes: req.userID },
                },
                { new: true }
            )
                .populate('user likes', 'username avatar')
                .populate({
                    path: 'comments',
                    populate: {
                        path: 'user likes',
                        select: '-password',
                    },
                });

            return res.json({
                success: true,
                message: 'Liked post.',
                post: newPost,
            });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: 'Internal Server Error.' });
        }
    },
    unLikePost: async (req, res) => {
        try {
            // Check post is unliked or not
            const post = await Post.find({
                _id: req.params.id,
                likes: req.userID,
            });
            if (post.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: 'You did not like this post.',
                });
            }

            // Update post is liked
            const newPost = await Post.findOneAndUpdate(
                { _id: req.params.id },
                {
                    $pull: { likes: req.userID },
                },
                { new: true }
            )
                .populate('user likes', 'username avatar')
                .populate({
                    path: 'comments',
                    populate: {
                        path: 'user likes',
                        select: '-password',
                    },
                });
            return res.json({
                success: true,
                message: 'UnLiked post.',
                post: newPost,
            });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: 'Internal Server Error.' });
        }
    },
    getUserPost: async (req, res) => {
        try {
            const userPosts = await Post.find({ user: req.params.id }).sort(
                '-createdAt'
            );

            return res.json({
                success: true,
                message: 'Get posts of user successfully.',
                postsCount: userPosts.length,
                posts: userPosts,
            });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: 'Internal Server Error.' });
        }
    },
    getPostDetail: async (req, res) => {
        try {
            const post = await Post.findById(req.params.id)
                .populate('user likes', 'username avatar')
                .populate({
                    path: 'comments',
                    populate: {
                        path: 'user likes',
                        select: '-password',
                    },
                });

            if (!post) {
                return res.status(400).json({
                    success: false,
                    message: 'Post not found.',
                });
            }

            return res.json({
                success: true,
                message: 'Get post successfully.',
                post,
            });
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
