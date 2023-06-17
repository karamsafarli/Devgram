import { connectToDB } from "@utils/database";
import Post from "@models/post";

export const POST = async (req, res) => {
    const { userId, text, tag, imageURL } = await req.json()

    try {
        await connectToDB();


        const newPost = new Post({
            author: userId,
            text: text,
            tag: tag,
            imageURL: imageURL
        });

        await newPost.save();

        return new Response(JSON.stringify(newPost), { status: 201 })
    } catch (err) {
        console.log(err);
        return new Response("Failed to make new post", { status: 500 })
    }
}