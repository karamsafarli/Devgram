import { connectToDB } from "@utils/database";
import Post from "@models/post";

export const GET = async (req, res) => {
    try {
        await connectToDB();
        const allPosts = await Post.find().sort({ createdAt: -1 }).populate('author');

        return new Response(JSON.stringify(allPosts), { status: 200 });

    } catch (err) {
        return new Response("Posts not found", { status: 500 })
    }
}