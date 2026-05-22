import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/components/Providers';

export const metadata: Metadata = {
  title: 'ProofX — Gasless Certificate & Badge Platform',
  description: 'Mint digital certificates and achievement badges as NFTs on Base Sepolia — no ETH required. Powered by UGF gasless technology.',
  keywords: ['NFT', 'certificates', 'gasless', 'Web3', 'Base', 'UGF', 'badges', 'blockchain'],
  openGraph: {
    title: 'ProofX — Mint Certificates Without ETH',
    description: 'The first gasless certificate platform on Base. Powered by Universal Gas Framework.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-[#050810] text-white antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
