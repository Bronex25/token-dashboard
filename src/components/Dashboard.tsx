import { useEffect, useState } from 'react';
import { PortfolioInfo } from './PortfolioInfo';
import { TokensTable } from './TokensTable';
import { TransactionsTable } from './TransactionTable';
import { getAllTokens } from '@/lib/moralis';
import { useAccount } from 'wagmi';
import React from 'react';

import type { Token } from '@/types/Token';

export function Dashboard() {
  const account = useAccount();
  const [tokens, setTokens] = useState<Token[]>([]);

  useEffect(() => {
    const fetchTokens = async () => {
      if (!account.address) return;
      try {
        const tokens = await getAllTokens(account.address);

        setTokens(tokens);
      } catch (error) {
        console.error('Unable to get tokens', error);
      }
    };

    fetchTokens();
  }, [account.address]);

  return (
    <div className="px-6 flex flex-col gap-4">
      <PortfolioInfo />

      <div className="grid md:grid-cols-2 gap-4">
        <TokensTable tokens={tokens} />
        <TransactionsTable />
      </div>
    </div>
  );
}
