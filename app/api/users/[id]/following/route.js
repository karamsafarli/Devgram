import { connectToDB } from "@utils/database";
import User from "@models/user";

export const GET = async (req, { params }) => {
    const userID = params.id

    try {
        await connectToDB();

        const followings = await User.findById(userID).populate('following');

        return new Response(JSON.stringify(followings), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch following users", { status: 500 })
    }
}