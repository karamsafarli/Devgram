'use client'

import PostCard from "./PostCard";
import { useSelector } from 'react-redux';
import { useState } from 'react';
import FollowerComponent from "./FollowerComponent";
import { useSession } from "next-auth/react";



const Profile = ({ name, desc, data, handleEdit, handleDelete, handleFollow, handleLikes, followers, following }) => {


  const darkmode = useSelector((state) => state.colorThemeReducer.value)
  const [search, setSearch] = useState('')
  const [tabIndex, setTabIndex] = useState(0)
  const { data: session } = useSession()

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


  const checkHandleFollow = async (userID) => {
    if (!session?.user) return alert('Please login to follow someone.');
    try {
      const res = await fetch(`/api/users/${userID}/follow`, {
        method: 'PATCH',
        body: JSON.stringify({
          userID: session?.user.id
        })
      });

    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className="profile">
      <h1 className="header">{name} Profile</h1>
      <p className="descript">{desc}</p>

      <div className="tab_container" style={{ backgroundColor: darkmode ? 'black' : '#f3f2ef' }}>
        <div className="tabs">
          <span onClick={() => setTabIndex(0)} style={{ color: tabIndex !== 0 ? 'rgba(128, 128, 128, 0.6)' : '' }}>Posts</span>
          <span onClick={() => setTabIndex(1)} style={{ color: tabIndex !== 1 ? 'rgba(128, 128, 128, 0.6)' : '' }}>{ } Followers</span>
          <span onClick={() => setTabIndex(2)} style={{ color: tabIndex !== 2 ? 'rgba(128, 128, 128, 0.6)' : '' }}>Following</span>
        </div>
        <div className="bottom_line" style={{ left: `${tabIndex * 33.33}%`, backgroundColor: darkmode ? 'white' : 'black' }}></div>
      </div>



      <div className="tab_content_container">
        {
          tabIndex === 0 && (
            <div className="posts_container">
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
                        handleFollow={handleFollow}
                        handleLikes={handleLikes}
                      />
                    ))
                }
              </div>
            </div>
          )
        }

        {
          tabIndex === 1 && (
            <div className="followers_container">
              {
                followers?.map((el) => {
                  return (
                    <FollowerComponent key={el._id} userInfo={el} checkHandleFollow={checkHandleFollow} />
                  )
                })
              }
            </div>
          )
        }

        {
          tabIndex === 2 && (
            <div className="following_container">
              {
                following?.map((el) => {
                  return (
                    <FollowerComponent key={el._id} userInfo={el} checkHandleFollow={checkHandleFollow} />
                  )
                })
              }
            </div>
          )
        }

        {

          // tabIndex === 0 ? (
          //   <div className="posts_container">
          //     <input type="text"
          //       className='search_post'
          //       onChange={(e) => setSearch(e.target.value.toLowerCase())}
          //       value={search}
          //       placeholder='Search posts...'
          //       style={{ backgroundColor: darkmode ? '#1D2226' : 'white' }}
          //     />

          //     <div className="user_posts">
          //       {
          //         data
          //           .filter((el) => {
          //             return (
          //               el.text.toLowerCase().includes(search) ||
          //               handleHashtags(el.tag).toLowerCase().includes(search) ||
          //               el.author.username.toLowerCase().includes(search)
          //             )
          //           })
          //           .map((post) => (
          //             <PostCard
          //               key={post._id}
          //               post={post}
          //               handleDelete={() => handleDelete && handleDelete(post)}
          //               handleEdit={() => handleEdit && handleEdit(post)}
          //               handleTagClick={handleTagClick}
          //               handleFollow={handleFollow}
          //               handleLikes={handleLikes}
          //             />
          //           ))
          //       }
          //     </div>
          //   </div>
          // ) : tabIndex === 1 ? (
          //   <div className="followers_container">
          //     {
          //       followers?.map((el) => {
          //         return (
          //           <FollowerComponent key={el._id} userInfo={el} checkHandleFollow={checkHandleFollow} />
          //         )
          //       })
          //     }
          //   </div>
          // ) : (
          //   <div className="following_container">
          //     {
          //       following.map((el) => {
          //         return (
          //           <FollowerComponent key={el._id} userInfo={el} checkHandleFollow={checkHandleFollow} />
          //         )
          //       })
          //     }
          //   </div>
          // )

        }

      </div>


    </div>
  )
}

export default Profile