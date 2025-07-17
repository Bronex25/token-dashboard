'use client';

import type { ColumnDef } from '@tanstack/react-table';

export type TransactionData = {
  symbol: string;
  balance: string;
  price: string;
  value: string;
};

export const columns: ColumnDef<TransactionData>[] = [
  {
    accessorKey: 'price',
    header: () => <div className="text-right font-bold">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('price'));
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
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
