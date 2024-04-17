import './globals.css';

import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';

const inter = Space_Grotesk({ subsets: ['latin'] });

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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
