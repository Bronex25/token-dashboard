import { ChartPieLabelList } from '@/components/wallet_page/PieChart';
import { DataTable } from '@/components/shadcn_ui/Tables/DataTable';
import { tokenColumns } from '@/components/shadcn_ui/Tables/tokenColumns';
import { columns } from '@/components/shadcn_ui/Tables/transactionColumns';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import ErrorPage from './ErrorPage';
import { PieChartSkeleton } from '@/components/skeletons/PieChartSkeleton';
import { useWalletTokens, useWalletTransactions } from '@/hooks/useWalletData';
import { useMemo } from 'react';

export const WalletInfo: React.FC = () => {
  const { address, isConnected } = useAccount();

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

  const {
    data: tokens = [],
    isLoading: tokensLoading,
    error: tokensError,
  } = useWalletTokens(address);

  const {
    data: transactions = [],
    isLoading: txLoading,
    error: txError,
  } = useWalletTransactions(address);

  const sortedTokens = useMemo(
    () => [...tokens].sort((a, b) => +b.usdValue - +a.usdValue),
    [tokens],
  );

  const topTokens = sortedTokens.slice(0, 4);
  const othersValue = sortedTokens
    .slice(4)
    .reduce((acc, t) => acc + +t.usdValue, 0);

  const dataForPieChart = useMemo(
    () => [
      ...topTokens.map((token, idx) => ({
        name: token.symbol,
        value: +token.usdValue,
        fill: pieColors[idx % pieColors.length],
      })),
      ...(othersValue > 0
        ? [{ name: 'Others', value: othersValue, fill: pieColors[4] }]
        : []),
    ],
    [topTokens, othersValue],
  );

  if (!isConnected) {
    return (
      <div className="flex flex-col justify-center items-center gap-5 py-20">
        <h1 className="text-2xl font-bold">
          Please connect your wallet to see full Information
        </h1>
        <ConnectButton />
      </div>
    );
  }

  if (tokensError || txError) {
    return (
      <ErrorPage error="Failed to load wallet data. Please try again later." />
    );
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
            {tokensLoading && <PieChartSkeleton />}

            {!tokensLoading && tokens.length > 0 && (
              <ChartPieLabelList data={dataForPieChart} />
            )}

            {!tokensLoading && tokens.length === 0 && (
              <p className="text-gray-500">No tokens found in this wallet.</p>
            )}
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Token Balances</h2>
            <DataTable
              columns={tokenColumns}
              isLoading={tokensLoading}
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
            isLoading={txLoading}
          />
        </section>
      </section>
    </div>
  );
};
