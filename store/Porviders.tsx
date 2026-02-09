'use client'

import { Provider } from 'react-redux';
import { SessionProvider } from 'next-auth/react';
import { store } from '.';

interface Props {
  children: React.ReactNode;
}

export const Providers = ({ children }: Props) => {
  return (
    <SessionProvider>
      <Provider store={store}>
        {children}
      </Provider>
    </SessionProvider>
  )
}
