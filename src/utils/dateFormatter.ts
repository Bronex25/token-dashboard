export type Range = '7d' | '30d' | '90d' | '1y';

export const formatDate = (timestamp: number, range: Range): string => {
  const date = new Date(timestamp);

  switch (range) {
    case '7d':
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    case '30d':
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
    case '90d':
    case '1y':
      return date.toLocaleDateString('en-US', {
        month: 'short',
        year: '2-digit',
      });
    default:
      return date.toLocaleDateString();
  }
};
