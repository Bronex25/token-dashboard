import React from 'react';
import { ModeToggle } from './ui/mode-toggle';
import { useTheme } from './ui/themeProvider';
import { Link, NavLink } from 'react-router-dom';

export const Header: React.FC = () => {
  const theme = useTheme();
  return (
    <header className="flex items-center gap-2 px-2 py-4 bg-muted rounded-md shadow-sm max-h-20 md:px-4 md:gap-8 dark:bg-black dark:border-gray-400 dark:border-b-1">
      <Link to={'/'} className="flex items-center gap-6">
        <img
          src={theme.theme === 'dark' ? './logo-dark.png' : './logo-white.png'}
          alt="Logo"
          className="max-w-20 sm:max-w-25"
        />
      </Link>

      <nav className="flex gap-2 justify-around text-sm w-full text-black font-medium dark:text-white md:text-lg md:gap-4 md:justify-normal">
        {['Home', 'Cryptocurrencies', 'Wallet'].map(item => (
          <NavLink
            key={item}
            to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
            className={({ isActive }) =>
              `${isActive ? 'font-semibold underline underline-offset-4' : ''} hover:opacity-70 transition-all ease-in-out px-1 py-0.5`
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
