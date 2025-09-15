import React from 'react';
import { ModeToggle } from './ui/mode-toggle';
import { useTheme } from './ui/themeProvider';
import { Link, NavLink } from 'react-router-dom';

export const Header: React.FC = () => {
  const theme = useTheme();
  return (
    <header className="sticky top-0 z-50 flex gap-2 items-center justify-between px-2 py-2 backdrop-blur-md bg-muted/80 shadow-md border-b dark:bg-black/50 dark:border-gray-800">
      <Link to={'/'} className="flex items-center gap-6">
        <img
          src={theme.theme === 'dark' ? './logo-dark.png' : './logo-white.png'}
          alt="Logo"
          className="max-h-12 w-auto px-2"
        />
      </Link>

      <nav className="flex gap-2 justify-around text-sm w-full text-black font-medium dark:text-white md:text-lg md:gap-4 md:justify-normal">
        {['Home', 'Cryptocurrencies', 'Wallet'].map(item => (
          <NavLink
            key={item}
            to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
            className={({ isActive }) =>
              `${isActive ? 'font-semibold underline underline-offset-4' : 'hover:opacity-60'} transition-all ease-in-out px-1 py-0.5`
            }
          >
            {item}
          </NavLink>
        ))}
      </nav>
      <ModeToggle></ModeToggle>
    </header>
  );
};
