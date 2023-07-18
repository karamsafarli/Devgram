'use client';
import Image from "next/image";
import { useState } from 'react'
import { useSelector } from 'react-redux';
import { useSession } from "next-auth/react";
import Link from "next/link";
const FollowerComponent = ({ userInfo, checkHandleFollow }) => {
    const capitalize = (name) => {
        const strlist = name.split(' ').map((str) => {
            return str[0].toUpperCase() + str.slice(1);
        })

        return strlist.join(' ');
    }
    const { data: session } = useSession()
    const darkmode = useSelector((state) => state.colorThemeReducer.value);
    const [isFollowing, setIsFollowing] = useState(userInfo.followers.includes(session?.user.id))
    return (
        <div className="follower-component" style={{ backgroundColor: darkmode ? '#1D2226' : 'white' }}>
            <Link className="fc-left" href={
                session?.user.id === userInfo._id ? `/myprofile` :
                    `/userprofile/${userInfo._id}`
            }>

                <Image
                    src={userInfo.image}
                    alt="user"
                    width={40}
                    height={40}
                    className="rounded-full"
                />
                <h3>{capitalize(userInfo.username)}</h3>


            </Link>
            {

                session?.user.id !== userInfo._id &&
                <button
                    className='follow_btn'
                    onClick={() => {
                        checkHandleFollow(userInfo._id)
                        setIsFollowing((prev) => !prev)
                    }}
                    style={{
                        
                        background: isFollowing ? 'rgba(205, 205, 205, 0.503)' : '',
                        color: isFollowing ? 'black' : ''
                    }}
                >
                    {isFollowing ? 'Unfollow' : 'Follow'}
                </button>
            }


        </div>
    )
}

export default FollowerComponent