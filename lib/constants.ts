import { base, baseSepolia } from 'viem/chains';

// Contract addresses and configuration
export const SHMOO_CONTRACT_ADDRESS = process.env.NODE_ENV === 'production' 
  ? '0x0000000000000000000000000000000000000000' // TODO: Replace with actual deployed contract address
  : '0x1234567890123456789012345678901234567890' as const; // Testnet address

// Chain configuration
export const SUPPORTED_CHAIN = process.env.NODE_ENV === 'production' ? base : baseSepolia;

// Design tokens
export const DESIGN_TOKENS = {
  colors: {
    bg: 'hsl(210, 30%, 10%)',
    accent: 'hsl(130, 70%, 60%)',
    primary: 'hsl(210, 80%, 50%)',
    surface: 'hsl(210, 30%, 15%)',
    warning: 'hsl(30, 80%, 60%)',
    textMuted: 'hsl(210, 30%, 70%)',
    textPrimary: 'hsl(210, 30%, 95%)',
  },
  spacing: {
    sm: '8px',
    md: '12px',
    lg: '20px',
  },
  radius: {
    sm: '6px',
    md: '10px',
    lg: '16px',
  },
} as const;

// App configuration
export const APP_CONFIG = {
  name: 'Shmoo Faucet',
  tagline: 'Claim your unique, non-transferable Shmoo point – for fun, for identity, for nothing else.',
  warningMessage: '⚠️ IMPORTANT: Shmoo Points are NON-TRANSFERABLE and have NO MONETARY VALUE',
  description: 'A mini-app on Base that allows users to claim a non-transferable Shmoo point on the blockchain, with a clear warning about its lack of value.',
} as const;

// API endpoints
export const API_ENDPOINTS = {
  BASE_RPC: process.env.NEXT_PUBLIC_BASE_RPC_URL || 'https://mainnet.base.org',
  ALCHEMY_RPC: process.env.NEXT_PUBLIC_ALCHEMY_RPC_URL,
} as const;

// Feature flags
export const FEATURES = {
  ENABLE_ANALYTICS: process.env.NODE_ENV === 'production',
  ENABLE_ERROR_REPORTING: process.env.NODE_ENV === 'production',
  ENABLE_NOTIFICATIONS: true,
} as const;
