import React from 'react';
import { ModeToggle } from './shadcn_ui/mode-toggle';
import { Link, NavLink } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-2 backdrop-blur-md bg-muted/80 shadow-md border-b dark:bg-black/50 dark:border-gray-800">
      <Link to="/" className="flex items-center select-none">
        <img
          src="./logo.png"
          alt="Logo"
          width={32}
          height={32}
          className="h-8 w-auto object-contain"
        />
        <h1 className="text-lg font-semibold tracking-tight bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent hidden sm:block">
          CoinAtlas
        </h1>
      </Link>

      <nav className="flex gap-2 justify-around text-sm w-full ml-15 text-black font-medium dark:text-white md:text-lg md:gap-4 md:justify-normal">
        {['Home', 'Cryptocurrencies', 'Wallet'].map(item => (
          <NavLink
            key={item}
            to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
            className={({ isActive }) =>
              `${isActive ? 'font-semibold underline underline-offset-18' : 'hover:opacity-60'} transition-all ease-in-out px-1 py-0.5`
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
