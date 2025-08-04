import type { GlobalCryptoData } from '@/types/GlobalMarketData';
import type { TokenCoinGecko } from '@/types/TokenCoinGecko';
import type { TrendingCoin } from '@/types/TrendingCoin';

type responseTranding = {
  coins: TrendingCoin[];
};

export async function fetchCoinGecko<T>(
  endpoint: string,
  params: Record<string, string> = {},
): Promise<T> {
  const url = new URL(`https://api.coingecko.com/api/v3/${endpoint}`);

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });

  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error(`CoinGecko API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export async function getTokens(page: string = '1'): Promise<TokenCoinGecko[]> {
  return fetchCoinGecko<TokenCoinGecko[]>('coins/markets', {
    vs_currency: 'usd',
    order: 'market_cap_desc',
    per_page: '100',
    page: page,
    sparkline: 'true',
  });
}

export async function getTopGainers(
  page: string = '1',
): Promise<TokenCoinGecko[]> {
  return fetchCoinGecko<TokenCoinGecko[]>('coins/markets', {
    vs_currency: 'usd',
    order: 'price_change_percentage_24h_desc',
    per_page: '5',
    page: page,
    sparkline: 'true',
  });
}

export async function getTrendingTokens(): Promise<TrendingCoin[]> {
  const res = await fetchCoinGecko<responseTranding>('search/trending');

  return res.coins.slice(0, 5);
}

export async function getGlobalMarketData(): Promise<GlobalCryptoData> {
  return fetchCoinGecko('global');
}
