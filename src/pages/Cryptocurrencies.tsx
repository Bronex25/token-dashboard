import { Input } from '@/components/shadcn_ui/input';
import React, { useEffect, useMemo, useState } from 'react';
import { debounce } from 'lodash';
import ErrorPage from './ErrorPage';
import { useQuery } from '@tanstack/react-query';
import { getTokens } from '@/lib/fetchCoinGecko';
import PagePagination from '@/components/shared/PagePagination';
import TokenList from '@/components/cryptocurrencies_page/TokenList';

export const Cryptocurrencies: React.FC = () => {
  const {
    data: tokens,
    isLoading: isTokensLoading,
    error: tokensError,
  } = useQuery({
    queryKey: ['tokens'],
    queryFn: () => getTokens(),
    staleTime: 5 * 60 * 1000,
  });

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
    if (!tokens) return [];
    if (!debouncedQuery) return tokens;
    return tokens.filter(
      token =>
        token.name.toLowerCase().includes(debouncedQuery) ||
        token.symbol.toLowerCase().includes(debouncedQuery),
    );
  }, [tokens, debouncedQuery]);

  const perPage = 24;
  const maxPages = Math.ceil(queriedTokens.length / perPage);
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedTokens = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    return queriedTokens.slice(start, start + perPage);
  }, [queriedTokens, currentPage]);

  if (tokensError) return <ErrorPage error={tokensError} />;

  return (
    <div className="container m-h-full mx-auto px-4 py-8 flex flex-col gap-10 items-center min-w-full">
      <Input
        type="search"
        placeholder="Type to search"
        value={typedQuery}
        onChange={e => setTypedQuery(e.target.value)}
        className="w-full lg:w-[60%] h-9"
      ></Input>

      <TokenList
        isTokensLoading={isTokensLoading}
        perPage={perPage}
        tokens={paginatedTokens}
      />

      {maxPages > 1 && (
        <PagePagination
          maxPages={maxPages}
          currentPage={currentPage}
          setCurrentPage={(page: number) => setCurrentPage(page)}
        />
      )}
    </div>
  );
};
