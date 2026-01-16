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
];

export async function getAllTokens(address: string): Promise<Token[]> {
  const results = await Promise.allSettled(
    supportedChains.map(chain =>
      Moralis.EvmApi.wallets.getWalletTokenBalancesPrice({
        address,
        chain,
        excludeSpam: true,
        excludeUnverifiedContracts: true,
      }),
    ),
  );

  const tokenMap = new Map<string, Token>();

  results.forEach((result, index) => {
    if (result.status !== 'fulfilled') {
      console.error(
        `Failed to fetch tokens on ${supportedChains[index].name}`,
        result.reason,
      );
      return;
    }

    const chain = supportedChains[index];

    result.value.result
      .filter(t => t.balanceFormatted !== '0' && !t.possibleSpam)
      .forEach(token => {
        const key = `${chain.name}:${token.tokenAddress?.lowercase ?? ''}`;

        tokenMap.set(key, {
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
        });
      });
  });

  return Array.from(tokenMap.values());
}

export async function getAllTransactions(
  address: string,
): Promise<EvmWalletHistoryTransaction[]> {
  const results = await Promise.allSettled(
    supportedChains.map(chain =>
      Moralis.EvmApi.wallets.getWalletHistory({
        address,
        chain,
        order: 'DESC',
      }),
    ),
  );

  const allTxs: EvmWalletHistoryTransaction[] = [];

  results.forEach((result, index) => {
    if (result.status !== 'fulfilled') {
      console.error(
        `Failed to fetch transactions on ${supportedChains[index].name}`,
        result.reason,
      );
      return;
    }

    allTxs.push(...result.value.result);
  });

  return allTxs.sort(
    (a, b) =>
      new Date(b.blockTimestamp?.toString() ?? 0).getTime() -
      new Date(a.blockTimestamp?.toString() ?? 0).getTime(),
  );
}

export async function getAccountNetWorth(address: string): Promise<string> {
  const res = await Moralis.EvmApi.wallets.getWalletNetWorth({
    address,
    excludeSpam: true,
    excludeUnverifiedContracts: true,
  });

  return res.result.totalNetworthUsd;
}
