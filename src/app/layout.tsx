import './globals.css';

import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';

import Footer from '@/components/footer';
import Sidebar from '@/components/sidebar';

const SpaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Zk Snap',
  description: 'Zk Snap',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={SpaceGrotesk.className}>
        <Sidebar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
