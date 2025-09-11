'use client';

import { CopyButton } from '@/components/CopyButton';
export type TransactionRow = {
  hash: string;
  fromAddress?: string;
  toAddress?: string;
  fromAddressEntityLogo?: string | null;
  toAddressEntityLogo?: string | null;
  summary?: string;
  blockTimestamp?: string | number | Date | null;
};
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import type { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<TransactionRow>[] = [
  {
    header: 'Hash',
    cell: ({ row }) => {
      const hash = row.original.hash || '';
      return (
        <>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="truncate max-w-[100px] cursor-pointer text-sm font-mono text-muted-foreground">
                  {hash ? `${hash.slice(0, 6)}...${hash.slice(-4)}` : '-'}
                </span>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                className="bg-white text-black dark:bg-black dark:text-white dark:border-white border border-black px-3 py-2 rounded-md shadow-[0_4px_6px_rgba(0,0,0,0.1),_0_1px_3px_rgba(0,0,0,0.06)] text-xs max-w-fit font-mono break-words"
              >
                {hash}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </>
      );
    },
  },
  {
    header: 'From',
    cell: ({ row }) => {
      const rawFrom: unknown = row.original.fromAddress as unknown;
      let from = '';
      if (typeof rawFrom === 'string') {
        from = rawFrom;
      } else if (rawFrom && typeof rawFrom === 'object') {
        const maybeObj = rawFrom as { lowercase?: string; address?: string };
        from = maybeObj.lowercase || maybeObj.address || '';
      }
      return (
        <div className="flex gap-2">
          {row.original.fromAddressEntityLogo && (
            <img
              className="w-5 h-5"
              src={row.original.fromAddressEntityLogo || ''}
              alt="From Address Logo"
            />
          )}
          <a
            href={`https://etherscan.io/address/${from}`}
            target="_blank"
            rel="noreferrer"
          >
            {from ? `${from.slice(0, 6)}...${from.slice(-4)}` : '-'}
          </a>
          <CopyButton text={from || ''} variant="ghost" size="sm" />
        </div>
      );
    },
  },
  {
    header: 'To',
    cell: ({ row }) => {
      const rawTo: unknown = row.original.toAddress as unknown;
      let to = '';
      if (typeof rawTo === 'string') {
        to = rawTo;
      } else if (rawTo && typeof rawTo === 'object') {
        const maybeObj = rawTo as { lowercase?: string; address?: string };
        to = maybeObj.lowercase || maybeObj.address || '';
      }
      return (
        <div className="flex gap-2">
          {row.original.toAddressEntityLogo && (
            <img
              className="w-5 h-5"
              src={row.original.toAddressEntityLogo || ''}
              alt="From Address Logo"
            />
          )}
          <a
            href={`https://etherscan.io/address/${to}`}
            target="_blank"
            rel="noreferrer"
          >
            {to ? `${to.slice(0, 6)}...${to.slice(-4)}` : '-'}
          </a>
          <CopyButton text={to || ''} variant="ghost" size="sm" />
        </div>
      );
    },
  },
  {
    accessorKey: 'summary',
    header: 'Summary',
    cell: ({ row }) => {
      return <div> {row.original.summary || ''}</div>;
    },
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => {
      const ts = row.original.blockTimestamp;
      const dateString =
        typeof ts === 'string' || typeof ts === 'number'
          ? ts
          : ts instanceof Date
            ? ts.toISOString()
            : ts && typeof ts === 'object'
              ? // handle Moralis/date-like objects restored from JSON
                (ts as { iso?: string; $date?: string | number } | null)?.iso ||
                (ts as { $date?: string | number } | null)?.$date ||
                ''
              : '';
      const date = dateString ? new Date(dateString) : new Date(NaN);
      const formatted = isNaN(date.getTime())
        ? '-'
        : date.toLocaleString(undefined, {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          });
      return <p className="whitespace-nowrap text-sm">{formatted}</p>;
    },
  },
];
