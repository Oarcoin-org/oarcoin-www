"use client";

import ConnectWallet from "@/components/wallet/connect-wallet";
import { FAUCET } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { WidthConstraint } from "../ui/width-constraint";

const FaucetHero = () => {
  const { hero } = FAUCET;

  return (
    <section
      className={cn(
        "-mt-14 min-h-[420px] h-[52vh] sm:min-h-[700px]",
        "relative isolate overflow-hidden",
        "bg-background text-foreground"
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 z-0",
          "bg-cover bg-bottom bg-no-repeat",
          "mix-blend-multiply"
        )}
        style={{ backgroundImage: `url(${hero.backgroundImage})` }}
      />
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-x-0 bottom-0 z-[1]",
          "h-[150px]",
          "bg-gradient-to-t from-background to-transparent"
        )}
      />
      <WidthConstraint
        className={cn(
          "relative z-10 flex min-h-[inherit] flex-col items-center justify-center",
          "px-4 pt-20 pb-12 text-center"
        )}
      >
        <h1
          className={cn(
            "font-heading",
            "text-4xl leading-tight sm:text-5xl sm:leading-tight"
          )}
        >
          {hero.title}
        </h1>
        <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
          {hero.description}
        </p>
        <div className="mt-7">
          <ConnectWallet connectLabel={hero.connectWalletLabel} />
        </div>
      </WidthConstraint>
    </section>
  );
};

export default FaucetHero;
