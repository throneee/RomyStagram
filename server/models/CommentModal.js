const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommentSchema = new Schema({}, { timestamps: true });

module.exports = mongoose.model('comments', CommentSchema);
