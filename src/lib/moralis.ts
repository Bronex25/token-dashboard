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
];

export async function getAllTokens(address: string) {
  const allTokens: Token[] = [];

  for (const chain of supportedChains) {
    try {
      const tokenRes = await Moralis.EvmApi.wallets.getWalletTokenBalancesPrice(
        {
          address,
          chain,
        },
      );
      const formated = tokenRes.result.map(token => {
        return {
          tokenAddress: token.tokenAddress?.lowercase ?? '',
          name: token.name,
          symbol: token.symbol,
          logo: token.logo,
          thumbnail: token.thumbnail,
          decimals: token.decimals,
          chain: chain.name,
          balanceFormatted:
            +token.balanceFormatted > 1
              ? (+token.balanceFormatted).toPrecision(3)
              : (+token.balanceFormatted).toFixed(8),
          usdPrice: (+token.usdPrice).toFixed(2),
          usdValue: (+token.usdValue).toFixed(2),
        };
      });
      allTokens.push(...formated);
    } catch (error) {
      console.error(`Failed on chain ${chain.name}:`, error);
    }
  }

  return allTokens;
}
