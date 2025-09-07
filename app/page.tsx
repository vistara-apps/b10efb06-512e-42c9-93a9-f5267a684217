'use client';

import { useEffect } from 'react';
import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { Header } from '@/components/Header';
import { WalletConnectButton } from '@/components/WalletConnectButton';
import { ShmooMintButton } from '@/components/ShmooMintButton';
import { CalloutCard } from '@/components/CalloutCard';
import { FloatingElements } from '@/components/FloatingElements';

export default function HomePage() {
  const { setFrameReady } = useMiniKit();

  useEffect(() => {
    setFrameReady();
  }, [setFrameReady]);

  return (
    <div className="min-h-screen relative">
      <FloatingElements />
      
      <div className="relative z-10 max-w-xl mx-auto px-4 py-8">
        <Header withWarningBanner />
        
        <div className="space-y-8">
          {/* Main action area */}
          <div className="text-center space-y-6">
            <ShmooMintButton />
            
            <div className="text-sm text-text-muted">
              <p>Lazy's Shmoo isn't an asset. So you can't a fiat that result</p>
              <p>and be fine for this app name.</p>
            </div>
          </div>
          
          {/* Wallet connection */}
          <div className="flex justify-center">
            <WalletConnectButton />
          </div>
          
          {/* Additional information */}
          <CalloutCard variant="info" title="What is a Shmoo Point?">
            <p>
              A Shmoo point is a unique, non-transferable token that represents your participation 
              in the Shmoo ritual. It has no monetary value and cannot be traded or sold. 
              It exists purely for identity and fun.
            </p>
          </CalloutCard>
          
          <CalloutCard variant="warning" title="Important Disclaimer">
            <p>
              By claiming a Shmoo point, you acknowledge that it has no monetary value, 
              cannot be transferred, and serves no purpose other than digital identity 
              and participation in the Shmoo community.
            </p>
          </CalloutCard>
        </div>
      </div>
    </div>
  );
}
