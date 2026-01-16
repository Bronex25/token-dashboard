export function formatTokenBalance(raw: string): string {
  const num = Number.parseFloat(raw);
  if (!Number.isFinite(num)) return '0';
  if (num === 0) return '0';
  if (num > 1) return num.toFixed(3).replace(/\.?0+$/, '');
  return num.toFixed(6).replace(/\.?0+$/, '');
}
