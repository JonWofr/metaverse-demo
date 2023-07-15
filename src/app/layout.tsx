import { Web3Providers } from '@/components/Web3Providers';
import './globals.css';
import { Inter } from 'next/font/google';
import { Header } from '@/components/Header';
import '@rainbow-me/rainbowkit/styles.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Metaverse Demo',
  description:
    'This dApp features a 3D metaverse with a mintable in-game item.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Web3Providers>
          {children}
          <Header />
        </Web3Providers>
      </body>
    </html>
  );
}
