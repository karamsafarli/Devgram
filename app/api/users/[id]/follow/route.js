import { connectToDB } from "@utils/database";
import User from "@models/user";

export const PATCH = async (req, { params }) => {
    const { userID } = await req.json();
    const fwUserID = params.id;

    try {
        await connectToDB();

        const user = await User.findById(userID);
        const followingUser = await User.findById(fwUserID);

        if (user.followings.some((id) => id.equals(followingUser._id))) {
            user.followings = user.followings.filter((id) => !id.equals(fwUserID));
            await user.save();
            followingUser.followers = followingUser.followers.filter((id) => !id.equals(user._id));
            await followingUser.save();
        } else {
            user.followings.push(fwUserID);
            await user.save();
            followingUser.followers.push(user._id);
            await followingUser.save();
        }

        return new Response(JSON.stringify(user), { status: 201 })
    } catch (error) {
        return new Response('Problem happened while following', { status: 500 })
    }
}