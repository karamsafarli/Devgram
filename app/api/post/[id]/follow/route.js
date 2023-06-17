import { connectToDB } from "@utils/database";
import User from "@models/user";
import Post from "@models/post";

export const PATCH = async (req, { params }) => {
    const { userID } = await req.json();
    const postID = params.id;

    try {
        await connectToDB();

        const post = await Post.findById(postID);
        const user = await User.findById(userID);
        const postAuthor = await User.findById(post.author._id);

        if (user.followings.some((id) => id.equals(postAuthor._id))) {
            user.followings = user.followings.filter((id) => !id.equals(postAuthor._id));
            await user.save();
            postAuthor.followers = postAuthor.followers.filter((id) => !id.equals(user._id));
            await postAuthor.save();
        } else {
            user.followings.push(postAuthor._id);
            await user.save();
            postAuthor.followers.push(user._id);
            await postAuthor.save();
        }

        return new Response(JSON.stringify(user), { status: 201 })
    } catch (error) {
        return new Response('Problem happened while following', { status: 500 })
    }
}