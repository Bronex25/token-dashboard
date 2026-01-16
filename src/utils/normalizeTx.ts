import type { TransactionRow } from '@/components/shadcn_ui/Tables/transactionColumns';
import type { EvmWalletHistoryTransaction } from '@moralisweb3/common-evm-utils';

export const normalizeTx = (
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
