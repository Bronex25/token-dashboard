import React from 'react';
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { Button } from '@/components/shadcn_ui/button';
import { Card } from '@/components/Card';
import { cn, formatToUsd } from '@/lib/utils';
import { useTheme } from '@/components/shadcn_ui/themeProvider';
import type { Range } from '@/utils/dateFormatter';

type ChartDataPoint = {
  time: string;
  price: number;
  timestamp: number;
};

type CoinChartProps = {
  chartData: ChartDataPoint[];
  selectedRange: Range;
  onRangeChange: (range: Range) => void;
  isPositive: boolean;
  isLoading: boolean;
};

export const CoinChart: React.FC<CoinChartProps> = ({
  chartData,
  selectedRange,
  onRangeChange,
  isPositive,
  isLoading,
}) => {
  const { theme } = useTheme();

  const isDark =
    theme === 'dark' ||
    (theme === 'system' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches);
  const textColor = isDark ? '#e5e7eb' : '#374151';
  const gridColor = isDark ? '#374151' : '#e5e7eb';
  const positiveColor = '#10b981';
  const negativeColor = '#ef4444';

  const ranges: Range[] = ['7d', '30d', '90d', '1y'];

  return (
    <Card contentClassName="p-6">
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {ranges.map(range => (
          <Button
            key={range}
            className={cn(
              'min-w-[60px] transition-all duration-200 cursor-pointer border-gray-400',
              selectedRange === range
                ? 'bg-primary text-primary-foreground border-2 border-primary'
                : 'hover:bg-muted',
            )}
            variant={selectedRange === range ? 'default' : 'outline'}
            size="sm"
            onClick={() => onRangeChange(range)}
            disabled={isLoading}
          >
            {range}
          </Button>
        ))}
      </div>

      <div className="w-full h-[400px] sm:h-[400px]">
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
              padding={{ bottom: 20 }}
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
  );
};
