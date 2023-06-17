'use client'
import '@styles/globals.css';
import '@styles/style.scss';
import { Providers } from '@redux/provider';
import SessionProviders from '@components/Provider';
import App from '@components/App';


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