"use client";

import { CopyIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { RESERVE } from "@/lib/constants";

type ReserveDashboardComingSoonProps = {
  children: React.ReactNode;
};

const ReserveDashboardComingSoon = ({ children }: ReserveDashboardComingSoonProps) => {
  const { reserveWallet } = RESERVE;
  const [copied, setCopied] = React.useState(false);

  const onCopyWallet = async () => {
    if (!reserveWallet) return;

    try {
      await navigator.clipboard.writeText(reserveWallet);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      // clipboard may be unavailable
    }
  };

  return (
    <div className="relative">
      <div aria-hidden="true" className="pointer-events-none select-none blur-[6px]">
        {children}
      </div>

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-5 px-4 sm:px-6">
        <p className="text-center font-sans text-3xl font-medium uppercase tracking-tight text-foreground">
          Coming Soon
        </p>

        <div className="w-full max-w-md rounded-[1.75rem] bg-white px-8 py-9 shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
          <p className="text-center font-heading leading-snug text-foreground">
            Meanwhile, you can track our Reserve Wallet...
          </p>

          <div className="mt-6 flex items-center gap-3 rounded-[0.65rem] bg-muted px-4 py-3.5">
            <code className="min-w-0 flex-1 truncate font-heading text-sm">
              {reserveWallet}
            </code>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="shrink-0"
              onClick={onCopyWallet}
              disabled={!reserveWallet}
              aria-label={copied ? "Copied" : "Copy wallet address"}
            >
              <CopyIcon />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReserveDashboardComingSoon;
