"use client";

import { CopyIcon } from "lucide-react";
import * as React from "react";
import { useReadContract } from "wagmi";

import { Button } from "@/components/ui/button";
import { FAUCET_CONTRACT_ABI, FAUCET_CONTRACT_ADDRESS } from "@/lib/config/contract";
import { TARGET_CHAIN } from "@/lib/config/wagmi.config";
import { cn } from "@/lib/utils";

export type AddressProps = {
  value?: string;
  className?: string;
};

const Address = ({ value, className }: AddressProps) => {
  const [copied, setCopied] = React.useState(false);

  const { data: oarCoinAddress, isPending } = useReadContract({
    address: FAUCET_CONTRACT_ADDRESS,
    abi: FAUCET_CONTRACT_ABI,
    functionName: "oarCoin",
    chainId: TARGET_CHAIN.id,
  });

  const displayAddress =
    value ?? (typeof oarCoinAddress === "string" ? oarCoinAddress : undefined);

  const onCopy = async () => {
    if (!displayAddress) return;

    try {
      await navigator.clipboard.writeText(displayAddress);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      // clipboard may be unavailable in some contexts
    }
  };

  return (
    <section className={cn("text-center", className)}>
      <h2 className="font-medium">Official Token Address</h2>
      <div className="mt-2 inline-flex items-center overflow-hidden rounded-[0.4rem] border bg-[#EDEDE6] p-1 border-foreground">
        <code className="px-3 py-2 text-xs sm:text-sm">
          {isPending && !displayAddress ? "Loading…" : displayAddress ?? "—"}
        </code>
        <Button
          type="button"
          size="sm"
          className="h-full border-y-0 border-r-0 px-3 py-2 bg-foreground text-white rounded-[0.3rem]"
          onClick={onCopy}
          disabled={!displayAddress}
        >
          {copied ? "Copied" : "Copy"}
          <CopyIcon className="ms-2" />
        </Button>
      </div>
    </section>
  );
};

export default Address;
