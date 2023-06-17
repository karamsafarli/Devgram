import { connectToDB } from "@utils/database";
import Comment from "@models/comment";
import User from "@models/user";

export const PATCH = async (req, { params }) => {
    const { userID, content } = await req.json();
    const commentID = params.id;

    try {
        await connectToDB();

        const replyingComment = await Comment.findById(commentID);
        const user = await User.findById(userID);
        const author = {
            authID: user._id,
            image: user.image,
            username: user.username,
        };

        replyingComment.replies.push({
            author: author,
            content: content
        });
        await replyingComment.save();

        return new Response(JSON.stringify(replyingComment), { status: 201 })

    } catch (error) {
        console.log(error);
        return new Response("Failed to reply comment", { status: 500 })
    }

}