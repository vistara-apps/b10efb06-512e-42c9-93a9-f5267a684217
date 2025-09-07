'use client';

import { AlertTriangle } from 'lucide-react';

interface HeaderProps {
  withWarningBanner?: boolean;
}

export function Header({ withWarningBanner = true }: HeaderProps) {
  return (
    <header className="w-full">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-shadow">Shmoo</h1>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-300">
          <span>Faucet Events</span>
          <span>Connected</span>
          <div className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-xs">
            Add to my app
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2 text-shadow">Shmoo Faucet</h2>
        <p className="text-gray-300">The Shmoo Faucet</p>
      </div>

      {withWarningBanner && (
        <div className="glass-card p-6 mb-8 warning-glow border-warning border-opacity-50">
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-warning flex-shrink-0 mt-1" size={20} />
            <div>
              <h3 className="font-semibold text-warning mb-2">⚠️ No Value! No Benefit!</h3>
              <p className="text-sm text-white leading-relaxed">
                INFO: The Shmoo Points Are Non-Transferable and Are 
                Non-Transferable and May or May Not Have No Monetary.
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
