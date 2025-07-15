'use client';

import type { ColumnDef } from '@tanstack/react-table';

export type Token = {
  symbol: string;
  balance: string;
  price: string;
  value: string;
};

export const columns: ColumnDef<Token>[] = [
  {
    accessorKey: 'symbol',
    header: 'Symbol',
  },
  {
    accessorKey: 'balance',
    header: 'Balance',
  },
  {
    accessorKey: 'price',
    header: 'Price',
  },
  {
    accessorKey: 'value',
    header: 'Value',
  },
];
