import { connectToDB } from "@utils/database";
import Post from "@models/post";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
    try {
        await connectToDB();
        const allPosts = await Post.find().sort({ createdAt: -1 }).populate('author');

        return NextResponse.json(allPosts)

    } catch (err) {
        return new Response("Posts not found", { status: 500 })
    }
}