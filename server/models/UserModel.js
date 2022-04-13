const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
            maxlength: 25,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        fullname: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        avatar: {
            type: String,
            default:
                'https://www.sibberhuuske.nl/wp-content/uploads/2016/10/default-avatar.png',
        },
        role: {
            type: String,
            default: 'user',
        },
        birthday: {
            type: String,
            default: '',
        },
        gender: {
            type: String,
            enum: ['Male', 'Female', 'Unknown'],
            default: 'Male',
        },
        phone: {
            type: String,
            default: '',
        },
        address: {
            type: String,
            default: '',
        },
        bio: {
            type: String,
            default: '',
        },
        followers: [
            {
                type: Schema.Types.ObjectId,
                ref: 'users',
            },
        ],
        following: [
            {
                type: Schema.Types.ObjectId,
                ref: 'users',
            },
        ],
        saved: [
            {
                type: Schema.Types.ObjectId,
                ref: 'posts',
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model('users', UserSchema);
