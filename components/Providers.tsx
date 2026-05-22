'use client';

import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { config } from '@/lib/wagmi';
import { Toaster } from 'react-hot-toast';

import '@rainbow-me/rainbowkit/styles.css';

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: '#a855f7',
            accentColorForeground: 'white',
            borderRadius: 'large',
            fontStack: 'system',
            overlayBlur: 'large',
          })}
          modalSize="compact"
        >
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'rgba(10, 15, 30, 0.95)',
                color: '#ffffff',
                border: '1px solid rgba(168, 85, 247, 0.3)',
                backdropFilter: 'blur(20px)',
                borderRadius: '12px',
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
              },
              success: {
                iconTheme: { primary: '#a855f7', secondary: 'white' },
              },
              error: {
                iconTheme: { primary: '#ef4444', secondary: 'white' },
              },
            }}
          />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
