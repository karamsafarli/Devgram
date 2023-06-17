'use client'
import Nav from '@components/Nav';
import '@styles/globals.css';
import '@styles/style.scss';
import { useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Providers } from '@redux/provider';
import SessionProviders from '@components/Provider';
import App from '@components/App';


export const metadata = {
    title: 'Devgram',
    description: 'Instagram for developers'
}

const RootLayout = ({ children }) => {
    return (
        <html lang='en'>
            <SessionProviders>
                <Providers>
                    <App>
                        {children}
                    </App>
                </Providers>
            </SessionProviders>
        </html>
    )
}

export default RootLayout