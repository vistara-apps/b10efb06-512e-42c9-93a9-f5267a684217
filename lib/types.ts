export interface ShmooPoint {
  ownerAddress: string;
  tokenId: bigint;
  mintTimestamp: bigint;
}

export interface User {
  walletAddress: string;
  shmooPointsMinted: bigint;
}

export interface MintResult {
  success: boolean;
  transactionHash?: string;
  error?: string;
}
