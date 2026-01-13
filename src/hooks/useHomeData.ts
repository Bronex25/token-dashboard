import {
  getGlobalMarketData,
  getTokens,
  getTrendingTokens,
} from '@/lib/fetchCoinGecko';
import { getNews } from '@/lib/fetchNewsData';
import { useQuery } from '@tanstack/react-query';

export const useHomeData = () => ({
  global: useQuery({
    queryKey: ['globalData'],
    queryFn: getGlobalMarketData,
    staleTime: 5 * 60 * 1000,
  }),
  trending: useQuery({
    queryKey: ['trendingTokens'],
    queryFn: getTrendingTokens,
    staleTime: 5 * 60 * 1000,
  }),
  news: useQuery({
    queryKey: ['news'],
    queryFn: getNews,
    staleTime: 5 * 60 * 1000,
  }),
  tokens: useQuery({
    queryKey: ['tokens'],
    queryFn: () => getTokens('1'),
    staleTime: 5 * 60 * 1000,
  }),
});
