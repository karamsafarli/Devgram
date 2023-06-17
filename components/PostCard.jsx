'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { AiOutlineSend } from 'react-icons/ai';
import { BsChat, BsHeart, BsHeartFill } from 'react-icons/bs';
import CommentComponent from './CommentComponent';


const capitalize = (name) => {
    const strlist = name.split(' ').map((str) => {
        return str[0].toUpperCase() + str.slice(1);
    })

    return strlist.join(' ');
}



const PostCard = ({ post, handleTagClick, handleEdit, handleDelete, handleLikes, handleFollow }) => {

    const { data: session } = useSession();
    const [copied, setCopied] = useState('');
    const darkmode = useSelector((state) => state.colorThemeReducer.value)
    const pathname = usePathname();
    const [toggleComment, setToggleComment] = useState(false);
    const [inputComment, setInputComment] = useState('');
    const [comment, setComment] = useState([]);
    const [postIsLiked, setPostIsLiked] = useState(null);
    const [isFollowing, setIsFollowing] = useState(null)

    const handleCopy = () => {
        setCopied(post.text);
        navigator.clipboard.writeText(post.text);
        setTimeout(() => {
            setCopied('')
        }, 3000);
    }

    const fetchComments = async () => {
        try {
            const res = await fetch(`/api/comment/${post._id}`);
            const data = await res.json();
            setComment(data);
        } catch (error) {
            console.log(error);
        }
    }


    const addComment = async (e) => {
        e.preventDefault();
        try {

            if (!session?.user) return alert('You should sign in after writing a comment.')
            const res = await fetch('/api/comment/new', {
                method: 'POST',
                body: JSON.stringify(
                    {
                        userid: session?.user.id,
                        postid: post._id,
                        text: inputComment
                    }
                )
            });

            if (res.ok) {
                fetchComments()
            }


        } catch (error) {
            console.log(error);
        }
        finally {
            setInputComment('');
        }
    }


    const checkHandlePostLikes = (e) => {
        e.preventDefault();
        if (!session?.user) return alert('You should sign in before liking posts.');

        handleLikes(post._id);
        setPostIsLiked((prev) => !prev);
    }

    const handleCommentLikes = async (comID) => {
        try {
            const res = await fetch(`/api/comment/${comID}/likes`, {
                method: 'PATCH',
                body: JSON.stringify({
                    userID: session?.user.id
                })
            });

            if (res.ok) {
                fetchComments();
            }

        } catch (error) {
            console.log(error);
        }
    }


    const submitReply = async (comID, content) => {

        try {
            const res = await fetch(`/api/comment/${comID}/reply/new`, {
                method: 'PATCH',
                body: JSON.stringify({
                    userID: session?.user.id,
                    content: content
                })
            })

            if (res.ok) {
                fetchComments()
            }
        } catch (error) {
            console.log(error);
        }
    }


    const handleReplyLikes = async (comID, repID) => {
        try {
            const res = await fetch(`/api/comment/${comID}/reply/${repID}/likes`, {
                method: 'PATCH',
                body: JSON.stringify({
                    userID: session?.user.id
                })
            });

            if (res.ok) {
                fetchComments();
            }
        } catch (error) {
            console.log(error);
        }
    }

    let replyLength = 0;
    comment.map((el) => replyLength += el.replies.length)
    let commentLength = comment.length + replyLength;



    const checkHandleFollow = (e) => {
        e.preventDefault();

        if (!session?.user) return alert('Please sign in first!');
        setIsFollowing((prev) => !prev);
        handleFollow(post._id);
    }

    useEffect(() => {
        fetchComments();
        setPostIsLiked(post.likes.includes(session?.user.id));
        setIsFollowing(post.author.followers.includes(session?.user.id));
        console.log(postIsLiked);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session?.user.id])



    return (
        <div className='post_card'
            style={{ backgroundColor: darkmode ? '#1D2226' : 'white' }}
        >
            <div className='card_top'>
                <Link href={
                    session?.user.id === post.author._id
                        ? '/myprofile'
                        : `/userprofile/${post.author._id}`
                }>
                    <div className="user">
                        <Image
                            src={post.author.image}
                            alt='profile image'
                            width={40}
                            height={40}
                            className='rounded-full'
                        />

                        <div className='user_info'>
                            <h3>{capitalize(post.author.username)}</h3>
                            <p>{post.author.email}</p>
                        </div>
                    </div>
                </Link>

                {
                    session?.user.id !== post.author._id &&
                    <button
                        className='follow_btn'
                        onClick={checkHandleFollow}
                        style={{ 
                            border: darkmode ? '1px solid white' : '1px solid black' ,
                            opacity: isFollowing ? '0.6' : '1'
                        }}
                    >
                        {isFollowing ? 'Unfollow' : 'Follow'}
                    </button>
                }

                {/* <div className="copy_btn">
                    <Image
                        src={copied === post.text ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
                        alt='copy'
                        width={18}
                        height={18}
                        className='cursor-pointer'
                        onClick={handleCopy}
                    />
                </div> */}
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element*/}
            <img
                src={post.imageURL}
                alt="post-image"
                className='post_image'
            />
            <div className='card_text'>{post.text}</div>
            <div className='card_tags'>
                {
                    post.tag.split(' ').map((el, index) => (
                        el.length !== 0 &&
                        <span className='cursor-pointer' key={index} onClick={() => handleTagClick(`#${el}`)}>
                            #{el}
                        </span>
                    ))
                }
            </div>

            <div className="card_actions">
                <div className="like_btn" onClick={checkHandlePostLikes}>
                    {
                        postIsLiked ? <BsHeartFill className='heart_fill' /> : <BsHeart />
                    }

                    <span>{post.likes.length}</span>
                </div>

                <div className="comments_btn" onClick={() => setToggleComment((prev) => !prev)}>
                    <BsChat />
                    <span>
                        {commentLength}
                    </span>
                </div>
            </div>

            {
                session?.user.id === post.author._id &&
                pathname === '/myprofile' && (
                    <div className='card_btns'>
                        <span className='edit_btn' onClick={handleEdit}>Edit</span>
                        <span className='delete_btn' onClick={handleDelete}>Delete</span>
                    </div>
                )

            }

            <div className="comments" style={{ display: toggleComment ? 'block' : 'none' }}>
                <form onSubmit={addComment}>
                    <input type="text"
                        placeholder='Add a comment...'
                        onChange={(e) => setInputComment(e.target.value)}
                        value={inputComment}
                    />
                    <button type='submit'>
                        <AiOutlineSend />
                    </button>
                </form>

                {
                    comment.length > 0 ? (
                        comment.map((el) => (

                            <CommentComponent
                                key={el._id}
                                userimg={el.userId.image}
                                username={capitalize(el.userId.username)}
                                text={el.comtext}
                                likes={el.comlikes}
                                link={
                                    session?.user.id === el.userId._id
                                        ? '/myprofile'
                                        : `/userprofile/${el.userId._id}`
                                }
                                commentID={el._id}
                                submitReply={submitReply}
                                handleCommentLikes={handleCommentLikes}
                                replies={el.replies}
                                handleReplyLikes={handleReplyLikes}
                            />
                        ))
                    ) : 'Not any comments yet'

                }

            </div>
        </div>
    )
}

export default PostCard