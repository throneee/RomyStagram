const mongoose = require('mongoose');
const { Schema } = mongoose;

const PostSchema = new Schema(
    {
        content: {
            type: String,
        },
        images: {
            type: Array,
            required: true,
        },
        likes: [
            {
                type: Schema.Types.ObjectId,
                ref: 'users',
            },
        ],
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'comments',
            },
        ],
        user: { type: Schema.Types.ObjectId, ref: 'users' },
        createAt: {
            type: Date,
            default: Date.now(),
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('posts', PostSchema);
