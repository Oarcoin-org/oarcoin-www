import { createConfig, http } from "wagmi";
import { base, baseSepolia, mainnet, sepolia } from "wagmi/chains";

const forceProd = process.env.NEXT_PUBLIC_FORCE_PROD === "true";
const useProd = forceProd || process.env.NODE_ENV !== "development";

// Dev: Base Sepolia. Production (or FORCE_PROD): Base Mainnet.
export const TARGET_CHAIN = useProd ? base : baseSepolia;

export const wagmiConfig = createConfig({
  chains: [mainnet, sepolia, baseSepolia, base],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [baseSepolia.id]: http(),
    [base.id]: http(),
  },
});
