'use client'

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Profile from '@components/ProfileComponent'

const ProfilePage = () => {

    const { data: session } = useSession();
    const [posts, setPosts] = useState([]);
    const router = useRouter();


    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch(`/api/users/${session?.user.id}/posts`);
            const data = await res.json();

            setPosts(data)
        }

        if (session?.user.id) {
            fetchPosts()
        }

    }, [session?.user.id])

    const handleEdit = async (post) => {
        router.push(`/update-post?id=${post._id}`)
    }
    const handleDelete = async (post) => {
        const isConfirmed = confirm("Are you sure to delete this post?");
        if (isConfirmed) {
            try {
                await fetch(`/api/post/${post._id.toString()}`, {
                    method: 'DELETE'
                });

                const filteredPosts = posts.filter((pt) => {
                    return pt._id !== post._id
                });

                setPosts(filteredPosts);

            } catch (error) {
                console.log(error);
            }
        }
    }


    return (
        <Profile
            name='My'
            desc='Welcome to your profile page'
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default ProfilePage