'use client'
import '@styles/globals.css';
import '@styles/style.scss';
import { Providers } from '@redux/provider';
import SessionProviders from '@components/Provider';
import App from '@components/App';


export const metadata = {
    title: 'portfolio.az',
    description: 'Share your portfolio and get hired!',
}

const RootLayout = ({ children }) => {
    return (
            <SessionProviders>
                <Providers>
                    <App>
                        {children}
                    </App>
                </Providers>
            </SessionProviders>
    )
}

export default RootLayout