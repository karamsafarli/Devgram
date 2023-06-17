'use client'

import PostCard from "./PostCard";
import { useSelector } from 'react-redux';
import { useState } from 'react';

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {


  const darkmode = useSelector((state) => state.colorThemeReducer.value)
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
  return (
    <section className="profile">
      <h1 className="header">{name} Profile</h1>
      <p className="descript">{desc}</p>

      <input type="text"
        className='search_post'
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
        value={search}
        placeholder='Search posts...'
        style={{ backgroundColor: darkmode ? '#1D2226' : 'white' }}
      />

      <div className="user_posts">
        {
          data
            .filter((el) => {
              return (
                el.text.toLowerCase().includes(search) ||
                handleHashtags(el.tag).toLowerCase().includes(search) ||
                el.author.username.toLowerCase().includes(search)
              )
            })
            .map((post) => (
              <PostCard
                key={post._id}
                post={post}
                handleDelete={() => handleDelete && handleDelete(post)}
                handleEdit={() => handleEdit && handleEdit(post)}
                handleTagClick={handleTagClick}
              />
            ))
        }
      </div>
    </section>
  )
}

export default Profile