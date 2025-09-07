'use client';

import { useState } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';

// Mock contract ABI for demonstration
const SHMOO_CONTRACT_ABI = [
  {
    name: 'mint',
    type: 'function',
    stateMutability: 'payable',
    inputs: [],
    outputs: [],
  },
] as const;

// Mock contract address - in production, this would be the deployed contract
const SHMOO_CONTRACT_ADDRESS = '0x1234567890123456789012345678901234567890' as const;

export function ShmooMintButton() {
  const { isConnected } = useAccount();
  const [isMinting, setIsMinting] = useState(false);
  const [mintSuccess, setMintSuccess] = useState(false);

  const { writeContract, data: hash, error } = useWriteContract();
  
  const { isLoading: isConfirming } = useWaitForTransactionReceipt({
    hash,
  });

  const handleMint = async () => {
    if (!isConnected) return;
    
    setIsMinting(true);
    try {
      // In a real implementation, this would call the actual smart contract
      await writeContract({
        address: SHMOO_CONTRACT_ADDRESS,
        abi: SHMOO_CONTRACT_ABI,
        functionName: 'mint',
        value: parseEther('0'), // Free mint
      });
      
      // Simulate successful mint for demo
      setTimeout(() => {
        setMintSuccess(true);
        setIsMinting(false);
      }, 2000);
    } catch (err) {
      console.error('Minting failed:', err);
      setIsMinting(false);
    }
  };

  if (mintSuccess) {
    return (
      <div className="text-center">
        <div className="glass-card p-6 mb-4">
          <div className="text-4xl mb-4">🎉</div>
          <h3 className="text-xl font-semibold mb-2 text-accent">Shmoo Claimed!</h3>
          <p className="text-text-muted">Your non-transferable Shmoo point has been minted to your wallet.</p>
        </div>
        <button
          onClick={() => setMintSuccess(false)}
          className="btn-secondary"
        >
          Claim Another
        </button>
      </div>
    );
  }

  return (
    <div className="text-center">
      <button
        onClick={handleMint}
        disabled={!isConnected || isMinting || isConfirming}
        className={`btn-primary ${(!isConnected || isMinting || isConfirming) ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isMinting || isConfirming ? (
          <span className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Claiming Shmoo...
          </span>
        ) : (
          'Claim Shmoo'
        )}
      </button>
      
      {!isConnected && (
        <p className="text-sm text-text-muted mt-4">
          Connect your wallet to claim your Shmoo point
        </p>
      )}
      
      {error && (
        <p className="text-sm text-red-400 mt-4">
          Error: {error.message}
        </p>
      )}
    </div>
  );
}
