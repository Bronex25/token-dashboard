// context/TokensContext.tsx
import { createContext, useContext, useState, useEffect } from 'react';
import { getTokens } from '@/lib/fetchCoinGecko';
import type { TokenCoinGecko } from '@/types/TokenCoinGecko';

type TokensContextType = {
  tokens: TokenCoinGecko[] | null;
  isLoading: boolean;
  error: string | null;
};

const TokensContext = createContext<TokensContextType | undefined>(undefined);

export const TokensProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tokens, setTokens] = useState<TokenCoinGecko[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getTokens()
      .then(setTokens)
      .catch(err => setError(err.message))
      .finally(() => setIsLoading(false));
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
