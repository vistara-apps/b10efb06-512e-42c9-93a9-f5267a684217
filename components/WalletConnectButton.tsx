'use client';

import { usePrivy } from '@privy-io/react-auth';
import { useAccount } from 'wagmi';
import { formatAddress } from '@/lib/utils';
import { Wallet, LogOut, Loader2 } from 'lucide-react';

export function WalletConnectButton() {
  const { login, logout, ready, authenticated } = usePrivy();
  const { address, isConnected } = useAccount();

  if (!ready) {
    return (
      <button disabled className="btn-secondary">
        <Loader2 className="w-4 h-4 animate-spin mr-2" />
        Loading...
      </button>
    );
  }

  if (authenticated && isConnected && address) {
    return (
      <div className="flex items-center gap-3">
        <div className="glass-card px-4 py-2 text-sm">
          <div className="flex items-center gap-2">
            <Wallet className="w-4 h-4 text-accent" />
            <span className="text-text-muted">Connected:</span>
            <span className="text-text-primary font-mono">
              {formatAddress(address)}
            </span>
          </div>
        </div>
        <button
          onClick={logout}
          className="btn-secondary flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={login}
      className="btn-primary flex items-center gap-2"
    >
      <Wallet className="w-4 h-4" />
      Connect Wallet
    </button>
  );
}
