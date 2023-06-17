'use client'
import { useState, useEffect } from 'react';
import PostCard from './PostCard';
import { useSelector } from 'react-redux';
import { useSession } from 'next-auth/react';
import { rewrites } from '@next.config';
const Feed = () => {

  const [posts, setPosts] = useState([]);
  const darkmode = useSelector((state) => state.colorThemeReducer.value);
  const { data: session } = useSession();



  const fetchPosts = async () => {
    const res = await fetch('/api/post');
    const data = await res.json();
    setPosts(data)
  }

  useEffect(() => {
    fetchPosts()
  }, [])



  const [search, setSearch] = useState('')

  const handleTagClick = (tag) => {
    setSearch(tag)
  }

  const handleHashtags = (tags) => {
    const handledTags = tags.split(' ').map((el) => {
      return el = `#${el}`
    })

    return handledTags.join('');
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

  return (
    <section className="feed">

      <input type="text"
        className='search_post'
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
        value={search}
        placeholder='Search posts...'
        style={{ backgroundColor: darkmode ? '#1D2226' : 'white' }}
      />
      {
        posts
          .filter((post) => {
            return (
              post.text.toLowerCase().includes(search) ||
              handleHashtags(post.tag).toLowerCase().includes(search) ||
              post.author.username.toLowerCase().includes(search)
            )
          })
          .map((el) => (
            <PostCard
              key={el._id}
              post={el}
              handleTagClick={handleTagClick}
              handleLikes={handleLikes}
              handleFollow={handleFollow}
            />
          ))
      }
    </section>
  )
}

export default Feed