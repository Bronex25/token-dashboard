import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fetchWithCache = async <T>(
  key: string,
  fetchFn: () => Promise<T>,
  cacheDuration = 5 * 60 * 1000, // default: 5 minutes
): Promise<T> => {
  const cached = localStorage.getItem(key);

  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < cacheDuration) {
      return data;
    }
  }

  const freshData = await fetchFn();
  localStorage.setItem(
    key,
    JSON.stringify({ data: freshData, timestamp: Date.now() }),
  );
  return freshData;
};

export function formatToUsd(data: string, compact = false): string {
  const value = parseFloat(data);
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

  const parts = value.toExponential().split('e-');
  const digits = parseInt(parts[1], 10) + 2;
  return `$${value.toFixed(digits)}`;
}

export function formatTokenBalance(raw: string): string {
  const num = parseFloat(raw);
  if (num === 0) return '0';
  if (num > 1) return num.toFixed(3).replace(/\.?0+$/, '');
  return num.toFixed(6).replace(/\.?0+$/, '');
}
