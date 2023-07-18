'use client'

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Profile from '@components/ProfileComponent'

const ProfilePage = () => {

  const { data: session, status } = useSession();
  const [posts, setPosts] = useState([]);
  const router = useRouter();
  const [user, setUser] = useState({});
  const [sessionStatus, setSessionStatus] = useState('')
  useEffect(() => {
    setSessionStatus(status)
    console.log(status)
  }, [status])


  const fetchPosts = async () => {
    const res = await fetch(`/api/users/${session?.user.id}/posts`);
    const data = await res.json();

    setPosts(data)
  }

  const fetchFollowers = async () => {
    const res = await fetch(`/api/users/${session?.user.id}/follower`);
    const data = await res.json()
    setUser(data)

  }

  useEffect(() => {

    if (session?.user.id) {
      fetchPosts();
      fetchFollowers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user.id]);




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

  if (status === 'authenticated') {
    return (
      <Profile
        name='My'
        desc='Welcome to your profile page'
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleLikes={handleLikes}
        handleFollow={handleFollow}
        followers={user.followers}
        following={user.followings}
      />
    )

  }
}

export default ProfilePage