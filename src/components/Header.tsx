import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ModeToggle } from './ui/mode-toggle';
import { useTheme } from './ui/themeProvider';
import { NavLink } from 'react-router-dom';

export const Header: React.FC = () => {
  const theme = useTheme();
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-muted rounded-md shadow-sm max-h-20 dark:bg-black dark:border-gray-400 dark:border-b-1">
      <div className="flex items-center gap-6">
        <img
          src={theme.theme === 'dark' ? './logo-dark.png' : './logo-white.png'}
          alt="Logo"
          className="max-w-25"
        />
        <ModeToggle></ModeToggle>
        <nav className="flex gap-10 text-lg text-black font-medium ml-5  dark:text-white">
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
      </div>

      <ConnectButton
        showBalance
        accountStatus={'full'}
        chainStatus={'icon'}
      ></ConnectButton>
    </header>
  );
};
