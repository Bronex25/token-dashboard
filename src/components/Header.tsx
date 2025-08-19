import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ModeToggle } from './ui/mode-toggle';
import { useTheme } from './ui/themeProvider';
import { NavLink } from 'react-router-dom';
import { useAccount } from 'wagmi';

export const Header: React.FC = () => {
  const theme = useTheme();
  const { isConnected } = useAccount();
  return (
    <header className="flex items-center gap-2 px-2 py-4 bg-muted rounded-md shadow-sm max-h-20 md:px-4 md:gap-8 dark:bg-black dark:border-gray-400 dark:border-b-1">
      <div className="flex items-center gap-6">
        <img
          src={theme.theme === 'dark' ? './logo-dark.png' : './logo-white.png'}
          alt="Logo"
          className="max-w-20 sm:max-w-25"
        />
      </div>

      <nav className="flex gap-2 justify-around text-sm w-full text-black font-medium dark:text-white md:text-lg md:gap-4 md:justify-normal">
        {['Home', 'Cryptocurrencies', 'Wallet'].map(item => (
          <NavLink
            key={item}
            to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
            className="hover:opacity-50 transition-all ease-in-out"
          >
            {item}
          </NavLink>
        ))}
      </nav>

      <ModeToggle></ModeToggle>
      {isConnected && (
        <ConnectButton
          showBalance={false}
          accountStatus={'avatar'}
          chainStatus={'icon'}
        ></ConnectButton>
      )}
    </header>
  );
};
