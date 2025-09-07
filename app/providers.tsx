'use client';

import { MiniKitProvider } from '@coinbase/onchainkit/minikit';
import { PrivyProvider } from '@privy-io/react-auth';
import { WagmiProvider } from '@privy-io/wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { base, baseSepolia } from 'wagmi/chains';
import { http } from 'wagmi';
import { createConfig } from 'wagmi';
import { type ReactNode, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { SUPPORTED_CHAIN } from '@/lib/constants';

// Wagmi configuration
const config = createConfig({
  chains: [base, baseSepolia],
  transports: {
    [base.id]: http(process.env.NEXT_PUBLIC_BASE_RPC_URL || 'https://mainnet.base.org'),
    [baseSepolia.id]: http(process.env.NEXT_PUBLIC_BASE_SEPOLIA_RPC_URL || 'https://sepolia.base.org'),
  },
});

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
        retry: 3,
      },
    },
  }));

  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || 'clpispdty00lu11pf5keb17hj'}
      config={{
        loginMethods: ['wallet', 'email', 'sms'],
        appearance: {
          theme: 'dark',
          accentColor: '#4ade80',
          logo: '/logo.png',
        },
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
          requireUserPasswordOnCreate: false,
        },
        defaultChain: SUPPORTED_CHAIN,
        supportedChains: [base, baseSepolia],
      }}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={config}>
          <MiniKitProvider
            chain={SUPPORTED_CHAIN}
            apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY || 'cdp_demo_key'}
          >
            {children}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: 'hsl(210, 30%, 15%)',
                  color: 'hsl(210, 30%, 95%)',
                  border: '1px solid hsl(210, 30%, 25%)',
                },
                success: {
                  iconTheme: {
                    primary: '#4ade80',
                    secondary: 'hsl(210, 30%, 15%)',
                  },
                },
                error: {
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: 'hsl(210, 30%, 15%)',
                  },
                },
              }}
            />
          </MiniKitProvider>
        </WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
}
