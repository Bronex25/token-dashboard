import { CoinCardSkeleton } from '../skeletons/CoinCardSkeleton';
import { CoinCard } from '../shared/CoinCard';
import type { TokenCoinGecko } from '@/types/TokenCoinGecko';

type Props = {
  isTokensLoading: boolean;
  perPage: number;
  tokens: TokenCoinGecko[];
};

const TokenList = ({ isTokensLoading, perPage, tokens }: Props) => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 min-w-full">
      {isTokensLoading ? (
        Array.from({ length: perPage }).map((_, i) => (
          <CoinCardSkeleton key={i} />
        ))
      ) : tokens.length ? (
        tokens.map(token => <CoinCard key={token.id} coin={token} />)
      ) : (
        <p className="text-gray-500 text-center col-span-full">
          No tokens match your search.
        </p>
      )}
    </section>
  );
};

export default TokenList;
