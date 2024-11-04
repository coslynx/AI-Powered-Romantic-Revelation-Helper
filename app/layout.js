'use client';

import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { useStore } from '../lib/store'; 
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function RootLayout({ children, session }) {
  const store = useStore();

  return (
    <html>
      <head>
        <title>Romantic Revelation Helper</title>
      </head>
      <body>
        <SessionProvider session={session}>
          <Header /> 
          <main className="container mx-auto py-8">{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}