import { TrendingDown, TrendingUp } from 'lucide-react';

type Props = {
  data: number;
};

export const TrendingIcon: React.FC<Props> = ({ data }) => {
  const isPositive = data >= 0;
  return (
    <span
      className={`text-sm font-medium flex items-center gap-1 ${
        isPositive ? 'text-green-500' : 'text-red-500'
      }`}
    >
      {isPositive ? (
        <TrendingUp className="h-4 w-4" />
      ) : (
        <TrendingDown className="h-4 w-4" />
      )}
      {data ? data.toFixed(2) : 0}%
    </span>
  );
};
