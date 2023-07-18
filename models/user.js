import { Schema, model, models } from 'mongoose'

const userSchema = new Schema({
    email: {
        type: String,
        unique: ['true', 'Email already exists!'],
        required: true
    },
    username: {
        type: String,
        required: true,

    },
    image: {
        type: String
    },
    followers: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    followings: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
})

const User = models.User || model('User', userSchema);
export default User