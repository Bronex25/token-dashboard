import React from 'react';
import type { TokenById } from '@/types/TokenById';
import { formatToUsd } from '@/lib/utils';
import { TrendingIcon } from '@/components/TrendingIcon';

type CoinHeaderProps = {
  token: TokenById;
};

export const CoinHeader: React.FC<CoinHeaderProps> = ({ token }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-3 mt-5">
      <div className="flex items-center gap-3">
        <img
          src={token.image.large}
          alt={`${token.name} image`}
          className="w-12 h-12 rounded-full"
        />
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
            {token.name} ({token.symbol.toUpperCase()})
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            #{token.market_cap_rank} by Market Cap
          </p>
        </div>
      </div>

      <div className="flex flex-col items-end">
        <p className="text-2xl sm:text-3xl font-bold">
          {formatToUsd(token.market_data.current_price.usd.toString())}
        </p>
        <TrendingIcon data={token.market_data.price_change_percentage_24h} />
      </div>
    </div>
  );
};
