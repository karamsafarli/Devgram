'use client'
import { useState, useEffect } from 'react';
import Profile from "@components/ProfileComponent";
import { useSession } from 'next-auth/react';

const UserProfiles = ({ params }) => {


    const capitalize = (name) => {
        const strlist = name.split(' ').map((str) => {
            return str[0].toUpperCase() + str.slice(1);
        })

        return strlist.join(' ');
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
        />
    )
}

export default UserProfiles