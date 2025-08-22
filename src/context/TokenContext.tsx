import { createContext, useContext, useState, useEffect } from 'react';
import { getTokens } from '@/lib/fetchCoinGecko';
import type { TokenCoinGecko } from '@/types/TokenCoinGecko';

type TokensContextType = {
  tokens: TokenCoinGecko[];
  isLoading: boolean;
  error: string | null;
};

const TokensContext = createContext<TokensContextType | undefined>(undefined);

export const TokensProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tokens, setTokens] = useState<TokenCoinGecko[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTokens = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const [page1, page2] = await Promise.all([getTokens(), getTokens('2')]);
        setTokens([...page1, ...page2]);
      } catch {
        setError('Failed to fetch tokens');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTokens();
  }, []);

  return (
    <TokensContext.Provider value={{ tokens, isLoading, error }}>
      {children}
    </TokensContext.Provider>
  );
};

export const useTokens = () => {
  const context = useContext(TokensContext);
  if (!context)
    throw new Error('useTokens must be used within a TokensProvider');
  return context;
};
