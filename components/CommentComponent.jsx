'use client'
import Image from "next/image";
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { AiOutlineSend } from 'react-icons/ai';
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import ReplyComponent from "./ReplyComponent";
const CommentComponent = ({ userimg, username, text, likes, link, handleCommentLikes, commentID, submitReply, replies, handleReplyLikes }) => {

    const { data: session } = useSession();
    const [isLiked, setIsLiked] = useState(null);
    const [showReplyInput, setShowReplyInput] = useState(true);
    const [reply, setReply] = useState('');
    const inputRef = useRef(null);
    const [showReplies, setShowReplies] = useState(false);


    const replyHandler = (authname) => {
        setShowReplyInput((prev) => !prev);
        if (authname) {
            setReply(`@${authname.split(' ').join('').toLowerCase()} `);
        } else {
            setReply(`@${username.split(' ').join('').toLowerCase()} `);
        }
        setTimeout(() => {
            inputRef.current.focus();
        }, 100)
    }

    const checkCommentLikes = (e) => {
        e.preventDefault();
        if (!session?.user) return alert('Sign in before liking comments.');
        handleCommentLikes(commentID);
        setIsLiked((prev) => !prev);
    }

    const checkSubmitReply = (e) => {
        e.preventDefault();
        if (!session?.user) return alert('Sign in before replying comments.');
        setReply('');
        submitReply(commentID, reply);
        setShowReplyInput(false);
    }




    useEffect(() => {
        setIsLiked(likes.includes(session?.user.id))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div className="comment_component">
            <div className="user_comment">
                <div className="comment_left">
                    <Link href={link}>
                        <Image
                            src={userimg}
                            alt="profileimg"
                            width={28}
                            height={28}
                            className="rounded-full mt-1"
                        />
                    </Link>

                    <div className="comment_info">
                        <Link href={link}><h5>{username}</h5></Link>
                        <p>{text}</p>
                        <span onClick={() => replyHandler()}>Reply</span>
                    </div>
                </div>

                <div className="comment_right">
                    <div onClick={checkCommentLikes}>
                        {
                            isLiked ? <BsHeartFill className="heart_fill" /> : <BsHeart />
                        }
                    </div>
                    <span>{likes.length}</span>
                </div>
            </div>
            <div className="replies_section">
                <form style={{ display: showReplyInput ? 'block' : 'none' }} onSubmit={checkSubmitReply}>
                    <input type="text"
                        placeholder="Reply this comment..."
                        value={reply}
                        onChange={(e) => setReply(e.target.value)}
                        ref={inputRef}
                    />
                    <button type="submit">
                        <AiOutlineSend />
                    </button>
                </form>
                {   replies.length >= 3 &&
                    !showReplies &&
                    replies.length > 0 &&
                    <div className="show_replies">
                        <div className="line"></div>
                        <span onClick={() => setShowReplies(true)}>{`View ${replies.length} more replies`}</span>
                    </div>
                }
                {
                    replies.length < 3 ? (
                        replies?.map((reply) => (
                            <ReplyComponent
                                key={reply._id}
                                reply={reply}
                                replyHandler={() => replyHandler(reply.author.username)}
                                handleReplyLikes={handleReplyLikes}
                                commentID={commentID}
                            />
                        ))
                    ) : (
                        showReplies &&
                        replies?.map((reply) => (
                            <ReplyComponent
                                key={reply._id}
                                reply={reply}
                                replyHandler={() => replyHandler(reply.author.username)}
                                handleReplyLikes={handleReplyLikes}
                                commentID={commentID}
                            />
                        ))
                    )
                }

                {
                    replies.length >= 3 &&
                    showReplies &&
                    <div className="hide_replies">
                        <div className="line"></div>
                        <span onClick={() => setShowReplies(false)}>{`Hide replies`}</span>
                    </div>
                }


            </div>
        </div >
    )
}

export default CommentComponent