'use client'

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { useSession } from "next-auth/react";

const ReplyComponent = ({ reply, replyHandler, handleReplyLikes, commentID }) => {
    const [isLiked, setIsLiked] = useState(false);
    const { data: session } = useSession();
    useEffect(() => {
        setIsLiked(reply.likes.includes(session?.user.id))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session?.user.id])

    const capitalize = (name) => {
        const strlist = name.split(' ').map((str) => {
            return str[0].toUpperCase() + str.slice(1);
        })

        return strlist.join(' ');
    }
    const checkReplyLikes = (e) => {
        e.preventDefault();

        if (!session?.user) return alert('Sign in before liking comments');
        setIsLiked((prev) => !prev);
        handleReplyLikes(commentID, reply._id)
    }
    return (
        <div className="reply_comment" key={reply._id}>
            <div className="comment_left">
                <Link href={
                    session?.user.id === reply.author.authID
                        ? '/myprofile'
                        : `/userprofile/${reply.author.authID}`
                }>
                    <Image
                        src={reply.author.image}
                        alt="profileimg"
                        width={28}
                        height={28}
                        className="rounded-full mt-1"
                    />
                </Link>

                <div className="comment_info">
                    <Link href={
                        session?.user.id === reply.author.authID
                            ? '/myprofile'
                            : `/userprofile/${reply.author.authID}`
                    }>
                        <h5>{capitalize(reply.author.username)}</h5>
                    </Link>
                    <p>{reply.content}</p>
                    <span onClick={replyHandler}>Reply</span>
                </div>
            </div>

            <div className="comment_right">
                <div onClick={checkReplyLikes}>
                    {
                        isLiked ? <BsHeartFill className="heart_fill" /> : <BsHeart />
                    }

                </div>
                <span>{reply.likes.length}</span>
            </div>
        </div>
    )
}

export default ReplyComponent