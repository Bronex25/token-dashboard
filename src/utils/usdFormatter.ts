export function formatToUsd(data: string, compact = false): string {
  const value = Number.parseFloat(data);
  if (!Number.isFinite(value)) return '$0';
  if (value >= 10000) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: compact ? 'compact' : 'standard',
      minimumFractionDigits: 0,
      maximumFractionDigits: compact ? 2 : 0,
    }).format(value);
  } else if (value >= 0.1 && value < 10000) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  } else if (value >= 0.01 && value < 0.1) {
    return `$${value.toFixed(4)}`;
  }

  const fixed = value.toFixed(8);
  return `$${fixed.replace(/\.0+$/, '')}`;
}
