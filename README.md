# 🪙 Token Dashboard

A modern crypto portfolio and market dashboard built with React 19, TypeScript, Vite, Tailwind, Wagmi, RainbowKit, Moralis, and CoinGecko APIs.
This project demonstrates my skills in frontend engineering, state management, API integration, and data visualization, while delivering a polished and responsive user experience.

[🔗 Live Demo](https://bronex25.github.io/token-dashboard/)

## ✨ Features

• 📊 Wallet Overview — cross-chain balances, USD values, and transaction history (via Moralis EVM API)
• 🌍 Global Market Stats — real-time data from CoinGecko
• 🚀 Trending Coins & Top Gainers with sparklines and insights
• 📑 Paginated & Sortable Token Tables using TanStack Table
• 📈 Detailed Coin Pages — interactive charts with selectable time ranges
• 📰 Crypto News Feed from NewsData API
• 🌗 Light/Dark Mode with theme persistence
• 📱 Responsive, Accessible UI (built with ShadCN & Tailwind)

## 🛠️ Tech Stack

• Frontend: React 19, TypeScript, Vite
• UI/Styling: Tailwind CSS v4, ShadCN UI
• Web3 Tools: Wagmi, Viem, RainbowKit (wallet connection & UX)
• APIs:
• Moralis (balances, transactions, wallet net worth)
• CoinGecko (markets, coins, charts, globals)
• NewsData (crypto news)
• Data & Visualization: TanStack Table, Recharts
• Tooling: ESLint + Prettier

## 📄 Pages & Flow

• Home → global market data, trending coins, gainers, news feed
• Cryptocurrencies → paginated/sortable token list with sparkline trends
• CoinInfo/:id → detailed coin stats and interactive price chart
• WalletInfo → connect wallet, view balances, net worth, and transactions
• ErrorPage → fallback route for unknown pages

## 📂 Project structure

src/
components/ # UI components (cards, charts, tables, skeletons)
ui/ # ShadCN components
Skeletons/ # Loading states
context/ # React contexts (e.g., TokenContext)
lib/ # API utilities (CoinGecko, Moralis, NewsData)
pages/ # Route pages (Home, Cryptocurrencies, CoinInfo, WalletInfo)
types/ # Type definitions
App.tsx, Routes.tsx # App shell and routing
Layout.tsx # App layout and header/footer
