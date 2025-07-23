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

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <RainbowKitWrapper>
          <StrictMode>
            <App />
          </StrictMode>
        </RainbowKitWrapper>
      </ThemeProvider>
    </QueryClientProvider>
  </WagmiProvider>,
);
