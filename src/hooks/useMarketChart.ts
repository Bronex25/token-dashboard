import { useQuery } from '@tanstack/react-query';
import { formatDate } from '@/utils/dateFormatter';
import type { Range } from '@/utils/dateFormatter';
import { getMarketChart } from '@/lib/fetchCoinGecko';

type ChartDataPoint = {
  time: string;
  price: number;
  timestamp: number;
};

type UseMarketChartResult = {
  chartData: ChartDataPoint[];
  error: string | null;
  isLoading: boolean;
};

const rangeToDays: Record<Range, string> = {
  '7d': '7',
  '30d': '30',
  '90d': '90',
  '1y': '365',
};

export const useMarketChart = (
  tokenId: string | undefined,
  range: Range,
): UseMarketChartResult => {
  const query = useQuery({
    queryKey: ['marketChart', tokenId, range],
    enabled: !!tokenId,
    queryFn: async () => {
      const days = rangeToDays[range];
      const data = await getMarketChart(tokenId!, days);

      return (data.prices as [number, number][]).map(([timestamp, price]) => ({
        time: formatDate(timestamp, range),
        price,
        timestamp,
      }));
    },
    staleTime: 5 * 60 * 1000,
  });

  return {
    chartData: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error ? String(query.error) : null,
  };
};
