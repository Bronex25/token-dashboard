import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from "../config.ts";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "./index.css";
import App from "./App.tsx";
import "@rainbow-me/rainbowkit/styles.css";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <RainbowKitProvider>
        <StrictMode>
          <App />
        </StrictMode>
      </RainbowKitProvider>
    </QueryClientProvider>
  </WagmiProvider>,
);
