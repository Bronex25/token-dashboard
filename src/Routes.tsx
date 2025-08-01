import { Routes, Route } from 'react-router-dom';
import { Home } from '../src/pages/Home';
import { Cryptocurrencies } from '../src/pages/Cryptocurrencies.tsx';
import { WalletInfo } from '../src/pages/WalletInfo';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
      <Route path="/wallet" element={<WalletInfo />} />
    </Routes>
  );
}
