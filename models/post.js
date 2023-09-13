import { Schema, model, models } from 'mongoose';

const postSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    text: {
        type: String,
        required: true
    },

    tag: {
        type: String,
        required: true
    },

    likes: {
        type: Array,
        default: []
    },
    imageURL: {
        type: String
    }

}, { timestamps: true })

const Post = models.Post || model('Post', postSchema);

export default Post;
