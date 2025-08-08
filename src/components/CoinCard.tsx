'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';
import { TrendingIcon } from './TrendingIcon';
import { formatToUsd } from '@/lib/utils';
import { TooltipWrapper } from './TooltipWrapper';

type CoinCardProps = {
  coin: {
    id: string;
    name: string;
    symbol: string;
    image: string;
    market_cap_rank: number;
    current_price: number;
    price_change_percentage_24h: number;
    sparkline_in_7d: { price: number[] };
    high_24h: number;
    low_24h: number;
    market_cap: number;
    total_volume: number;
  };
};

export function CoinCard({ coin }: CoinCardProps) {
  const isPositive = coin.price_change_percentage_24h >= 0;
  const trendColor = isPositive ? '#22c55e' : '#ef4444';

  return (
    <Card className="hover:shadow-xl transition-all duration-200 group w-full gap-3 justify-between">
      <CardHeader className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src={coin.image}
            alt={coin.name}
            className="w-7 h-7 rounded-full object-fit"
          />
          <CardTitle className="text-base font-semibold">
            <TooltipWrapper content={coin.name} className="bg-white">
              <h2 className="max-w-[140px] truncate text-base font-semibold">
                {coin.name}
              </h2>
            </TooltipWrapper>

            <p className="text-xs text-gray-300">{coin.symbol.toUpperCase()}</p>
          </CardTitle>
        </div>
        <div className="bg-muted rounded-full text-xs px-2 py-0.5 text-muted-foreground">
          #{coin.market_cap_rank}
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="text-lg font-bold cursor-help">
                ${coin.current_price.toLocaleString()}
              </span>
            </TooltipTrigger>
            <TooltipContent className="text-xs p-2 bg-amber-50">
              <p>High 24h: ${coin.high_24h}</p>
              <p>Low 24h: ${coin.low_24h}</p>
            </TooltipContent>
          </Tooltip>

          <TrendingIcon data={coin.price_change_percentage_24h}></TrendingIcon>
        </div>
        <div className="flex justify-between text-sm font-medium">
          <span>Market Cap</span>
          <span>{formatToUsd(coin.market_cap.toString())}</span>
        </div>
        <div className="flex justify-between text-sm font-medium">
          <span>Total Volume</span>
          <span>{formatToUsd(coin.total_volume.toString())}</span>
        </div>
        <ResponsiveContainer width="100%" height={60}>
          <LineChart
            data={coin.sparkline_in_7d.price.map((value, index) => ({
              index,
              value,
            }))}
          >
            <YAxis
              hide={true}
              domain={[
                (min: number) => min - min * 0.005,
                (max: number) => max + max * 0.005,
              ]}
            />
            <Line
              type="linear"
              dataKey="value"
              stroke={trendColor}
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
