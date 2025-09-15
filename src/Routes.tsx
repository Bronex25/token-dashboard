import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const Home = lazy(() =>
  import('@/pages/Home').then(m => ({ default: m.Home })),
);
const Cryptocurrencies = lazy(() =>
  import('@/pages/Cryptocurrencies').then(m => ({
    default: m.Cryptocurrencies,
  })),
);
const WalletInfo = lazy(() =>
  import('@/pages/WalletInfo').then(m => ({ default: m.WalletInfo })),
);
const CoinInfo = lazy(() =>
  import('@/pages/CoinInfo').then(m => ({ default: m.CoinInfo })),
);
const ErrorPage = lazy(() => import('@/pages/ErrorPage'));

export function AppRoutes() {
  return (
    <Suspense fallback={<div className="p-4">Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
        <Route path="/cryptocurrencies/:tokenId" element={<CoinInfo />} />
        <Route path="/wallet" element={<WalletInfo />} />
        <Route path="*" element={<ErrorPage error="Something went wrong" />} />
      </Routes>
    </Suspense>
  );
}
