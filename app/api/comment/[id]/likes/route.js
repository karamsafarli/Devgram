import { connectToDB } from "@utils/database";
import Comment from "@models/comment";

export const PATCH = async (req, { params }) => {
    const { userID } = await req.json();
    const commentID = params.id

    try {
        await connectToDB();
        const likedComment = await Comment.findById(commentID);
        if (likedComment.comlikes.includes(userID)) {
            likedComment.comlikes = likedComment.comlikes.filter((id) => {
                return id !== userID
            });

            await likedComment.save();
        } else {
            likedComment.comlikes.push(userID);
            await likedComment.save();
        }

        return new Response(JSON.stringify(likedComment), { status: 201 })
    } catch (error) {
        return new Response('Could not patch likes', { status: 500 })
    }
}