const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommentSchema = new Schema(
    {
        content: {
            type: String,
            required: true,
        },
        tag: Object,
        reply: Schema.Types.ObjectId,
        likes: [
            {
                type: Schema.Types.ObjectId,
                ref: 'users',
            },
        ],
        user: { type: Schema.Types.ObjectId, ref: 'users' },
        postID: Schema.Types.ObjectId,
        postUserID: Schema.Types.ObjectId,
    },
    { timestamps: true }
);

module.exports = mongoose.model('comments', CommentSchema);
