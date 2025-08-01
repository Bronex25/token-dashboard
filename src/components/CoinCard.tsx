'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { TrendingIcon } from './TrendingIcon';

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
    <Card className="hover:shadow-xl transition-all duration-200 group w-full">
      <CardHeader className="flex items-center justify-between pb-2">
        <div className="flex items-center gap-4">
          <img
            src={coin.image}
            alt={coin.name}
            className="w-7 h-7 rounded-full object-fit"
          />
          <CardTitle className="text-base font-semibold">
            <h2>{coin.name}</h2>
            <p className="text-xs text-gray-300">{coin.symbol.toUpperCase()}</p>
          </CardTitle>
        </div>
        <div className="bg-muted rounded-full text-xs px-2 py-0.5 text-muted-foreground">
          #{coin.market_cap_rank}
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-2">
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
        <span>{coin.market_cap}</span>
        <span>{coin.total_volume}</span>
        <ResponsiveContainer width="100%" height={60}>
          <LineChart
            data={coin.sparkline_in_7d.price.map((value, index) => ({
              index,
              value,
            }))}
          >
            <Line
              type="step"
              dataKey="value"
              stroke={trendColor}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
