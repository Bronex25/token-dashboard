import Moralis from 'moralis';
import { EvmChain } from '@moralisweb3/common-evm-utils';
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
        },
      );
      const formated = tokenRes.result
        .filter(token => token.balanceFormatted !== '0' && !token.possibleSpam)
        .map(token => {
          return {
            tokenAddress: token.tokenAddress?.lowercase ?? '',
            name: token.name,
            symbol: token.symbol,
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

export async function getTransactions(address: string) {
  try {
    const transactions = await Moralis.EvmApi.transaction.getWalletTransactions(
      { address },
    );
  } catch (error) {}
}
