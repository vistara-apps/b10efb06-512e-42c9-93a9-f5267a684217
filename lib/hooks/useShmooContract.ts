import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { Address } from 'viem';
import { SHMOO_POINT_ABI } from '../contracts/shmooPointABI';
import { SHMOO_CONTRACT_ADDRESS } from '../constants';
import { useShmooStore } from '../store';
import { formatError } from '../utils';
import { useCallback, useEffect } from 'react';
import toast from 'react-hot-toast';

/**
 * Hook for reading contract data
 */
export function useShmooContractRead() {
  // Total supply
  const { data: totalSupply, isLoading: totalSupplyLoading } = useReadContract({
    address: SHMOO_CONTRACT_ADDRESS,
    abi: SHMOO_POINT_ABI,
    functionName: 'totalSupply',
  });

  // Check if address has minted (requires address)
  const useHasMinted = (address?: Address) => {
    return useReadContract({
      address: SHMOO_CONTRACT_ADDRESS,
      abi: SHMOO_POINT_ABI,
      functionName: 'hasAddressMinted',
      args: address ? [address] : undefined,
      query: {
        enabled: !!address,
      },
    });
  };

  // Get user's balance (requires address)
  const useBalance = (address?: Address) => {
    return useReadContract({
      address: SHMOO_CONTRACT_ADDRESS,
      abi: SHMOO_POINT_ABI,
      functionName: 'balanceOf',
      args: address ? [address] : undefined,
      query: {
        enabled: !!address,
      },
    });
  };

  // Get mint timestamp for a token (requires tokenId)
  const useMintTimestamp = (tokenId?: bigint) => {
    return useReadContract({
      address: SHMOO_CONTRACT_ADDRESS,
      abi: SHMOO_POINT_ABI,
      functionName: 'getMintTimestamp',
      args: tokenId !== undefined ? [tokenId] : undefined,
      query: {
        enabled: tokenId !== undefined,
      },
    });
  };

  return {
    totalSupply: totalSupply as bigint | undefined,
    totalSupplyLoading,
    useHasMinted,
    useBalance,
    useMintTimestamp,
  };
}

/**
 * Hook for minting Shmoo Points
 */
export function useShmooMint() {
  const { setMintState, resetMintState, addNotification } = useShmooStore();
  
  const { 
    writeContract, 
    data: hash, 
    error: writeError,
    isPending: isWritePending 
  } = useWriteContract();
  
  const { 
    isLoading: isConfirming, 
    isSuccess: isConfirmed,
    error: receiptError 
  } = useWaitForTransactionReceipt({
    hash,
  });

  // Update mint state based on transaction status
  useEffect(() => {
    if (isWritePending) {
      setMintState({
        isLoading: true,
        error: null,
        isSuccess: false,
      });
    }
  }, [isWritePending, setMintState]);

  useEffect(() => {
    if (isConfirming && hash) {
      setMintState({
        isLoading: true,
        transactionHash: hash,
        error: null,
      });
    }
  }, [isConfirming, hash, setMintState]);

  useEffect(() => {
    if (isConfirmed && hash) {
      setMintState({
        isLoading: false,
        isSuccess: true,
        transactionHash: hash,
        error: null,
      });
      
      addNotification({
        type: 'success',
        message: 'Shmoo Point minted successfully! 🎉',
      });
      
      toast.success('Shmoo Point minted successfully! 🎉');
    }
  }, [isConfirmed, hash, setMintState, addNotification]);

  useEffect(() => {
    const error = writeError || receiptError;
    if (error) {
      const errorMessage = formatError(error);
      setMintState({
        isLoading: false,
        isSuccess: false,
        error: errorMessage,
      });
      
      addNotification({
        type: 'error',
        message: errorMessage,
      });
      
      toast.error(errorMessage);
    }
  }, [writeError, receiptError, setMintState, addNotification]);

  const mint = useCallback(async () => {
    try {
      resetMintState();
      
      await writeContract({
        address: SHMOO_CONTRACT_ADDRESS,
        abi: SHMOO_POINT_ABI,
        functionName: 'mint',
      });
    } catch (error) {
      const errorMessage = formatError(error);
      setMintState({
        isLoading: false,
        isSuccess: false,
        error: errorMessage,
      });
      
      addNotification({
        type: 'error',
        message: errorMessage,
      });
      
      toast.error(errorMessage);
    }
  }, [writeContract, resetMintState, setMintState, addNotification]);

  return {
    mint,
    isLoading: isWritePending || isConfirming,
    isSuccess: isConfirmed,
    error: writeError || receiptError,
    transactionHash: hash,
  };
}

/**
 * Hook for getting user's Shmoo Point data
 */
export function useUserShmooData(address?: Address) {
  const { useHasMinted, useBalance } = useShmooContractRead();
  
  const { data: hasMinted, isLoading: hasMintedLoading } = useHasMinted(address);
  const { data: balance, isLoading: balanceLoading } = useBalance(address);

  return {
    hasMinted: hasMinted as boolean | undefined,
    balance: balance as bigint | undefined,
    isLoading: hasMintedLoading || balanceLoading,
  };
}
