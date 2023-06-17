import mongoose, { Schema, model, models } from 'mongoose';

const commentSchema = new Schema({
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    comtext: {
        type: String,
        required: true,
    },
    comlikes: {
        type: Array,
        default: []
    },
    replies: [{
        content: {
            type: String,
            required: true
        },
        author: {
            authID: {
                type: String,
                required: true
            },
            image: {
                type: String,
                required: true
            },
            username: {
                type: String,
                required: true,
            }
        },
        likes: {
            type: Array,
            default: []
        }
    }]
}, { timestamps: true })

const Comment = models.Comment || model('Comment', commentSchema);

export default Comment;