import { Link } from 'react-router-dom';
import { TrendingIcon } from './TrendingIcon';
import { formatToUsd } from '@/lib/utils';

type Props = {
  id: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
};

export const SmTokenCard: React.FC<Props> = ({
  id,
  name,
  image,
  current_price,
  price_change_percentage_24h,
}) => {
  return (
    <div className="flex justify-between hover:bg-gray-100 rounded-md p-1 dark:hover:bg-blue-800">
      <Link to={`/cryptocurrencies/${id}`} className="flex items-center gap-2">
        <img src={image} alt={name} className="w-5 h-5 " />
        <p className="text-base font-normal">{name}</p>
      </Link>

      <p className="flex gap-2 text-sm items-center ">
        {formatToUsd(current_price.toString())}
        <TrendingIcon data={price_change_percentage_24h}></TrendingIcon>
      </p>
    </div>
  );
};
