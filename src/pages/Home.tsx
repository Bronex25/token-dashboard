import { Card } from '@/components/shared/Card';
import { HomeTokensTable } from '@/components/home_page/HomeTokenTable';
import { SkeletonCard } from '@/components/skeletons/SkeletonCard';
import { SmTokenCard } from '@/components/shared/SmTokenCard';
import { TrendingIcon } from '@/components/shared/TrendingIcon';
import { tokenColumns } from '@/components/shadcn_ui/Tables/HomeTokensColumns';
import { useMemo } from 'react';
import { SmTokenCardSkeleton } from '@/components/skeletons/SmTokenCardSkeleton';
import { Skeleton } from '@/components/shadcn_ui/skeleton';
import ErrorPage from './ErrorPage';
import { useHomeData } from '@/hooks/useHomeData';
import NewsTable from '@/components/home_page/NewsTable';
import { formatToUsd } from '@/utils/usdFormatter';

export const Home: React.FC = () => {
  const { tokens, news, global, trending } = useHomeData();

  const gainers = useMemo(
    () =>
      [...(tokens.data || [])]
        .sort(
          (a, b) =>
            b.price_change_percentage_24h - a.price_change_percentage_24h,
        )
        .slice(0, 5),
    [tokens.data],
  );

  const topTenTokens = useMemo(
    () => (tokens.data ? tokens.data.slice(0, 10) : []),
    [tokens],
  );

  if (tokens.error || global.error || trending.error || news.error) {
    return (
      <ErrorPage
        error={tokens.error || global.error || trending.error || news.error}
      />
    );
  }

  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl font-semibold md:text-4xl text-center mt-6">
          Cryptocurrency Market Overview
        </h1>
        {global.isLoading || !global.data ? (
          <Skeleton className="w-[50%] h-3" />
        ) : (
          <p className="text-medium lg:text-lg max-w-full flex flex-wrap gap-2">
            The global cryptocurrency market cap today is{' '}
            {formatToUsd(
              global?.data.data.total_market_cap.usd.toString() || '0',
              true,
            )}
            , a{' '}
            <TrendingIcon
              data={global.data.data.market_cap_change_percentage_24h_usd || 0}
            />{' '}
            change in the last 24 hours.
          </p>
        )}
      </div>

      <section className="flex gap-2 flex-col md:flex-row w-full">
        <div className="flex gap-2 flex-1/4 md:flex-col">
          {global.isLoading || !global.data ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : (
            <>
              <Card
                title={formatToUsd(
                  global.data?.data.total_market_cap.usd.toString(),
                )}
                cardClassName="gap-2 p-4 md:h-[50%] w-full"
                titleClassName="lg:text-lg md:text-medium text-sm font-semibold "
                headerClassName="px-0"
                contentClassName="p-0"
              >
                <div className="flex items-center gap-2">
                  <p className="text-gray-500 font-medium text-sm dark:text-gray-400">
                    Market Cap
                  </p>
                  <TrendingIcon
                    data={global.data.data.market_cap_change_percentage_24h_usd}
                  ></TrendingIcon>
                </div>
              </Card>

              <Card
                title={formatToUsd(
                  global.data.data.total_volume.usd.toString(),
                )}
                cardClassName="gap-2 p-4 md:h-[50%] w-full"
                headerClassName="px-0"
                titleClassName="lg:text-lg text-medium font-semibold "
                contentClassName="p-0"
              >
                <p className="text-gray-500 font-medium text-sm dark:text-gray-400">
                  24h Trading Volume
                </p>
              </Card>
            </>
          )}
        </div>

        <Card
          title="🔥 Trending"
          cardClassName="p-4 justify-between gap-0 flex-2/5"
          headerClassName="px-0"
          contentClassName="flex flex-col gap-0 px-0"
          titleClassName="text-lg font-semibold"
        >
          {trending.isLoading || !trending.data
            ? Array.from({ length: 5 }).map((_, i) => (
                <SmTokenCardSkeleton key={i} />
              ))
            : trending.data.map(token => (
                <SmTokenCard
                  id={token.item.id}
                  name={token.item.name}
                  image={token.item.small}
                  current_price={token.item.data.price}
                  price_change_percentage_24h={
                    token.item.data.price_change_percentage_24h.usd
                  }
                  key={token.item.id}
                />
              ))}
        </Card>
        <Card
          title="🚀 Top Gainers"
          cardClassName="flex-2/5 gap-0 p-4 justify-between"
          headerClassName="px-0"
          contentClassName="flex flex-col gap-0 px-0"
          titleClassName="text-lg font-semibold"
        >
          {tokens.isLoading
            ? Array.from({ length: 5 }).map((_, i) => (
                <SmTokenCardSkeleton key={i} />
              ))
            : gainers.map(token => (
                <SmTokenCard
                  id={token.id}
                  name={token.name}
                  image={token.image}
                  current_price={token.current_price}
                  price_change_percentage_24h={
                    token.price_change_percentage_24h
                  }
                  key={token.id}
                />
              ))}
        </Card>
      </section>

      <HomeTokensTable
        data={topTenTokens}
        columns={tokenColumns}
        isLoading={tokens.isLoading}
      ></HomeTokensTable>

      <NewsTable news={news.data} isLoading={news.isLoading}></NewsTable>
    </>
  );
};
