import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useAccount, useBalance } from 'wagmi';

export const PortfolioInfo: React.FC = () => {
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
        <p>$0.00</p>
        <p>{ethBalance}</p>
      </CardContent>
    </Card>
  );
};
