'use client';
import { SessionProvider } from 'next-auth/react';

const SessionProviders = ({ children, session }) => {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}

export default SessionProviders