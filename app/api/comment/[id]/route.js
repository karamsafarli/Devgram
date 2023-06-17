import { connectToDB } from "@utils/database";
import Comment from "@models/comment";

export const GET = async (req, { params }) => {
    try {
        await connectToDB();
        const postComments = await Comment.find({ postId: params.id }).sort({ createdAt: -1 }).populate('userId');
        if (!postComments) {
            return;
        }

        return new Response(JSON.stringify(postComments), { status: 200 })
    } catch (error) {
        return new Response('Failed to find specific comments', { status: 404 })
    }
}