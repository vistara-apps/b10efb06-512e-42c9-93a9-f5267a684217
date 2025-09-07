'use client';

import { useAccount } from 'wagmi';
import { usePrivy } from '@privy-io/react-auth';
import { useShmooMint, useUserShmooData } from '@/lib/hooks/useShmooContract';
import { useMintState } from '@/lib/store';
import { formatTxHash, getExplorerUrl } from '@/lib/utils';
import { Loader2, ExternalLink, Sparkles, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export function ShmooMintButton() {
  const { authenticated } = usePrivy();
  const { address, isConnected } = useAccount();
  const { mint, isLoading, isSuccess, transactionHash } = useShmooMint();
  const { hasMinted, isLoading: userDataLoading } = useUserShmooData(address);
  const mintState = useMintState();

  // Show success state if mint was successful
  if (isSuccess || mintState.isSuccess) {
    return (
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="glass-card p-8 mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="text-6xl mb-4"
          >
            🎉
          </motion.div>
          <h3 className="text-2xl font-bold mb-3 text-accent flex items-center justify-center gap-2">
            <CheckCircle className="w-6 h-6" />
            Shmoo Claimed!
          </h3>
          <p className="text-text-muted mb-4">
            Your unique, non-transferable Shmoo point has been minted to your wallet.
          </p>
          
          {(transactionHash || mintState.transactionHash) && (
            <div className="mt-4">
              <a
                href={getExplorerUrl(transactionHash || mintState.transactionHash!)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent/80 transition-colors"
              >
                View Transaction: {formatTxHash(transactionHash || mintState.transactionHash!)}
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>
        
        <div className="text-sm text-text-muted">
          <p>Remember: This Shmoo point is non-transferable and has no monetary value.</p>
          <p>It exists purely for identity and participation in the Shmoo community.</p>
        </div>
      </motion.div>
    );
  }

  // Show already minted state
  if (hasMinted && !userDataLoading) {
    return (
      <div className="text-center">
        <div className="glass-card p-6 mb-4">
          <div className="text-4xl mb-4">✨</div>
          <h3 className="text-xl font-semibold mb-2 text-accent">Already Claimed!</h3>
          <p className="text-text-muted">
            You have already claimed your Shmoo point. Each address can only mint one.
          </p>
        </div>
      </div>
    );
  }

  const handleMint = async () => {
    if (!authenticated || !isConnected) return;
    await mint();
  };

  const isDisabled = !authenticated || !isConnected || isLoading || userDataLoading;

  return (
    <div className="text-center">
      <motion.button
        onClick={handleMint}
        disabled={isDisabled}
        className={`btn-primary relative overflow-hidden ${
          isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
        }`}
        whileHover={!isDisabled ? { scale: 1.05 } : {}}
        whileTap={!isDisabled ? { scale: 0.95 } : {}}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            {mintState.transactionHash ? 'Confirming...' : 'Claiming Shmoo...'}
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Claim Shmoo
          </span>
        )}
        
        {/* Animated background effect */}
        {!isDisabled && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-accent/20 to-primary/20"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "linear",
            }}
          />
        )}
      </motion.button>
      
      {!authenticated && (
        <p className="text-sm text-text-muted mt-4">
          Connect your wallet to claim your Shmoo point
        </p>
      )}
      
      {mintState.error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg"
        >
          <p className="text-sm text-red-400">
            {mintState.error}
          </p>
        </motion.div>
      )}
      
      {isLoading && mintState.transactionHash && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-accent/10 border border-accent/20 rounded-lg"
        >
          <p className="text-sm text-accent">
            Transaction submitted! Waiting for confirmation...
          </p>
          <a
            href={getExplorerUrl(mintState.transactionHash)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-accent/80 hover:text-accent mt-1"
          >
            View on Explorer <ExternalLink className="w-3 h-3" />
          </a>
        </motion.div>
      )}
    </div>
  );
}
