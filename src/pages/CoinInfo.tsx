import { getMarketChart, getTokenById } from '@/lib/fetchCoinGecko';
import type { TokenById } from '@/types/TokenById';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/Card';
import { cn, formatToUsd } from '@/lib/utils';
import { useTheme } from '@/components/ui/themeProvider';
import { TrendingIcon } from '@/components/TrendingIcon';

export type Range = '7d' | '30d' | '90d' | '1y';

const formatDate = (timestamp: number, range: Range): string => {
  const date = new Date(timestamp);

  switch (range) {
    case '7d':
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    case '30d':
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
    case '90d':
    case '1y':
      return date.toLocaleDateString('en-US', {
        month: 'short',
        year: '2-digit',
      });
    default:
      return date.toLocaleDateString();
  }
};

const formatPercentage = (value: number): string => {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
};

export const CoinInfo: React.FC = () => {
  const { tokenId } = useParams();
  const { theme } = useTheme();
  const [token, setToken] = useState<TokenById | null>(null);
  const [error, setError] = useState(false);
  const [selectedRange, setSelectedRange] = useState<Range>('7d');
  const [chartData, setChartData] = useState<
    { time: string; price: number; timestamp: number }[]
  >([]);

  // Theme-aware colors
  const isDark =
    theme === 'dark' ||
    (theme === 'system' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches);
  const textColor = isDark ? '#e5e7eb' : '#374151';
  const gridColor = isDark ? '#374151' : '#e5e7eb';
  const positiveColor = '#10b981';
  const negativeColor = '#ef4444';

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
            time: formatDate(timestamp, selectedRange),
            price,
            timestamp,
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
      <div className="container mx-auto px-4 py-8">
        <div className="p-4 text-red-500 text-center">
          Something went wrong. Please try again.
        </div>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="container mx-auto px-4 py-8 space-y-6">
        <Skeleton className="h-12 w-1/2 mx-auto" />
        <Skeleton className="h-6 w-1/3 mx-auto" />
        <Skeleton className="h-[400px] w-full" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-20 w-full" />
          ))}
        </div>
      </div>
    );
  }

  const isPositive = token.market_data.price_change_percentage_24h >= 0;

  return (
    <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mt-5">
        <div className="flex items-center gap-3">
          <img
            src={token.image.large}
            alt={`${token.name} image`}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              {token.name} ({token.symbol.toUpperCase()})
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              #{token.market_cap_rank} by Market Cap
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <p className="text-2xl sm:text-3xl font-bold">
            {formatToUsd(token.market_data.current_price.usd.toString())}
          </p>
          <TrendingIcon
            data={token.market_data.price_change_percentage_24h}
          ></TrendingIcon>
        </div>
      </div>

      {/* Chart Section */}
      <Card contentClassName="p-6">
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {(['7d', '30d', '90d', '1y'] as Range[]).map(range => (
            <Button
              key={range}
              className={cn(
                'min-w-[60px] transition-all duration-200',
                selectedRange === range
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'hover:bg-muted',
              )}
              variant={selectedRange === range ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedRange(range)}
            >
              {range}
            </Button>
          ))}
        </div>

        <div className="w-full h-[350px] sm:h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={gridColor}
                opacity={0.3}
              />
              <XAxis
                dataKey="time"
                stroke={textColor}
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tick={{ fill: textColor }}
              />
              <YAxis
                domain={['auto', 'auto']}
                stroke={textColor}
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tick={{ fill: textColor }}
                tickFormatter={value => formatToUsd(value)}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? '#1f2937' : '#ffffff',
                  border: `1px solid ${gridColor}`,
                  borderRadius: '8px',
                  color: textColor,
                }}
                formatter={(value: number) => [
                  formatToUsd(value.toString()),
                  'Price',
                ]}
                labelFormatter={label => `Date: ${label}`}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke={isPositive ? positiveColor : negativeColor}
                strokeWidth={3}
                dot={false}
                activeDot={{
                  r: 6,
                  strokeWidth: 2,
                  stroke: isPositive ? positiveColor : negativeColor,
                }}
                fill={isPositive ? positiveColor : negativeColor}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Market Info Section */}
      <Card title="Market Information" contentClassName="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground font-medium">
              Current Price
            </p>
            <p className="text-2xl font-bold">
              {formatToUsd(token.market_data.current_price.usd.toString())}
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground font-medium">
              Market Cap
            </p>
            <p className="text-2xl font-bold">
              {formatToUsd(token.market_data.market_cap.usd.toString())}
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground font-medium">
              24h Volume
            </p>
            <p className="text-2xl font-bold">
              {formatToUsd(token.market_data.total_volume.usd.toString())}
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground font-medium">
              24h Change
            </p>
            <p
              className={cn(
                'text-2xl font-bold',
                isPositive ? 'text-green-500' : 'text-red-500',
              )}
            >
              {formatPercentage(token.market_data.price_change_percentage_24h)}
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground font-medium">
              7d Change
            </p>
            <p
              className={cn(
                'text-2xl font-bold',
                (token.market_data.price_change_percentage_7d || 0) >= 0
                  ? 'text-green-500'
                  : 'text-red-500',
              )}
            >
              {formatPercentage(
                token.market_data.price_change_percentage_7d || 0,
              )}
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground font-medium">
              30d Change
            </p>
            <p
              className={cn(
                'text-2xl font-bold',
                (token.market_data.price_change_percentage_30d || 0) >= 0
                  ? 'text-green-500'
                  : 'text-red-500',
              )}
            >
              {formatPercentage(
                token.market_data.price_change_percentage_30d || 0,
              )}
            </p>
          </div>
        </div>
      </Card>

      {/* Description Section */}
      {token.description?.en && (
        <Card title="About" contentClassName="p-6">
          <div
            className="prose prose-sm max-w-none text-muted-foreground leading-relaxed"
            dangerouslySetInnerHTML={{ __html: token.description.en }}
          />
        </Card>
      )}
    </>
  );
};
