import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ModeToggle } from './ui/mode-toggle';
import { useTheme } from './ui/themeProvider';

export const Header: React.FC = () => {
  const theme = useTheme();
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-muted rounded-md shadow-sm mb-4">
      <div className="flex items-center gap-4">
        <img
          src={theme.theme === 'dark' ? './logo1.png' : './logo3.png'}
          alt="Logo"
          className="max-w-25"
        />
        <ModeToggle></ModeToggle>
      </div>
      <ConnectButton
        showBalance
        accountStatus={'full'}
        chainStatus={'icon'}
      ></ConnectButton>
    </header>
  );
};
