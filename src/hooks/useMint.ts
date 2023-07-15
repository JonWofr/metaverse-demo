import { abi } from '@/utils/abis/ditem';
import { useState, useEffect } from 'react';
import { parseEther } from 'viem';
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useAccount,
} from 'wagmi';

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
if (!contractAddress)
  throw new Error('Missing environment variable NEXT_PUBLIC_CONTRACT_ADDRESS');

export type TransactionStatus =
  | 'idle'
  | 'confirming'
  | 'minting'
  | 'error'
  | 'success';

export const useMint = () => {
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: contractAddress as `0x${string}`,
    abi,
    functionName: 'publicMint',
    args: [BigInt(1)],
    // Heymint takes 0.1 MATIC on each mint as a fee + the price for the NFT (0.0001 MATIC)
    value: parseEther('0.1001'),
  });
  const { data, error, isError, write } = useContractWrite(config);
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  const { isConnected } = useAccount();
  const [transactionStatus, setTransactionStatus] =
    useState<TransactionStatus>('idle');

  useEffect(() => {
    if (isLoading) {
      setTransactionStatus('minting');
    } else if (isSuccess) {
      setTransactionStatus('success');
    } else if (isPrepareError || isError) {
      console.error((prepareError || error)?.message);
      setTransactionStatus('error');
    }
  }, [isLoading, isSuccess, isPrepareError, isError, error, prepareError]);

  useEffect(() => {
    // When a user disconnects the state should be reset
    if (!isConnected && transactionStatus !== 'idle') {
      setTransactionStatus('idle');
    }
  }, [isConnected, transactionStatus]);

  return {
    transactionStatus,
    setTransactionStatus,
    mint: write,
  };
};
