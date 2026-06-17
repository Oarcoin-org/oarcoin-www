import { createConfig, http } from "wagmi";
import { baseSepolia, bsc, mainnet, sepolia } from "wagmi/chains";

const isDev = process.env.NODE_ENV === "development";

// Dev: Base Sepolia. Production: BSC Mainnet.
export const TARGET_CHAIN = isDev ? baseSepolia : bsc;

export const wagmiConfig = createConfig({
  chains: [mainnet, sepolia, baseSepolia, bsc],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [baseSepolia.id]: http(),
    [bsc.id]: http(),
  },
});
