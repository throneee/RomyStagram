// 1. Require
const Comment = require('../models/CommentModal');
const Post = require('../models/PostModal');

// 2. Main
const commentController = {
    createComment: async (req, res) => {
        try {
            const { postID, content, tag, reply } = req.body;

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
            });

            await Post.findOneAndUpdate(
                { _id: postID },
                {
                    $push: { comments: newComment._id },
                },
                { new: true }
            );

            await newComment.save();

            return res.json({
                success: true,
                message: 'You have commented.',
                comment: newComment,
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
