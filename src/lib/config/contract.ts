import type { Abi } from "viem";
import { baseSepolia } from "wagmi/chains";

import faucetAbi from "../../../contract.json";
import { TARGET_CHAIN } from "./wagmi.config";

export const FAUCET_CONTRACT_ABI = faucetAbi as Abi;

export const FAUCET_CONTRACT_ADDRESS = (
  TARGET_CHAIN.id === baseSepolia.id
    ? process.env.NEXT_PUBLIC_FAUCET_BASE_SEPOLIA_CONTRACT_ADDRESS
    : process.env.NEXT_PUBLIC_FAUCET_BASE_MAINNET_CONTRACT_ADDRESS
) as `0x${string}`;

export const CHAINS = {
  target: {
    id: TARGET_CHAIN.id,
    hex: `0x${TARGET_CHAIN.id.toString(16)}`,
    name: TARGET_CHAIN.name,
  },
} as const;
