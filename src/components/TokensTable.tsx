import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import type React from 'react';
import { DataTable } from './ui/Table/DataTable';
import { columns } from './ui/Table/columns';
import type { Token } from '@/types/Token';

type Props = {
  tokens: Token[];
};

export const TokensTable: React.FC<Props> = ({ tokens }) => {
  const tokensData = [...tokens].map(token => {
    return {
      symbol: token.symbol,
      balance: token.balanceFormatted,
      price: `$${token.usdPrice}`,
      value: `$${token.usdValue}`,
    };
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tokens</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={tokensData}></DataTable>
      </CardContent>
    </Card>
  );
};
