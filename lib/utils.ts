import { clsx, type ClassValue } from 'clsx';
import { Address } from 'viem';

/**
 * Utility function to combine class names
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * Format an address for display
 */
export function formatAddress(address: Address, chars = 4): string {
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}

/**
 * Format a timestamp to a readable date
 */
export function formatTimestamp(timestamp: bigint): string {
  const date = new Date(Number(timestamp) * 1000);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Format a transaction hash for display
 */
export function formatTxHash(hash: string, chars = 6): string {
  return `${hash.slice(0, chars + 2)}...${hash.slice(-chars)}`;
}

/**
 * Check if an address is valid
 */
export function isValidAddress(address: string): address is Address {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

/**
 * Generate a random ID
 */
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Sleep utility
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
}

/**
 * Get explorer URL for transaction
 */
export function getExplorerUrl(txHash: string, chainId: number = 8453): string {
  const baseUrl = chainId === 8453 
    ? 'https://basescan.org' 
    : 'https://sepolia.basescan.org';
  return `${baseUrl}/tx/${txHash}`;
}

/**
 * Get explorer URL for address
 */
export function getAddressExplorerUrl(address: Address, chainId: number = 8453): string {
  const baseUrl = chainId === 8453 
    ? 'https://basescan.org' 
    : 'https://sepolia.basescan.org';
  return `${baseUrl}/address/${address}`;
}

/**
 * Format error message for display
 */
export function formatError(error: unknown): string {
  if (typeof error === 'string') {
    return error;
  }
  
  if (error instanceof Error) {
    // Handle common Web3 errors
    if (error.message.includes('User rejected')) {
      return 'Transaction was rejected by user';
    }
    if (error.message.includes('insufficient funds')) {
      return 'Insufficient funds for transaction';
    }
    if (error.message.includes('AlreadyMinted')) {
      return 'You have already minted a Shmoo Point';
    }
    if (error.message.includes('TransferNotAllowed')) {
      return 'Shmoo Points are non-transferable';
    }
    
    return error.message;
  }
  
  return 'An unknown error occurred';
}

/**
 * Validate environment variables
 */
export function validateEnv() {
  const required = [
    'NEXT_PUBLIC_ONCHAINKIT_API_KEY',
  ];
  
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    console.warn('Missing environment variables:', missing);
  }
  
  return missing.length === 0;
}

/**
 * Get Base network configuration
 */
export function getNetworkConfig() {
  const isProduction = process.env.NODE_ENV === 'production';
  
  return {
    chainId: isProduction ? 8453 : 84532, // Base Mainnet : Base Sepolia
    name: isProduction ? 'Base' : 'Base Sepolia',
    rpcUrl: isProduction 
      ? process.env.NEXT_PUBLIC_BASE_RPC_URL || 'https://mainnet.base.org'
      : process.env.NEXT_PUBLIC_BASE_SEPOLIA_RPC_URL || 'https://sepolia.base.org',
    explorerUrl: isProduction 
      ? 'https://basescan.org' 
      : 'https://sepolia.basescan.org',
  };
}
