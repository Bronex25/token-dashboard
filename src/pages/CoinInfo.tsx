import { getMarketChart, getTokenById } from '@/lib/fetchCoinGecko';
import type { TokenById } from '@/types/TokenById';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { Button } from '@/components/ui/button';

export type Range = '7d' | '30d' | '90d' | '1y';

export const CoinInfo: React.FC = () => {
  const { tokenId } = useParams();
  const [token, setToken] = useState<TokenById | null>(null);
  const [error, setError] = useState(false);
  const [selectedRange, setSelectedRange] = useState<Range>('7d');
  const [chartData, setChartData] = useState<{ time: string; price: number }[]>(
    [],
  );

  useEffect(() => {
    if (!tokenId) return;

    setError(false);
    const fetchToken = async () => {
      try {
        const fetchedToken = await getTokenById(tokenId);
        setToken(fetchedToken);
      } catch (error) {
        setError(true);
        console.error('Failed to fetch token by ID:', error);
      }
    };

    const fetchChart = async () => {
      try {
        const data = await getMarketChart(tokenId, selectedRange);
        const formatted = (data.prices as [number, number][]).map(
          ([timestamp, price]) => ({
            time: new Date(timestamp).toLocaleDateString(),
            price,
          }),
        );
        setChartData(formatted);
      } catch (err) {
        setError(true);
        console.error('Failed to fetch market chart:', err);
      }
    };

    fetchToken();
    fetchChart();
  }, [tokenId, selectedRange]);

  if (error) {
    return (
      <div className="p-4 text-red-500">
        Something went wrong. Please try again.
      </div>
    );
  }

  if (!token) {
    return (
      <div className="p-4 space-y-4">
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-[200px] w-full" />
      </div>
    );
  }

  const isPositive = token.market_data.price_change_percentage_24h >= 0;

  return (
    <div className="p-6 space-y-8 max-w-5xl mx-auto">
      <Card>
        <CardHeader className="flex flex-col items-center space-y-2">
          <CardTitle className="text-3xl font-bold flex items-center">
            <img
              src={token.image.large}
              alt={`${token.name} image`}
              className="w-12 h-12"
            />
            {token.name} ({token.symbol.toUpperCase()})
          </CardTitle>
          <p className="text-muted-foreground">
            Rank #{token.market_cap_rank ?? 'N/A'}
          </p>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-wrap justify-center gap-2">
            {['7d', '30d', '90d', '1y'].map(range => (
              <Button
                key={range}
                variant={selectedRange === range ? 'default' : 'outline'}
                size="lg"
                onClick={() => setSelectedRange(range as Range)}
              >
                {range}
              </Button>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <XAxis dataKey="time" hide />
              <YAxis domain={['auto', 'auto']} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="price"
                stroke={isPositive ? '#22c55e' : '#ef4444'}
                dot={false}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Market Info</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Current Price</p>
            <p className="font-semibold">
              $
              {token.market_data?.current_price?.usd?.toLocaleString() ?? 'N/A'}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Market Cap</p>
            <p className="font-semibold">
              ${token.market_data?.market_cap?.usd?.toLocaleString() ?? 'N/A'}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Total Volume</p>
            <p className="font-semibold">
              ${token.market_data?.total_volume?.usd?.toLocaleString() ?? 'N/A'}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Price Change (24h)</p>
            <p className={isPositive ? 'text-green-500' : 'text-red-500'}>
              {token.market_data?.price_change_percentage_24h?.toFixed(2) ??
                'N/A'}
              %
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Price Change (7d)</p>
            <p>
              {token.market_data?.price_change_percentage_7d?.toFixed(2) ??
                'N/A'}
              %
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Price Change (30d)</p>
            <p>
              {token.market_data?.price_change_percentage_30d?.toFixed(2) ??
                'N/A'}
              %
            </p>
          </div>
        </CardContent>
      </Card>

      {token.description?.en && (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Description</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className="prose prose-sm max-w-none text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: token.description.en }}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
};
