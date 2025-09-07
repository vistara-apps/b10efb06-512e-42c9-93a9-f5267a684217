'use client';

import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import { Name } from '@coinbase/onchainkit/identity';

export function WalletConnectButton() {
  return (
    <Wallet>
      <ConnectWallet className="btn-secondary">
        <Name />
      </ConnectWallet>
    </Wallet>
  );
}
