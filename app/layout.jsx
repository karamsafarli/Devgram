import '@styles/globals.css';
import '@styles/style.scss';
import { Providers } from '@redux/provider';
import SessionProviders from '@components/Provider';
import App from '@components/App';


export const metadata = {
    title: 'Devgram',
    description: 'Instagram for developers!',
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