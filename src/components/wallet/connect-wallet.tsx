"use client";

import { useEffect, useState } from "react";
import {
  useChainId,
  useChains,
  useConnect,
  useConnection,
  useConnectors,
  useDisconnect,
  useSwitchChain,
} from "wagmi";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TARGET_CHAIN } from "@/lib/config/wagmi.config";
import { cn } from "@/lib/utils";

type ConnectWalletProps = {
  className?: string;
  connectLabel?: string;
};

function truncateAddress(address: string) {
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

export default function ConnectWallet({
  className,
  connectLabel = "Connect Wallet",
}: ConnectWalletProps) {
  const { address, isConnected } = useConnection();
  const chainId = useChainId();
  const chains = useChains();
  const { mutateAsync: connectWallet, isPending: isConnecting } = useConnect();
  const connectors = useConnectors();
  const { disconnect } = useDisconnect();
  const { mutateAsync: switchChain, isPending: isSwitchingChain } = useSwitchChain();

  const [showWalletModal, setShowWalletModal] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [switchFailed, setSwitchFailed] = useState(false);

  const currentChain = chains.find((chain) => chain.id === chainId);
  const isWrongNetwork = isConnected && chainId !== TARGET_CHAIN.id;

  useEffect(() => {
    if (!isConnected || chainId === TARGET_CHAIN.id) return;

    switchChain({ chainId: TARGET_CHAIN.id }).catch(() => {
      setSwitchFailed(true);
    });
  }, [chainId, isConnected, switchChain]);

  const handleWalletSelect = async (connectorId: string) => {
    const connector = connectors.find((item) => item.id === connectorId);
    if (!connector) return;

    try {
      await connectWallet({ connector });
      setShowWalletModal(false);

      window.setTimeout(async () => {
        try {
          await switchChain({ chainId: TARGET_CHAIN.id });
        } catch {
          setSwitchFailed(true);
        }
      }, 100);
    } catch {
      // user rejected connection
    }
  };

  const handleSwitchNetwork = async () => {
    try {
      await switchChain({ chainId: TARGET_CHAIN.id });
    } catch {
      setSwitchFailed(true);
    }
  };

  if (isConnected && address) {
    return (
      <>
        <Button
          type="button"
          className={cn("min-w-40 border-foreground", className)}
          onClick={() => setShowAccountModal(true)}
        >
          {truncateAddress(address)}
        </Button>

        <Dialog open={showAccountModal} onOpenChange={setShowAccountModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Wallet</DialogTitle>
              <DialogDescription>
                Connected to {currentChain?.name ?? "Unknown network"}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="rounded-lg border border-foreground/20 bg-muted px-4 py-3">
                <p className="text-xs text-muted-foreground">Address</p>
                <p className="mt-1 break-all font-mono text-sm">{address}</p>
              </div>

              {isWrongNetwork && switchFailed && (
                <div className="space-y-3 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3">
                  <p className="text-sm text-destructive">
                    Wrong network. Switch to {TARGET_CHAIN.name} to use the faucet.
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    disabled={isSwitchingChain}
                    onClick={handleSwitchNetwork}
                  >
                    Switch to {TARGET_CHAIN.name}
                  </Button>
                </div>
              )}

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => {
                  disconnect();
                  setShowAccountModal(false);
                }}
              >
                Disconnect
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return (
    <>
      <Button
        type="button"
        className={cn("min-w-40 border-foreground", className)}
        disabled={isConnecting}
        onClick={() => setShowWalletModal(true)}
      >
        {isConnecting ? "Connecting…" : connectLabel}
      </Button>

      <Dialog open={showWalletModal} onOpenChange={setShowWalletModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Connect Wallet</DialogTitle>
            <DialogDescription>
              Choose a wallet to connect to Oarcoin on {TARGET_CHAIN.name}.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-2">
            {connectors.map((connector) => (
              <Button
                key={connector.id}
                type="button"
                variant="outline"
                className="justify-start"
                disabled={isConnecting}
                onClick={() => handleWalletSelect(connector.id)}
              >
                {connector.name}
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
