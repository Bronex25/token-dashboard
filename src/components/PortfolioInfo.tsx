import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './shadcn_ui/card';
import { useAccount, useBalance } from 'wagmi';

type Props = {
  totalBalance: string;
};

export const PortfolioInfo: React.FC<Props> = ({ totalBalance }) => {
  const account = useAccount();
  const balance = useBalance({ address: account.address });

  const ethBalance = !balance
    ? 0
    : `${balance.data?.formatted.slice(0, 10)} ETH`;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Portfolio</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-between">
        <p>{totalBalance}</p>
        <p>{ethBalance}</p>
      </CardContent>
    </Card>
  );
};
