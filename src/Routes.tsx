import { Routes, Route } from 'react-router-dom';
import { Home } from '../src/pages/Home';
import { Cryptocurrencies } from '../src/pages/Cryptocurrencies.tsx';
import { WalletInfo } from '../src/pages/WalletInfo';
import { CoinInfo } from './pages/CoinInfo.tsx';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
      <Route path="/cryptocurrencies/:tokenId" element={<CoinInfo />} />
      <Route path="/wallet" element={<WalletInfo />} />
    </Routes>
  );
}
