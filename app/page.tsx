'use client';

import { useEffect } from 'react';
import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { useAccount } from 'wagmi';
import { usePrivy } from '@privy-io/react-auth';
import { Header } from '@/components/Header';
import { WalletConnectButton } from '@/components/WalletConnectButton';
import { ShmooMintButton } from '@/components/ShmooMintButton';
import { CalloutCard } from '@/components/CalloutCard';
import { FloatingElements } from '@/components/FloatingElements';
import { useShmooContractRead, useUserShmooData } from '@/lib/hooks/useShmooContract';
import { useShmooStore } from '@/lib/store';
import { motion } from 'framer-motion';

export default function HomePage() {
  const { setFrameReady } = useMiniKit();
  const { authenticated } = usePrivy();
  const { address, isConnected } = useAccount();
  const { totalSupply } = useShmooContractRead();
  const { hasMinted, balance } = useUserShmooData(address);
  const { setUser } = useShmooStore();

  useEffect(() => {
    setFrameReady();
  }, [setFrameReady]);

  // Update user in store when wallet connects
  useEffect(() => {
    if (authenticated && isConnected && address) {
      setUser({
        walletAddress: address,
        shmooPointsMinted: balance ? Number(balance) : 0,
        hasMinted: hasMinted || false,
      });
    } else {
      setUser(null);
    }
  }, [authenticated, isConnected, address, balance, hasMinted, setUser]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <FloatingElements />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        <Header withWarningBanner />
        
        <div className="space-y-8">
          {/* Main action area */}
          <motion.div 
            className="text-center space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <ShmooMintButton />
            
            {/* Wallet connection */}
            <div className="flex justify-center">
              <WalletConnectButton />
            </div>
          </motion.div>
          
          {/* Statistics */}
          {totalSupply !== undefined && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.5 }}
              className="text-center"
            >
              <div className="glass-card p-6 max-w-md mx-auto">
                <h3 className="text-lg font-semibold mb-2 text-accent">Community Stats</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <div className="text-3xl font-bold text-primary">{totalSupply.toString()}</div>
                    <div className="text-sm text-text-muted">Total Shmoo Points Claimed</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Information cards */}
          <motion.div 
            className="grid gap-6 md:grid-cols-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <CalloutCard variant="info" title="What is a Shmoo Point?">
              <p className="mb-3">
                A Shmoo Point is a unique, non-transferable NFT that represents your participation 
                in the Shmoo ritual on the Base blockchain.
              </p>
              <ul className="text-xs space-y-1 text-text-muted">
                <li>• Each address can only mint one Shmoo Point</li>
                <li>• Cannot be transferred or sold</li>
                <li>• Has no monetary value</li>
                <li>• Exists purely for identity and community</li>
              </ul>
            </CalloutCard>
            
            <CalloutCard variant="warning" title="Technical Details">
              <p className="mb-3">
                Shmoo Points are implemented as ERC-721 tokens with transfer functions disabled 
                at the smart contract level.
              </p>
              <ul className="text-xs space-y-1 text-text-muted">
                <li>• Built on Base blockchain</li>
                <li>• Gas-efficient minting process</li>
                <li>• On-chain metadata and SVG images</li>
                <li>• Verifiable ownership and authenticity</li>
              </ul>
            </CalloutCard>
          </motion.div>

          {/* User status */}
          {authenticated && isConnected && address && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.5 }}
            >
              <CalloutCard 
                variant={hasMinted ? "success" : "info"} 
                title="Your Status"
              >
                <div className="space-y-2">
                  <p>
                    <span className="font-semibold">Wallet:</span> {address.slice(0, 6)}...{address.slice(-4)}
                  </p>
                  <p>
                    <span className="font-semibold">Shmoo Points:</span> {balance ? balance.toString() : '0'}
                  </p>
                  <p>
                    <span className="font-semibold">Status:</span> 
                    <span className={`ml-2 px-2 py-1 rounded text-xs ${
                      hasMinted 
                        ? 'bg-accent/20 text-accent' 
                        : 'bg-text-muted/20 text-text-muted'
                    }`}>
                      {hasMinted ? 'Claimed' : 'Not Claimed'}
                    </span>
                  </p>
                </div>
              </CalloutCard>
            </motion.div>
          )}

          {/* Final disclaimer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.5 }}
          >
            <CalloutCard variant="warning" title="Final Reminder">
              <p className="text-center font-semibold">
                Shmoo Points are experimental, non-transferable tokens with no monetary value. 
                They exist purely for fun, identity, and community participation.
              </p>
            </CalloutCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
