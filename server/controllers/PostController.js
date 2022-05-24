// 1. Require
const Post = require('../models/PostModel');
const Comment = require('../models/CommentModel');
const User = require('../models/UserModel');

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

            // create post
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
            // find posts
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

            return res.json({
                success: true,
                message: 'Get post successfully.',
                postsCount: posts.length,
                posts,
            });
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
                    message: 'Post not found.',
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
                    message: 'Post not found.',
                });
            } else {
                await Comment.deleteMany({
                    _id: { $in: deletedPost.comments },
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
                .populate('user likes', 'username avatar followers')
                .populate({
                    path: 'comments',
                    populate: {
                        path: 'user likes',
                        select: '-password',
                    },
                });
            if (!newPost) {
                return res.status(400).json({
                    success: false,
                    message: 'Post not found.',
                });
            }

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
                .populate('user likes', 'username avatar followers')
                .populate({
                    path: 'comments',
                    populate: {
                        path: 'user likes',
                        select: '-password',
                    },
                });
            if (!newPost) {
                return res.status(400).json({
                    success: false,
                    message: 'Post not found.',
                });
            }

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
            // find one post
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
    getPostExplore: async (req, res) => {
        try {
            // find posts
            const posts = await Post.find({
                user: { $nin: [...req.user.following, req.userID] },
            }).sort('-createdAt');

            return res.json({
                success: true,
                message: 'Get posts explore successfully.',
                postsCount: posts.length,
                posts,
            });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: 'Internal Server Error.' });
        }
    },
    savedPost: async (req, res) => {
        try {
            // Check post is saved or not
            const postSaved = await User.find({
                _id: req.userID,
                saved: req.params.id,
            });
            if (postSaved.length > 0) {
                return res.status(400).json({
                    success: false,
                    message: 'You saved this post.',
                });
            }

            // Saved post
            const newUser = await User.findOneAndUpdate(
                { _id: req.userID },
                {
                    $push: { saved: req.params.id },
                },
                { new: true }
            );
            if (!newUser) {
                return res.status(400).json({
                    success: false,
                    message: 'User not found.',
                });
            }

            return res.json({
                success: true,
                message: 'Saved post.',
                user: newUser,
            });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: 'Internal Server Error.' });
        }
    },
    unSavedPost: async (req, res) => {
        try {
            // Check post is unliked or not
            const postSaved = await User.find({
                _id: req.userID,
                saved: req.params.id,
            });
            if (postSaved.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: 'You did not save this post.',
                });
            }

            // Update post is liked
            const newUser = await User.findOneAndUpdate(
                { _id: req.userID },
                {
                    $pull: { saved: req.params.id },
                },
                { new: true }
            );
            if (!newUser) {
                return res.status(400).json({
                    success: false,
                    message: 'User not found.',
                });
            }

            return res.json({
                success: true,
                message: 'Unsaved post.',
                user: newUser,
            });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: 'Internal Server Error.' });
        }
    },
    getUserSavedPost: async (req, res) => {
        try {
            const userSavedPosts = await Post.find({
                _id: { $in: req.user.saved },
            });
            if (!userSavedPosts) {
                return res.status(400).json({
                    success: false,
                    message: 'You did not save posts.',
                });
            }

            return res.json({
                success: true,
                message: 'Get saved post successfully.',
                postsCount: userSavedPosts.length,
                posts: userSavedPosts,
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
