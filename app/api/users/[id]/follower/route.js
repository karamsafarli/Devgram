import { connectToDB } from "@utils/database";
import User from "@models/user";

export const GET = async (req, { params }) => {
    const userID = params.id

    try {
        await connectToDB();

        const followers = await User.findById(userID).populate('followers').populate('followings');

        return new Response(JSON.stringify(followers), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch followers", { status: 500 })
    }
}