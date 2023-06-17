'use client'
import { useState, useEffect } from 'react';
import Profile from "@components/ProfileComponent";

const UserProfiles = ({ params }) => {


    const capitalize = (name) => {
        const strlist = name.split(' ').map((str) => {
            return str[0].toUpperCase() + str.slice(1);
        })

        return strlist.join(' ');
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
                fetchPosts();
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
                fetchPosts()
            }

        } catch (error) {
            console.log(error);
        }
    }


    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`/api/users/${params.id}/posts`);
            const data = await res.json();
            setPosts(data);
        }
        fetchData();
    }, [params.id])
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
        />
    )
}

export default UserProfiles