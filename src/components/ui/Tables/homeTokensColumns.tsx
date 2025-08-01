'use client';

import type {
  CellContext,
  ColumnDef,
  HeaderContext,
} from '@tanstack/react-table';
import { Button } from '../button';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import { formatToUsd } from '@/lib/utils';
import type { TokenCoinGecko } from '@/types/TokenCoinGecko';
import { TrendingIcon } from '@/components/TrendingIcon';
import { Line, LineChart, ResponsiveContainer, YAxis } from 'recharts';

const headerWithSort = (label: string) => {
  return (context: HeaderContext<TokenCoinGecko, unknown>) => {
    const sort = context.column.getIsSorted();
    return (
      <Button
        variant="ghost"
        onClick={() =>
          context.column.toggleSorting(context.column.getIsSorted() === 'asc')
        }
        className=" font-semibold text-left"
      >
        {label}
        {sort === false && <ArrowUpDown />}
        {sort === 'asc' && <ArrowUp />}
        {sort === 'desc' && <ArrowDown />}
      </Button>
    );
  };
};

const formattedCurrencyCell = (key: string) => {
  return ({ row }: CellContext<TokenCoinGecko, unknown>) => {
    return (
      <div className="text-left font-medium">
        {formatToUsd(row.getValue(key))}
      </div>
    );
  };
};

export const tokenColumns: ColumnDef<TokenCoinGecko>[] = [
  {
    accessorKey: 'market_cap_rank',
    header: headerWithSort('#'),
    cell: ({ row }) => {
      return (
        <div className="text-center font-medium">
          {row.getValue('market_cap_rank')}
        </div>
      );
    },
  },
  {
    accessorKey: 'name',
    header: headerWithSort('Name'),
    cell: ({ row }) => {
      const logo = row.original.image;
      return (
        <div className="font-medium flex items-center gap-1">
          <img
            src={logo || 'public/tokenFallback.svg'}
            alt="Token img"
            className="w-5 h-5"
          />
          {row.getValue('name')}
        </div>
      );
    },
  },
  {
    accessorKey: 'current_price',
    header: headerWithSort('Price'),
    cell: formattedCurrencyCell('current_price'),
  },
  {
    accessorKey: 'price_change_percentage_24h',
    header: headerWithSort('24h Change'),
    cell: ({ row }) => {
      const change: number = row.getValue('price_change_percentage_24h');
      return <TrendingIcon data={change}></TrendingIcon>;
    },
  },
  {
    accessorKey: 'total_volume',
    header: headerWithSort('Volume'),
    cell: formattedCurrencyCell('total_volume'),
  },
  {
    accessorKey: 'market_cap',
    header: headerWithSort('Market Cap'),
    cell: formattedCurrencyCell('market_cap'),
  },
  {
    accessorKey: 'fully_diluted_valuation',
    header: 'FDV',
    cell: formattedCurrencyCell('fully_diluted_valuation'),
  },
  {
    accessorKey: 'ath',
    header: 'ATH',
    cell: formattedCurrencyCell('ath'),
  },
  {
    accessorKey: 'sparkline_in_7d',
    header: 'Last 7d',
    cell: ({ row }) => {
      const sparkline = row.getValue('sparkline_in_7d') as
        | { price: number[] }
        | undefined;

      const trendColor =
        (row.getValue('price_change_percentage_24h') as number) >= 0
          ? '#22c55e'
          : '#ef4444';
      if (!sparkline || !Array.isArray(sparkline.price)) {
        return <div>No data</div>;
      }
      return (
        <ResponsiveContainer width="100%" height={60}>
          <LineChart
            data={sparkline.price.map((value: number, index: number) => ({
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
              type="monotone"
              dataKey="value"
              stroke={trendColor}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      );
    },
  },
];
