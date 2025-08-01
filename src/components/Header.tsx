import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ModeToggle } from './ui/mode-toggle';
import { useTheme } from './ui/themeProvider';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  const theme = useTheme();
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-muted rounded-md shadow-sm max-h-20">
      <div className="flex items-center gap-6">
        <img
          src={theme.theme === 'dark' ? './logo1.png' : './logo3.png'}
          alt="Logo"
          className="max-w-25"
        />
        <ModeToggle></ModeToggle>
        <nav className="flex gap-10 text-lg text-black font-medium ml-5 ">
          {['Home', 'Cryptocurrencies', 'Wallet'].map(item => (
            <Link
              key={item}
              to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
              className=" hover:opacity-50 transition-all ease-in-out"
            >
              {item}
            </Link>
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
