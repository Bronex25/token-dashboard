import Moralis from 'moralis';
import {
  EvmChain,
  EvmWalletHistoryTransaction,
} from '@moralisweb3/common-evm-utils';
import type { Token } from '@/types/Token';

Moralis.start({
  apiKey: import.meta.env.VITE_MORALIS_API_KEY,
});

const supportedChains = [
  EvmChain.ETHEREUM,
  EvmChain.BSC,
  EvmChain.POLYGON,
  EvmChain.ARBITRUM,
  EvmChain.BASE,
  EvmChain.OPTIMISM,
  EvmChain.FANTOM,
  EvmChain.AVALANCHE,
  EvmChain.POLYGON_AMOY,
];

export async function getAllTokens(address: string) {
  const allTokens: Token[] | null = [];

  for (const chain of supportedChains) {
    try {
      const tokenRes = await Moralis.EvmApi.wallets.getWalletTokenBalancesPrice(
        {
          address,
          chain,
          excludeSpam: true,
          excludeUnverifiedContracts: true,
        },
      );
      const formated = tokenRes.result
        .filter(token => token.balanceFormatted !== '0' && !token.possibleSpam)
        .map(token => {
          return {
            tokenAddress: token.tokenAddress?.lowercase ?? '',
            name: token.name,
            symbol:
              token.symbol === 'USDT' ? `USDT (${chain.name})` : token.symbol,
            logo: token.logo,
            thumbnail: token.thumbnail,
            decimals: token.decimals,
            chain: chain.name,
            balanceFormatted: token.balanceFormatted,
            usdPrice: token.usdPrice,
            usdValue: token.usdValue,
          };
        });
      allTokens.push(...formated);
    } catch (error) {
      console.error(`Failed on chain ${chain.name}:`, error);
    }
  }

  return allTokens;
}

export async function getAllTransactions(address: string) {
  const allTxs: EvmWalletHistoryTransaction[] = [];

  for (const chain of supportedChains) {
    try {
      const res = await Moralis.EvmApi.wallets.getWalletHistory({
        address,
        chain,
        order: 'DESC',
      });

      allTxs.push(...res.result);
    } catch (err) {
      console.error(`Failed to fetch transactions on ${chain.name}`, err);
    }
  }
  return allTxs;
}

export async function getAcountNetWorth(address: string) {
  const res = await Moralis.EvmApi.wallets.getWalletNetWorth({
    address,
    excludeSpam: true,
    excludeUnverifiedContracts: true,
  });
  return res.result.totalNetworthUsd;
}
