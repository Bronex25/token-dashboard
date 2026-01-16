import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMarketChart } from '@/hooks/useMarketChart';
import { CoinHeader } from '@/components/coin-info_page/CoinHeader';
import { CoinChart } from '@/components/coin-info_page/CoinChart';
import { MarketInfo } from '@/components/coin-info_page/MarketInfo';
import { CoinDescription } from '@/components/coin-info_page/CoinDescription';
import { CoinInfoSkeleton } from '@/components/skeletons/CoinInfoSkeleton';
import ErrorPage from './ErrorPage';
import type { Range } from '@/utils/dateFormatter';
import { useQuery } from '@tanstack/react-query';
import { getTokenById } from '@/lib/fetchCoinGecko';

export const CoinInfo: React.FC = () => {
  const { tokenId } = useParams();
  const [selectedRange, setSelectedRange] = useState<Range>('7d');

  if (!tokenId) return;

  const {
    data: tokenData,
    error: tokenError,
    isLoading: isTokenLoading,
  } = useQuery({
    queryKey: [tokenId],
    queryFn: () => getTokenById(tokenId),
    staleTime: 5 * 60 * 1000,
  });

  const {
    chartData,
    error: chartError,
    isLoading: isChartLoading,
  } = useMarketChart(tokenId, selectedRange);

  const error = tokenError || chartError;

  if (error) {
    return <ErrorPage error={error} />;
  }

  if (isTokenLoading || !tokenData) {
    return <CoinInfoSkeleton />;
  }

  const isPositive =
    selectedRange === '90d'
      ? tokenData.market_data.price_change_percentage_60d >= 0
      : tokenData.market_data[`price_change_percentage_${selectedRange}`] >= 0;

  return (
    <>
      <CoinHeader token={tokenData} />
      <CoinChart
        chartData={chartData}
        selectedRange={selectedRange}
        onRangeChange={setSelectedRange}
        isPositive={isPositive}
        isLoading={isChartLoading}
      />
      <MarketInfo token={tokenData} />
      <CoinDescription token={tokenData} />
    </>
  );
};
