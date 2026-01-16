import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllTokens, getAllTransactions } from '@/lib/moralis';
import { normalizeTx } from '@/utils/normalizeTx';
import { useEffect } from 'react';

export const useWalletTokens = (address?: string) =>
  useQuery({
    queryKey: ['walletTokens', address],
    queryFn: () => getAllTokens(address!),
    enabled: !!address,
    staleTime: 60_000,
  });

export const useWalletTransactions = (address?: string) =>
  useQuery({
    queryKey: ['walletTransactions', address],
    queryFn: () => getAllTransactions(address!),
    enabled: !!address,
    staleTime: 60_000,
    select: data =>
      (data as unknown[]).map(t => normalizeTx(t as Record<string, unknown>)),
  });

export const usePrefetchWalletData = (address?: string) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!address) return;

    queryClient.prefetchQuery({
      queryKey: ['walletTokens', address],
      queryFn: () => getAllTokens(address),
      staleTime: 60_000,
    });

    queryClient.prefetchQuery({
      queryKey: ['walletTransactions', address],
      queryFn: () => getAllTransactions(address),
      staleTime: 60_000,
    });
  }, [address, queryClient]);
};
