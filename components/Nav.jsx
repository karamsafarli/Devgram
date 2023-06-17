"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
import { MdLightMode, MdDarkMode } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import { changemode, localmode } from '@redux/features/slicers';
import { useRouter } from "next/navigation";


const Nav = () => {

    const darkMode = useSelector((state) => state.colorThemeReducer.value)
    const dispatch = useDispatch();
    const { data: session } = useSession();
    const [providers, setProviders] = useState(null)
    const [dropdown, setDropdown] = useState(false)
    const router = useRouter();


    useEffect(() => {
        if (typeof window !== undefined) {
            dispatch(localmode(localStorage.getItem('mode') === 'dark'))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const setDarkLocal = () => {
        dispatch(changemode());
        if (typeof window !== undefined) {
            localStorage.setItem('mode', darkMode ? 'light' : 'dark')
        }
    }
    useEffect(() => {
        const setUpProviders = async () => {
            const response = await getProviders();
            setProviders(response)
        }

        setUpProviders();
    }, [])



    return (
        <nav className="nav-style">
            <Link href='/' className="flex gap-2 items-center">
                <Image
                    src='/assets/images/logo.svg'
                    width={45}
                    height={45}
                    alt="logo"
                />
                <span className="logo-text">Devgram</span>
            </Link>

            {/* Desktop nav */}
            <div className="desk_nav">
                <div className="themes" onClick={setDarkLocal}>
                    {
                        darkMode ? (
                            <MdLightMode />
                        ) : (
                            <MdDarkMode />
                        )
                    }
                </div>
                {
                    session?.user ? (
                        <>
                            <Link
                                href='/create-post'
                                className='btn'
                            >
                                Create Post
                            </Link>

                            <button className={`outline_btn ${darkMode ? 'outbtn-dark-hover' : 'outbtn-light-hover'}`}
                                style={{
                                    border: darkMode ? '1px solid white' : '1px solid black',
                                    backgroundColor: darkMode ? 'white' : 'black',
                                    color: darkMode ? 'black' : 'white'
                                }}
                                onClick={() => {
                                    signOut({ callbackUrl: '/' });
                                }}>
                                Sign Out
                            </button>


                            <Link href='/myprofile'>
                                <Image
                                    src={session?.user.image}
                                    alt="profile"
                                    height={38}
                                    width={38}
                                    className="pp"
                                />
                            </Link>
                        </>

                    ) : (
                        <>
                            {
                                providers &&
                                Object.values(providers).map((provider) => (
                                    <button
                                        key={provider.name}
                                        onClick={() => signIn(provider.id)}
                                        className="btn"
                                    >
                                        Sign In
                                    </button>
                                ))
                            }
                        </>
                    )
                }
            </div>

            {/* Mobile navigation */}
            <div className="mobile_nav">
                <div className="themes" onClick={setDarkLocal}>
                    {
                        darkMode ? (
                            <MdLightMode />
                        ) : (
                            <MdDarkMode />
                        )
                    }
                </div>
                {
                    session?.user ? (
                        <div>
                            <Image
                                src={session?.user.image}
                                alt="profile"
                                height={38}
                                width={38}
                                className="pp"
                                onClick={() => setDropdown((prev) => !prev)}
                            />

                            {
                                dropdown &&
                                <div className="dropdown">
                                    <Link
                                        href='/myprofile'
                                        onClick={() => setDropdown(false)}
                                    >
                                        My Profile
                                    </Link>

                                    <Link
                                        href='/create-post'
                                        onClick={() => setDropdown(false)}
                                    >
                                        Create Post
                                    </Link>

                                    <button
                                        className="btn signout"
                                        onClick={() => {
                                            setDropdown(false);
                                            signOut();
                                        }}
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            }
                        </div>
                    ) : (
                        <>
                            {
                                providers &&
                                Object.values(providers).map((provider) => (
                                    <button
                                        key={provider.name}
                                        onClick={() => signIn(provider.id)}
                                        className="btn"
                                    >
                                        Sign In
                                    </button>
                                ))
                            }
                        </>
                    )
                }
            </div>
        </nav >
    )
}

export default Nav