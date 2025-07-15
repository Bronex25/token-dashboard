import {
  mainnet,
  sepolia,
  polygon,
  optimism,
  arbitrum,
  base,
} from "wagmi/chains";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";

export const config = getDefaultConfig({
  appName: "token-dashborad",
  projectId: "41899fdb8f0093f7e41168349004f558",
  chains: [mainnet, polygon, optimism, arbitrum, base, sepolia],
});
