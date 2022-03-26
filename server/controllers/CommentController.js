// 1. Require
const Comment = require('../models/CommentModal');
const Post = require('../models/PostModal');

// 2. Main
const commentController = {
    createComment: async (req, res) => {
        try {
            const { postID, content, tag, reply, postUserID } = req.body;

            if (!content) {
                return res.status(400).json({
                    success: false,
                    message: 'Content must not empty.',
                });
            }

            const newComment = new Comment({
                user: req.userID,
                content,
                tag,
                reply,
                postID,
                postUserID,
            });

            const newPost = await Post.findOneAndUpdate(
                { _id: postID },
                {
                    $push: { comments: newComment._id },
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

            await newComment.save();

            return res.json({
                success: true,
                message: 'You have commented.',
                comment: newComment,
                post: newPost,
            });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: 'Internal Server Error.' });
        }
    },
    updateComment: async (req, res) => {
        try {
            const { postID, content } = req.body;

            if (!content) {
                return res.status(400).json({
                    success: false,
                    message: 'Content must not empty.',
                });
            }

            const updatedComment = await Comment.findOneAndUpdate(
                {
                    _id: req.params.id,
                    user: req.userID,
                },
                {
                    content,
                },
                { new: true }
            );

            if (!updatedComment) {
                return res.status(401).json({
                    success: false,
                    message: 'Comment not found.',
                });
            }

            const newPost = await Post.find({ _id: postID })
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
                message: 'You have updated comment.',
                comment: updatedComment,
                post: newPost[0],
            });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: 'Internal Server Error.' });
        }
    },
    deleteComment: async (req, res) => {
        try {
            const deleteComment = await Comment.findOneAndDelete({
                _id: req.params.id,
                $or: [{ user: req.userID }, { postUserID: req.userID }],
            });

            if (!deleteComment) {
                return res.status(401).json({
                    success: false,
                    message: 'Comment not found or Comment have been deleted.',
                });
            }

            const newPost = await Post.findOneAndUpdate(
                {
                    _id: deleteComment.postID,
                },
                {
                    $pull: { comments: req.params.id },
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
                message: 'You have deleted comment.',
                commentDelete: deleteComment,
                post: newPost,
            });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: 'Internal Server Error.' });
        }
    },
    likeComment: async (req, res) => {
        try {
            const { postID } = req.body;

            // Check comment is liked or not
            const comment = await Comment.find({
                _id: req.params.id,
                likes: req.userID,
            });
            if (comment.length > 0) {
                return res.status(400).json({
                    success: false,
                    message: 'You liked this comment.',
                });
            }

            const newComment = await Comment.findOneAndUpdate(
                {
                    _id: req.params.id,
                },
                {
                    $push: { likes: req.userID },
                },
                { new: true }
            );

            const newPost = await Post.find({ _id: postID })
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
                message: 'Liked comment.',
                comment: newComment,
                post: newPost,
            });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: 'Internal Server Error.' });
        }
    },
    unLikeComment: async (req, res) => {
        try {
            const { postID } = req.body;

            // Check comment is liked or not
            const comment = await Comment.find({
                _id: req.params.id,
                likes: req.userID,
            });
            if (comment.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: 'You did not like this comment.',
                });
            }

            const newComment = await Comment.findOneAndUpdate(
                {
                    _id: req.params.id,
                },
                {
                    $pull: { likes: req.userID },
                },
                { new: true }
            );

            const newPost = await Post.find({ _id: postID })
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
                message: 'UnLiked comment.',
                comment: newComment,
                post: newPost,
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
module.exports = commentController;
