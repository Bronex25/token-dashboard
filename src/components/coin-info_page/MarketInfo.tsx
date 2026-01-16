import React from 'react';
import type { TokenById } from '@/types/TokenById';
import { Card } from '@/components/shared/Card';
import { formatPercentage } from '@/utils/percentageFormatter';
import { formatToUsd } from '@/utils/usdFormatter';
import { cn } from '@/utils/classNameMerger';

type MarketInfoProps = {
  token: TokenById;
};

type MarketStat = {
  label: string;
  value: string;
  isPercentage?: boolean;
  isPositive?: boolean;
};

export const MarketInfo: React.FC<MarketInfoProps> = ({ token }) => {
  const stats: MarketStat[] = [
    {
      label: 'Current Price',
      value: formatToUsd(token.market_data.current_price.usd.toString()),
    },
    {
      label: 'Market Cap',
      value: formatToUsd(token.market_data.market_cap.usd.toString()),
    },
    {
      label: '24h Volume',
      value: formatToUsd(token.market_data.total_volume.usd.toString()),
    },
    {
      label: '24h Change',
      value: formatPercentage(token.market_data.price_change_percentage_24h),
      isPercentage: true,
      isPositive: token.market_data.price_change_percentage_24h >= 0,
    },
    {
      label: '7d Change',
      value: formatPercentage(
        token.market_data.price_change_percentage_7d || 0,
      ),
      isPercentage: true,
      isPositive: (token.market_data.price_change_percentage_7d || 0) >= 0,
    },
    {
      label: '30d Change',
      value: formatPercentage(
        token.market_data.price_change_percentage_30d || 0,
      ),
      isPercentage: true,
      isPositive: (token.market_data.price_change_percentage_30d || 0) >= 0,
    },
  ];

  return (
    <Card
      title="Market Information"
      contentClassName="px-6"
      titleClassName="text-2xl font-semibold"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map(stat => (
          <div key={stat.label} className="space-y-2">
            <p className="text-sm text-muted-foreground font-medium">
              {stat.label}
            </p>
            <p
              className={cn(
                'text-2xl font-bold',
                stat.isPercentage &&
                  (stat.isPositive ? 'text-green-500' : 'text-red-500'),
              )}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
};
