import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatToUsd(data: string) {
  const value = parseFloat(data);
  if (value >= 0.1) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  }

  if (value >= 0.01) {
    return `$${value.toFixed(4)}`;
  }
  const parts = value.toExponential().split('e-');
  const digits = parseInt(parts[1], 10) + 2; // show 2 significant digits after leading zeros
  return `$${value.toFixed(digits)}`;
}

export function formatTokenBalance(raw: string): string {
  const num = parseFloat(raw);
  if (num === 0) return '0';
  if (num > 1) return num.toFixed(3).replace(/\.?0+$/, ''); // Trim trailing 0s
  return num.toFixed(6).replace(/\.?0+$/, '');
}
