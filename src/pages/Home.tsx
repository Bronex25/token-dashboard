import { Card } from '@/components/Card';
import { HomeTokensTable } from '@/components/HomeTokenTable';
import { NewsCard } from '@/components/NewsCard';
import { SkeletonCard } from '@/components/SkeletonCard';
import { SmTokenCard } from '@/components/SmTokenCard';
import { TrendingIcon } from '@/components/TrendingIcon';
import { tokenColumns } from '@/components/ui/Tables/HomeTokensColumns';
import { useTokens } from '@/context/TokenContext';
import { useMemo } from 'react';

import { getGlobalMarketData, getTrendingTokens } from '@/lib/fetchCoinGecko';
import { getNews } from '@/lib/fetchNewsData';
import { fetchWithCache, formatToUsd } from '@/lib/utils';
import type { GlobalCryptoData } from '@/types/GlobalMarketData';
import type { NewsArticle } from '@/types/NewsArticle';
import type { TrendingCoin } from '@/types/TrendingCoin';
import { useEffect, useState } from 'react';

export const Home: React.FC = () => {
  const [globalMarketData, setGlobalMarketData] =
    useState<GlobalCryptoData | null>(null);
  const [trending, setTrending] = useState<TrendingCoin[]>([]);
  const [news, setNews] = useState<NewsArticle[]>([]);

  const { tokens, isLoading, error } = useTokens();

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [globalData, trendingTokens, news] = await Promise.all([
          fetchWithCache('globalData', getGlobalMarketData),
          fetchWithCache('trendingToken', getTrendingTokens),
          fetchWithCache('news', getNews),
        ]);
        setGlobalMarketData(globalData);
        setTrending(trendingTokens);
        setNews(news);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchAllData();
  }, []);

  const gainers = useMemo(
    () =>
      [...(tokens || [])]
        .sort(
          (a, b) =>
            b.price_change_percentage_24h - a.price_change_percentage_24h,
        )
        .slice(0, 5),
    [tokens],
  );

  const topTenTokens = useMemo(
    () => (tokens ? tokens.slice(0, 10) : []),
    [tokens],
  );

  const isDataLoading = isLoading || !tokens || !globalMarketData || !trending;

  if (error) return <div>Error occurred: {String(error)}</div>;

  if (isDataLoading) {
    return (
      <div className="container py-6 space-y-8">
        <div className="grid grid-cols-5 grid-rows-2 gap-2">
          {Array.from({ length: 5 }).map((_, idx) => (
            <SkeletonCard key={idx} />
          ))}
        </div>

        <section>
          <h1 className="text-2xl font-bold mb-4">Top 5</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Array.from({ length: 5 }).map((_, idx) => (
              <SkeletonCard key={idx} />
            ))}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="container flex flex-col gap-15">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-4xl text-center mt-6">
          Cryptocurrency Market Overview
        </h1>
        <div className="flex items-center gap-2">
          <span>
            The global cryptocurrency market cap today is{' '}
            {formatToUsd(
              globalMarketData.data.total_market_cap.usd.toString(),
              true,
            )}
            , a
          </span>
          <TrendingIcon
            data={globalMarketData.data.market_cap_change_percentage_24h_usd}
          />
          <span>change in the last 24 hours.</span>
        </div>
      </div>

      <section className="grid grid-cols-5 grid-rows-2 gap-2">
        <Card
          title={formatToUsd(
            globalMarketData.data.total_market_cap.usd.toString(),
          )}
          cardClassName="w-full col-span-1 row-span-1 gap-2 p-4"
          titleClassName="text-lg font-semibold"
          headerClassName="px-0"
          contentClassName="p-0"
        >
          <div className="flex items-center gap-2">
            <p className="text-gray-500 font-medium text-sm dark:text-gray-400">
              Market Cap
            </p>
            <TrendingIcon
              data={globalMarketData.data.market_cap_change_percentage_24h_usd}
            ></TrendingIcon>
          </div>
        </Card>

        <Card
          title={formatToUsd(globalMarketData.data.total_volume.usd.toString())}
          cardClassName="col-span-1 row-start-2 gap-2 p-4"
          headerClassName="px-0"
          titleClassName="text-lg font-semibold "
          contentClassName="p-0"
        >
          <p className="text-gray-500 font-medium text-sm dark:text-gray-400">
            24h Trading Volume
          </p>
        </Card>

        <Card
          title="🔥 Trending"
          cardClassName="col-start-2 row-span-2 col-span-2 p-4 justify-between gap-0"
          headerClassName="px-0"
          contentClassName="flex flex-col gap-0 px-0"
          titleClassName="text-lg font-semibold"
        >
          {trending.map(token => (
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
          cardClassName="col-start-4 row-span-2 col-span-2 gap-0 p-4 justify-between"
          headerClassName="px-0"
          contentClassName="flex flex-col gap-0 px-0"
          titleClassName="text-lg font-semibold"
        >
          {gainers.length > 0 ? (
            gainers.map(token => (
              <SmTokenCard
                id={token.id}
                name={token.name}
                image={token.image}
                current_price={token.current_price}
                price_change_percentage_24h={token.price_change_percentage_24h}
                key={token.id}
              />
            ))
          ) : (
            <p>Loading top gainers...</p>
          )}
        </Card>
      </section>

      <section>
        <h1 className="text-2xl font-medium mb-10 text-center">
          Top 10 Cryptocurrencies{' '}
        </h1>
        <HomeTokensTable
          data={topTenTokens}
          columns={tokenColumns}
        ></HomeTokensTable>
      </section>

      <section>
        <h1 className="text-2xl font-medium mb-10 text-center">
          Last Crypto News
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
          {news.length > 0 ? (
            news.map(article => (
              <NewsCard
                title={article.title}
                key={article.article_id}
                author={
                  article.creator && article.creator.length > 0
                    ? article.creator[0]
                    : 'Unknown'
                }
                imageUrl={article.image_url}
                publishedAt={article.pubDate}
                url={article.link}
              />
            ))
          ) : (
            <p>Loading news...</p>
          )}
        </div>
      </section>
    </div>
  );
};
