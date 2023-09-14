'use client'
import { useState, useEffect } from 'react';
import PostCard from './PostCard';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from '@redux/features/postslice';
import { useSession } from 'next-auth/react';
const Feed = () => {

  // const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  const darkmode = useSelector((state) => state.colorThemeReducer.value);
  const allPosts = useSelector((state) => state.posts.data)
  const { data: session } = useSession();



  // const fetchPosts = async () => {
  //   const res = await fetch('https://devgram-7dnk.vercel.app/api/post',{cache: 'no-store'});
  //   const data = await res.json();
  //   setPosts(data)
  // }

  useEffect(() => {
    dispatch(fetchPosts())
    //fetchPosts()
  }, [dispatch])



  const [search, setSearch] = useState('')

  const handleTagClick = (tag) => {
    setSearch(tag)
    window.scrollTo(0, 0)
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
        dispatch(fetchPosts())
        // fetchPosts()
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
        dispatch(fetchPosts())
        //fetchPosts()
      }

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="feed">

      <input type="text"
        className='search_post'
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        placeholder='Search posts...'
        style={{ backgroundColor: darkmode ? '#1D2226' : 'white' }}
      />
      {
        allPosts
          .filter((post) => {
            return (
              post.text.toLowerCase().includes(search.toLowerCase()) ||
              handleHashtags(post.tag).toLowerCase().includes(search.toLowerCase()) ||
              post.author.username.toLowerCase().includes(search.toLowerCase())
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