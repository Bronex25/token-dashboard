'use client';

import type { EvmWalletHistoryTransaction } from '@moralisweb3/common-evm-utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@radix-ui/react-tooltip';
import type { ColumnDef } from '@tanstack/react-table';
import { Copy } from 'lucide-react';

export const columns: ColumnDef<EvmWalletHistoryTransaction>[] = [
  {
    header: 'Hash',
    cell: ({ row }) => {
      const hash = row.original.hash;
      return (
        <>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="truncate max-w-[100px] cursor-pointer text-sm font-mono text-muted-foreground">
                  {hash.slice(0, 6)}...{hash.slice(-4)}
                </span>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                className="bg-amber-100 border border-amber-300 px-3 py-2 rounded-md shadow-[0_4px_6px_rgba(0,0,0,0.1),_0_1px_3px_rgba(0,0,0,0.06)] text-xs max-w-fit font-mono break-words"
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
      const from = row.original.fromAddress.lowercase;
      return (
        <div className="flex gap-2">
          <a
            href={`https://etherscan.io/address/${from}`}
            target="_blank"
            rel="noreferrer"
          >
            {from ? `${from.slice(0, 6)}...${from.slice(-4)}` : '-'}
          </a>
          <Copy className="w-3.5 h-3.5"></Copy>
        </div>
      );
    },
  },
  {
    header: 'To',
    cell: ({ row }) => {
      const to = row.original.toAddress?.lowercase;
      return to ? `${to.slice(0, 6)}...${to.slice(-4)}` : '-';
    },
  },
  {
    accessorKey: 'summary',
    header: 'Fee',
    cell: ({ row }) => {
      return row.original.transactionFee?.slice(0, 5);
    },
  },
];
