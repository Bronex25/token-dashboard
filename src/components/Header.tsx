import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-muted rounded-md shadow-sm mb-4">
      <h1 className="text-lg font-semibold">Token Dashboard</h1>
      <ConnectButton showBalance></ConnectButton>
    </header>
  );
};
