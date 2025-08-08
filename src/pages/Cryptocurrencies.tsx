import { CoinCard } from '@/components/CoinCard';
import { Input } from '@/components/ui/input';
import { useTokens } from '@/context/TokenContext';
import React, { useEffect, useMemo, useState } from 'react';
import { debounce } from 'lodash';

export const Cryptocurrencies: React.FC = () => {
  const { tokens } = useTokens();
  const [typedQuery, setTypedQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const handler = debounce(() => {
      setDebouncedQuery(typedQuery.trim().toLowerCase());
    }, 300);

    handler();

    return () => {
      handler.cancel();
    };
  }, [typedQuery]);

  const queriedTokens = useMemo(() => {
    if (!tokens || !debouncedQuery) return tokens;
    return tokens.filter(
      token =>
        token.name.toLowerCase().includes(debouncedQuery) ||
        token.symbol.toLowerCase().includes(debouncedQuery),
    );
  }, [tokens, debouncedQuery]);

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col gap-10 items-center">
      <Input
        type="search"
        placeholder="Type to search"
        value={typedQuery}
        onChange={e => setTypedQuery(e.target.value)}
        className="max-w-1/2"
      ></Input>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
        {queriedTokens?.length ? (
          queriedTokens.map(token => <CoinCard key={token.id} coin={token} />)
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            No tokens match your search.
          </p>
        )}
      </div>
    </div>
  );
};
