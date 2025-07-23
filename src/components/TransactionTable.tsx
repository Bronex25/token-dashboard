import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { DataTable } from './ui/Tables/DataTable';
import type { EvmWalletHistoryTransaction } from '@moralisweb3/common-evm-utils';
import { columns } from './ui/Tables/transactionColumns';

type Props = {
  transactions: EvmWalletHistoryTransaction[];
};

export const TransactionTable: React.FC<Props> = ({ transactions }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={transactions} />
      </CardContent>
    </Card>
  );
};
