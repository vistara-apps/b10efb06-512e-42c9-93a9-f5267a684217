import { Address } from 'viem';

// User types
export interface User {
  walletAddress: Address;
  shmooPointsMinted: number;
  hasMinted: boolean;
}

// ShmooPoint types
export interface ShmooPoint {
  ownerAddress: Address;
  tokenId: bigint;
  mintTimestamp: bigint;
}

// Contract interaction types
export interface MintResult {
  success: boolean;
  transactionHash?: string;
  tokenId?: bigint;
  error?: string;
}

// UI State types
export interface MintState {
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
  transactionHash: string | null;
}

// Component prop types
export interface CalloutCardProps {
  variant: 'info' | 'warning' | 'success' | 'error';
  title: string;
  children: React.ReactNode;
  className?: string;
}

export interface HeaderProps {
  withWarningBanner?: boolean;
}

// Wallet connection types
export interface WalletState {
  isConnected: boolean;
  address?: Address;
  isConnecting: boolean;
  error?: string;
}

// API response types
export interface ContractReadResult<T = unknown> {
  data?: T;
  error?: string;
  isLoading: boolean;
}

// Event types
export interface ShmooPointMintedEvent {
  to: Address;
  tokenId: bigint;
  timestamp: bigint;
}
