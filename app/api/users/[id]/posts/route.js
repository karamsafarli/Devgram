import { connectToDB } from "@utils/database";
import Post from "@models/post";

export const GET = async (req, { params }) => {
    try {
        await connectToDB();
        const userPosts = await Post.find({ author: params.id }).sort({ createdAt: -1 }).populate('author');

        return new Response(JSON.stringify(userPosts), { status: 200 });

    } catch (err) {
        return new Response("Posts not found", { status: 500 })
    }
}