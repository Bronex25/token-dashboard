import { ChartPieLabelList } from '@/components/PieChart';
import { SkeletonCard } from '@/components/Skeletons/SkeletonCard';
import { DataTable } from '@/components/ui/Tables/DataTable';
import { tokenColumns } from '@/components/ui/Tables/tokenColumns';
import {
  columns,
  type TransactionRow,
} from '@/components/ui/Tables/transactionColumns';
import { getAllTokens, getAllTransactions } from '@/lib/moralis';
import { fetchWithCache } from '@/lib/utils';
import type { Token } from '@/types/Token';
import type { EvmWalletHistoryTransaction } from '@moralisweb3/common-evm-utils';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useEffect, useState, useCallback } from 'react';
import { useAccount } from 'wagmi';

const normalizeTx = (
  tx: EvmWalletHistoryTransaction | Record<string, unknown>,
): TransactionRow => {
  const anyTx = tx as Record<string, unknown>;

  const extractAddress = (value: unknown): string => {
    if (!value) return '';
    if (typeof value === 'string') return value;
    if (typeof value === 'object') {
      const obj = value as {
        lowercase?: string;
        address?: string;
        checksum?: string;
        value?: string;
      };
      return obj.lowercase || obj.address || obj.checksum || obj.value || '';
    }
    return '';
  };

  const rawFrom = anyTx.fromAddress ?? anyTx.from ?? anyTx.from_address ?? null;
  const rawTo = anyTx.toAddress ?? anyTx.to ?? anyTx.to_address ?? null;

  const blockTimestamp =
    (anyTx.blockTimestamp as string | number | Date | null | undefined) ??
    (anyTx.block_timestamp as string | number | Date | null | undefined) ??
    (anyTx as { blockTimestamp?: { iso?: string } }).blockTimestamp?.iso ??
    null;

  return {
    hash: (anyTx.hash as string) || (anyTx.transactionHash as string) || '',
    fromAddress: extractAddress(rawFrom),
    toAddress: extractAddress(rawTo),
    fromAddressEntityLogo: (anyTx.fromAddressEntityLogo as string) ?? null,
    toAddressEntityLogo: (anyTx.toAddressEntityLogo as string) ?? null,
    summary: (anyTx.summary as string) || '',
    blockTimestamp,
  };
};

export const WalletInfo: React.FC = () => {
  const account = useAccount();
  const { isConnected } = account;

  const [tokens, setTokens] = useState<Token[]>([]);
  const [transactions, setTransactions] = useState<TransactionRow[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pieColors = [
    '#8884d8',
    '#82ca9d',
    '#ffc658',
    '#ff8042',
    '#8dd1e1',
    '#a4de6c',
    '#d0ed57',
    '#fa8072',
    '#b0e0d0',
    '#f08080',
  ];

  const fetchTokensTxs = useCallback(async () => {
    if (!account.address) return;

    setIsLoading(true);
    setError(null);

    try {
      const [tokens, transactions] = await Promise.all([
        fetchWithCache('tokens', () => getAllTokens(account.address!)),
        fetchWithCache('transactions', () =>
          getAllTransactions(account.address!),
        ),
      ]);

      setTokens(tokens);
      setTransactions(
        (transactions as unknown[]).map(t =>
          normalizeTx(t as Record<string, unknown>),
        ),
      );
    } catch (err) {
      console.error('Unable to fetch wallet data', err);
      setError('Failed to load wallet data. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [account.address]);

  useEffect(() => {
    fetchTokensTxs();
  }, [fetchTokensTxs]);

  const sortedTokens = [...tokens].sort((a, b) => +b.usdValue - +a.usdValue);
  const topTokens = sortedTokens.slice(0, 4);
  const othersValue = sortedTokens
    .slice(4)
    .reduce((acc, t) => acc + +t.usdValue, 0);

  const dataForPieChart = [
    ...topTokens.map((token, idx) => ({
      name: token.symbol,
      value: +token.usdValue,
      fill: pieColors[idx % pieColors.length],
    })),
    ...(othersValue > 0
      ? [{ name: 'Others', value: othersValue, fill: pieColors[4] }]
      : []),
  ];

  if (!isConnected) {
    return (
      <div className="flex justify-center py-20">
        <ConnectButton />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 py-10">{error}</div>;
  }

  return (
    <div className="flex flex-col gap-12 w-full">
      <div className="flex justify-center mb-6">
        <ConnectButton />
      </div>

      <h1 className="text-4xl font-bold text-center">Wallet Information</h1>

      <section className="space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          <section>
            <h2 className="text-2xl font-bold mb-4">Wallet Overview</h2>
            {isLoading && <SkeletonCard />}

            {!isLoading && tokens.length > 0 && (
              <ChartPieLabelList data={dataForPieChart} />
            )}

            {!isLoading && tokens.length === 0 && (
              <p className="text-gray-500">No tokens found in this wallet.</p>
            )}
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Token Balances</h2>
            <DataTable
              columns={tokenColumns}
              isLoading={isLoading}
              data={tokens.map(t => ({
                symbol: t.symbol,
                balance: t.balanceFormatted,
                price: t.usdPrice,
                value: t.usdValue,
                logo: t.logo,
              }))}
            />
          </section>
        </div>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Transaction History</h2>
          <DataTable
            columns={columns}
            data={transactions}
            isLoading={isLoading}
          />
        </section>
      </section>
    </div>
  );
};
