import { useEffect, useState } from 'react';
import { PortfolioInfo } from './PortfolioInfo';
import { TokensTable } from './TokensTable';
import { TransactionTable } from './TransactionTable';
import { getAllTokens, getAllTransactions } from '@/lib/moralis';
import { useAccount } from 'wagmi';

import type { Token } from '@/types/Token';
import { formatToUsd } from '@/lib/utils';
import type { EvmWalletHistoryTransaction } from '@moralisweb3/common-evm-utils';

export function Dashboard() {
  const account = useAccount();
  const [tokens, setTokens] = useState<Token[]>([]);
  const [transactions, setTransactions] = useState<
    EvmWalletHistoryTransaction[]
  >([]);
  const totalBalance = formatToUsd(
    String(tokens.reduce((acc, token) => (acc += +token.usdValue), 0)),
  );

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

  return (
    <div className="px-6 flex flex-col gap-4">
      <PortfolioInfo totalBalance={totalBalance} />

      <div className="grid md:grid-cols-2 gap-4">
        <TokensTable tokens={tokens} />
        <TransactionTable transactions={transactions} />
      </div>
    </div>
  );
}
