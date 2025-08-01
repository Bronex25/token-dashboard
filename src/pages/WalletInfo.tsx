import { ChartPieLabelList } from '@/components/PieChart';
import { DataTable } from '@/components/ui/Tables/DataTable';
import { tokenColumns } from '@/components/ui/Tables/tokenColumns';
import { columns } from '@/components/ui/Tables/transactionColumns';
import { getAllTokens, getAllTransactions } from '@/lib/moralis';
import type { Token } from '@/types/Token';
import type { EvmWalletHistoryTransaction } from '@moralisweb3/common-evm-utils';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

export const WalletInfo: React.FC = () => {
  const account = useAccount();
  const [tokens, setTokens] = useState<Token[]>([]);
  const [transactions, setTransactions] = useState<
    EvmWalletHistoryTransaction[]
  >([]);
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
      try {
        const tokens = await getAllTokens(account.address);
        const transactions = await getAllTransactions(account.address);

        setTokens(tokens);
        setTransactions(transactions);
        console.log(transactions);
      } catch (error) {
        console.error('Unable to get tokens', error);
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
    '#e9967a',
    '#c0c0c0',
    '#bdb76b',
    '#dda0dd',
    '#ffb6c1',
    '#20b2aa',
    '#87cefa',
    '#4682b4',
    '#ff6347',
    '#40e0d0',
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

  return (
    <main className="px-4 py-8 space-y-8">
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <section>
            <h1 className="text-3xl font-bold mb-4">Wallet Overview</h1>
            <ChartPieLabelList data={dataForPieChart}></ChartPieLabelList>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-4">Token Balances</h2>
            <DataTable columns={tokenColumns} data={tokensData}></DataTable>
          </section>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Transaction History</h2>
        <DataTable columns={columns} data={transactions} />
      </section>
    </main>
  );
};
