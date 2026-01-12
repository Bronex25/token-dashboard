import {
  RainbowKitProvider,
  darkTheme,
  lightTheme,
} from '@rainbow-me/rainbowkit';
import { useTheme } from './shadcn_ui/themeProvider';
import type { ReactNode } from 'react';

export function RainbowKitWrapper({ children }: { children: ReactNode }) {
  const themeContext = useTheme();

  return (
    <RainbowKitProvider
      theme={themeContext.theme === 'dark' ? darkTheme() : lightTheme()}
    >
      {children}
    </RainbowKitProvider>
  );
}
