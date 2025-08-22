import { CoinCard } from '@/components/CoinCard';
import { Input } from '@/components/ui/input';
import { useTokens } from '@/context/TokenContext';
import React, { useEffect, useMemo, useState } from 'react';
import { debounce } from 'lodash';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { CoinCardSkeleton } from '@/components/Skeletons/CoinCardSkeleton';

export const Cryptocurrencies: React.FC = () => {
  const { tokens, isLoading, error } = useTokens();
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

  const getPageNumbers = () => {
    if (maxPages <= 4) {
      // If 4 pages or less, show all pages
      return Array.from({ length: maxPages }, (_, i) => i + 1);
    }

    const pages = [];

    // Always show first 2 pages
    pages.push(1, 2);

    // Add ellipsis if current page is greater than 3
    if (currentPage > 3) {
      pages.push('ellipsis');
    }

    // Add current page if it's not first, second, or last
    if (currentPage > 2 && currentPage < maxPages - 1) {
      pages.push(currentPage);
    }

    // Add ellipsis if current page is less than maxPages - 2
    if (currentPage < maxPages - 2) {
      pages.push('ellipsis');
    }

    // Always show last page
    pages.push(maxPages);

    return pages;
  };

  if (error) return <div>Something went wrong please try agin lateer</div>;

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
        {isLoading ? (
          Array.from({ length: perPage }).map((_, i) => (
            <CoinCardSkeleton key={i} />
          ))
        ) : paginatedTokens.length ? (
          paginatedTokens.map(token => <CoinCard key={token.id} coin={token} />)
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            No tokens match your search.
          </p>
        )}
      </div>

      {maxPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage(prev => prev - 1)}
                className={
                  currentPage === 1 ? 'opacity-50 pointer-events-none' : ''
                }
              />
            </PaginationItem>

            {getPageNumbers().map((page, index) => (
              <PaginationItem key={index}>
                {page === 'ellipsis' ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    onClick={() => setCurrentPage(page as number)}
                    isActive={currentPage === page}
                  >
                    {page}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() => setCurrentPage(prev => prev + 1)}
                className={
                  currentPage === maxPages
                    ? 'opacity-50 pointer-events-none'
                    : ''
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};
