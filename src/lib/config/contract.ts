import type { Abi } from "viem";

import faucetAbi from "../../../contract.json";
import { TARGET_CHAIN } from "./wagmi.config";

export const FAUCET_CONTRACT_ABI = faucetAbi as Abi;

export const FAUCET_CONTRACT_ADDRESS = (process.env.NEXT_PUBLIC_FAUCET_CONTRACT_ADDRESS ??
  "0x25A1eC751FF7FFBeD85d9c9cE7e66CD7cb989C41") as `0x${string}`;

export const CHAINS = {
  target: {
    id: TARGET_CHAIN.id,
    hex: `0x${TARGET_CHAIN.id.toString(16)}`,
    name: TARGET_CHAIN.name,
  },
} as const;
