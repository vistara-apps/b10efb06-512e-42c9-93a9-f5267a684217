// Contract addresses and configuration
export const SHMOO_CONTRACT_ADDRESS = '0x1234567890123456789012345678901234567890' as const;

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
  warningMessage: 'INFO: The Shmoo Points Are Non-Transferable and Are Non-Transferable and May or May Not Have No Monetary.',
} as const;
