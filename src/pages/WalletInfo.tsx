import { ChartPieLabelList } from '@/components/PieChart';
import { SkeletonCard } from '@/components/Skeletons/SkeletonCard';
import { DataTable } from '@/components/ui/Tables/DataTable';
import { tokenColumns } from '@/components/ui/Tables/tokenColumns';
import { columns } from '@/components/ui/Tables/transactionColumns';
import { getAllTokens, getAllTransactions } from '@/lib/moralis';
import { fetchWithCache } from '@/lib/utils';
import type { Token } from '@/types/Token';
import type { EvmWalletHistoryTransaction } from '@moralisweb3/common-evm-utils';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

export const WalletInfo: React.FC = () => {
  const account = useAccount();
  const [tokens, setTokens] = useState<Token[]>([]);
  const [transactions, setTransactions] = useState<
    EvmWalletHistoryTransaction[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  const { isConnected } = useAccount();

  const tokensData = [...tokens].map(token => {
    return {
      symbol: token.symbol,
      balance: token.balanceFormatted,
      price: token.usdPrice,
      value: token.usdValue,
      logo: token.logo,
    };
  });

  useEffect(() => {
    const fetchTokensTxs = async () => {
      if (!account.address) return;
      const address = account.address;
      setIsLoading(true);
      try {
        const tokens = await fetchWithCache('tokens', () =>
          getAllTokens(address),
        );
        const transactions = await fetchWithCache('transactions', () =>
          getAllTransactions(address),
        );

        setTokens(tokens);
        setTransactions(transactions);
      } catch (error) {
        console.error('Unable to get tokens', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTokensTxs();
  }, [account.address]);

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

  const sortedTokens = [...tokens].sort((a, b) => +b.usdValue - +a.usdValue);
  const topTokens = sortedTokens.slice(0, 4);
  const otherTokens = sortedTokens.slice(4);
  const othersValue = otherTokens.reduce(
    (acc, token) => acc + +token.usdValue,
    0,
  );

  const dataForPieChart = [
    ...topTokens.map((token, idx) => ({
      name: token.symbol,
      value: +token.usdValue,
      fill: pieColors[idx % pieColors.length],
    })),
    ...(othersValue > 0
      ? [
          {
            name: 'Others',
            value: othersValue,
            fill: pieColors[4],
          },
        ]
      : []),
  ];

  if (!account.address) {
    return (
      <div>
        <ConnectButton />
      </div>
    );
  }

  if (isLoading) {
    return (
      <main className="px-4 py-8 space-y-8 w-full">
        <SkeletonCard></SkeletonCard>
        <SkeletonCard></SkeletonCard>
        <SkeletonCard></SkeletonCard>
        <SkeletonCard></SkeletonCard>
      </main>
    );
  }

  return (
    <div className="flex flex-col gap-15 w-full">
      {isConnected && <ConnectButton />}
      <h1 className="text-4xl font-bold text-center">Wallet Information</h1>
      <section className="space-y-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 min-w-full">
          <section className="col-span-1">
            <h2 className="text-2xl font-bold mb-4">Wallet Overview</h2>
            <ChartPieLabelList data={dataForPieChart} />
          </section>
          <section className="col-span-1">
            <h2 className="text-2xl font-bold mb-4">Token Balances</h2>
            <DataTable columns={tokenColumns} data={tokensData} />
          </section>
        </div>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Transaction History</h2>
          <DataTable columns={columns} data={transactions} />
        </section>
      </section>
    </div>
  );
};
