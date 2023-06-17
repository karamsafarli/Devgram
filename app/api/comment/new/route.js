import { connectToDB } from "@utils/database";
import Comment from "@models/comment";

export const POST = async (req, res) => {
    const { userid, postid, text } = await req.json();
    try {
        await connectToDB();

        const newComment = new Comment({
            userId: userid,
            postId: postid,
            comtext: text
        });

        await newComment.save();

        return new Response(JSON.stringify(newComment), { status: 201 });

    } catch (error) {
        console.log(error)
        return new Response(error, { status: 500 });
    }
}