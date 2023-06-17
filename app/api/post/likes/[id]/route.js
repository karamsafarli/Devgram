import { connectToDB } from "@utils/database";
import Post from "@models/post";

export const PATCH = async (req, { params }) => {

    const { userId } = await req.json()

    try {
        await connectToDB();
        const specificPost = await Post.findById(params.id);

        if (!specificPost.likes.includes(userId)) {
            specificPost.likes.push(userId);
            await specificPost.save();
        } else {
            specificPost.likes = specificPost.likes.filter((id) => {
                return id !== userId
            });

            await specificPost.save();

        }

        return new Response(JSON.stringify(specificPost), { status: 201 })

    } catch (error) {
        return new Response('Failed to like the post', { status: 500 })
    }
}