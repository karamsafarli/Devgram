'use client'
import { useState, useEffect } from 'react';
import Profile from "@components/ProfileComponent";
import { useSession } from 'next-auth/react';

const UserProfiles = ({ params }) => {

    const { data: session } = useSession();
    const [user, setUser] = useState({})
    const capitalize = (name) => {
        const strlist = name.split(' ').map((str) => {
            return str[0].toUpperCase() + str.slice(1);
        })

        return strlist.join(' ');
    }
    const fetchData = async () => {
        const res = await fetch(`/api/users/${params.id}/posts`);
        const data = await res.json();
        setPosts(data);
    }

    const handleLikes = async (postid) => {

        try {
            const res = await fetch(`/api/post/likes/${postid}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    userId: session?.user.id,
                })
            });

            if (res.ok) {
                fetchData();
            }

        } catch (error) {
            console.log(error);
        }
    }

    const handleFollow = async (postID) => {
        try {
            const res = await fetch(`/api/post/${postID}/follow`, {
                method: 'PATCH',
                body: JSON.stringify({
                    userID: session?.user.id
                })
            });

            if (res.ok) {
                fetchData()
            }

        } catch (error) {
            console.log(error);
        }
    }

    const fetchFollowers = async () => {
        const res = await fetch(`/api/users/${params.id}/follower`);
        const data = await res.json()
        setUser(data)

    }

    const [posts, setPosts] = useState([]);
    useEffect(() => {
        fetchData();
        fetchFollowers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <Profile
            name={
                posts.length > 0 &&
                (
                    `${capitalize(posts[0].author.username)}'s`
                )
            }
            data={posts}
            handleLikes={handleLikes}
            handleFollow={handleFollow}
            followers={user.followers}
            following={user.followings}
        />
    )
}

export default UserProfiles