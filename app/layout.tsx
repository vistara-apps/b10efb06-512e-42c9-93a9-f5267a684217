import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Shmoo Faucet',
  description: 'Claim your unique, non-transferable Shmoo point – for fun, for identity, for nothing else.',
  openGraph: {
    title: 'Shmoo Faucet',
    description: 'Claim your unique, non-transferable Shmoo point – for fun, for identity, for nothing else.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
