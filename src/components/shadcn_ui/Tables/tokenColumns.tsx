'use client';

import type {
  CellContext,
  ColumnDef,
  HeaderContext,
} from '@tanstack/react-table';
import { Button } from '../button';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import { formatTokenBalance, formatToUsd } from '@/lib/utils';

export type TokenData = {
  symbol: string;
  balance: string;
  price: string;
  value: number;
  logo?: string;
};

const headerWithSort = (label: string) => {
  return (context: HeaderContext<TokenData, unknown>) => {
    const sort = context.column.getIsSorted();
    return (
      <Button
        variant="ghost"
        onClick={() =>
          context.column.toggleSorting(context.column.getIsSorted() === 'asc')
        }
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
  return ({ row }: CellContext<TokenData, unknown>) => {
    return (
      <div className="text-left font-medium">
        {formatToUsd(row.getValue(key))}
      </div>
    );
  };
};

export const tokenColumns: ColumnDef<TokenData>[] = [
  {
    accessorKey: 'symbol',
    header: headerWithSort('Symbol'),
    cell: ({ row }) => {
      const logo = row.original.logo;
      return (
        <div className="font-medium flex items-center gap-1">
          <img
            src={logo || 'public/tokenFallback.svg'}
            alt="Token img"
            className="w-5 h-5"
          />
          {row.getValue('symbol')}
        </div>
      );
    },
  },
  {
    accessorKey: 'balance',
    header: headerWithSort('Balance'),
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">
          {formatTokenBalance(row.getValue('balance'))}
        </div>
      );
    },
  },
  {
    accessorKey: 'price',
    header: headerWithSort('Price'),
    cell: formattedCurrencyCell('price'),
  },
  {
    accessorKey: 'value',
    header: headerWithSort('Value'),
    cell: formattedCurrencyCell('value'),
  },
];
