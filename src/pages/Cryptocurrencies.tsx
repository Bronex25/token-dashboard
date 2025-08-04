import { CoinCard } from '@/components/CoinCard';
import { Input } from '@/components/ui/input';
import { useTokens } from '@/context/TokenContext';
import React, { useState } from 'react';

export const Cryptocurrencies: React.FC = () => {
  const { tokens } = useTokens();
  const [query, setQuery] = useState('');

  const queriedTokens = tokens?.filter(token => {
    const formattedQuery = query.trim().toLowerCase();

    return (
      token.name.toLowerCase().includes(formattedQuery) ||
      token.symbol.includes(formattedQuery)
    );
  });

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col gap-10 items-center">
      <Input
        type="search"
        placeholder="Type to search"
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="max-w-1/2"
      ></Input>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full ">
        {queriedTokens?.map(token => (
          <CoinCard key={token.id} coin={token} />
        ))}
      </div>
      <div></div>
    </div>
  );
};
