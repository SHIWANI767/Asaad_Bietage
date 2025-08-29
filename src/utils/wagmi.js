"use client";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  argentWallet,
  coinbaseWallet,
  ledgerWallet,
  metaMaskWallet,
  rabbyWallet,
  rainbowWallet,
  safeWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { createConfig, http } from "wagmi";
import { defineChain } from "viem";
import { bsc, bscTestnet } from "wagmi/chains";
import { ACTIVE_NETWORK, NetworkContextName, RPC_URL, explorerURL } from ".";

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;
const isProdEnv = process.env.NEXT_PUBLIC_NODE_ENV === "production";

if (!projectId) {
  throw new Error("WalletConnect Project ID is not defined");
}

const connectors = connectorsForWallets(
  [
    {
      groupName: "Other",
      wallets: [
        metaMaskWallet,
        rainbowWallet,
        walletConnectWallet,
        ledgerWallet,
        rabbyWallet,
        coinbaseWallet,
        argentWallet,
        safeWallet,
      ],
    },
  ],
  {
    appName: "Bitedge.app",
    projectId: projectId,
    appUrl: process.env.REDIRECT_URI,
  }
);

export const Fiero = {
  id: ACTIVE_NETWORK,
  name: "Fieres Mainnet",
  network: "Fieres Mainnet",
  iconUrl: "https://fieres.io/images/fearo.png",
  // iconUrl: process.env.REDIRECT_URI + "/images/fearo.png",
  iconBackground: "#fff",
  nativeCurrency: {
    decimals: 18,
    name: "Fiero",
    symbol: "FIERO",
  },
  rpcUrls: {
    public: { http: [RPC_URL] },
    default: { http: [RPC_URL] },
  },
  blockExplorers: {
    etherscan: {
      name: "Fieres Mainnet",
      url: explorerURL,
    },
    default: {
      name: "Fieres Mainnet",
      url: explorerURL,
    },
  },
  contracts: {
    multicall3: {
      address: "",
      blockCreated: "",
    },
  },
};

const transports = isProdEnv
  ? {
      [bsc.id]: http(),
      [Fiero.id]: http(),
    }
  : {
      [Fiero.id]: http(),
      [bsc.id]: http(),
    };

export const wagmiConfig = createConfig({
  chains: isProdEnv ? [bsc, Fiero] : [bsc, Fiero],
  connectors,
  transports,
  ssr: false,
});
