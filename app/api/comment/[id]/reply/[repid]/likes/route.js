import { connectToDB } from "@utils/database";
import Comment from "@models/comment";

export const PATCH = async (req, { params }) => {
    const comID = params.id;
    const repID = params.repid;

    const { userID } = await req.json();

    try {
        await connectToDB();

        const comment = await Comment.findById(comID);


        const likingComment = comment.replies.find((reply) => reply._id.toString() === repID);

        if (likingComment.likes.includes(userID)) {
            likingComment.likes = likingComment.likes.filter((id) => {
                return id !== userID;
            });
            await comment.save();
        } else {
            likingComment.likes.push(userID);
            await comment.save();
        }
        return new Response(likingComment, { status: 201 });
    } catch (error) {
        console.log(error);
        return new Response('Failed to like a comment', { status: 500 });
    }
}