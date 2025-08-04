import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { config } from '../config.ts';
import './index.css';
import App from './App.tsx';
import '@rainbow-me/rainbowkit/styles.css';
import { ThemeProvider } from './components/ui/themeProvider.tsx';
import { RainbowKitWrapper } from './components/RainbowKitProvider.tsx';
import { BrowserRouter } from 'react-router-dom';
import { TokensProvider } from './context/TokenContext.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TokensProvider>
          <RainbowKitWrapper>
            <BrowserRouter basename={import.meta.env.BASE_URL}>
              <StrictMode>
                <App />
              </StrictMode>
            </BrowserRouter>
          </RainbowKitWrapper>
        </TokensProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </WagmiProvider>,
);
