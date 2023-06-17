import { connectToDB } from "@utils/database";
import Post from "@models/post";

export const GET = async (req, { params }) => {
    try {
        await connectToDB();
        const userPost = await Post.findById(params.id).populate('author');

        if (!userPost) {
            return new Response("Post not found", { status: 404 })
        }

        return new Response(JSON.stringify(userPost), { status: 200 });

    } catch (err) {
        return new Response("Posts not found", { status: 500 })
    }
}

export const PATCH = async (req, { params }) => {
    const { text, tag, imageURL } = await req.json();

    try {
        await connectToDB();

        const existingPost = await Post.findById(params.id);

        if (!existingPost) {
            return new Response("Post not found", { status: 404 })
        }

        existingPost.text = text;
        existingPost.tag = tag;
        existingPost.imageURL = imageURL;

        await existingPost.save()

        return new Response(JSON.stringify(existingPost), { status: 200 });
    } catch (error) {
        return new Response("Failed to update post", { status: 500 });
    }
}

export const DELETE = async (req, { params }) => {
    try {
        await connectToDB();

        await Post.findByIdAndRemove(params.id);

        return new Response("Deleted successfully", { status: 200 })
    } catch (error) {
        return new Response("Failed to delete post", { status: 500 })
    }
}