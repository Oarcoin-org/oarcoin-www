"use client";

import { Check, CopyIcon, InfoIcon } from "lucide-react";
import * as React from "react";

import { AreaChart } from "@/components/area-chart";
import { Button } from "@/components/ui/button";
import { WidthConstraint } from "@/components/ui/width-constraint";
import { RESERVE } from "@/lib/constants";
import { ReserveChartTimeframe } from "@/lib/interfaces";
import { cn } from "@/lib/utils";

const TIMEFRAMES: ReserveChartTimeframe[] = ["24H", "7D", "30D"];

function formatUsd(amount: number) {
  return `~ $${amount.toLocaleString("en-US")}`;
}

function truncateAddress(address: string) {
  if (!address) return "—";
  return `${address.slice(0, 6)}....${address.slice(-4)}`;
}

function formatReserveValue(value: number) {
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)}M`;
  }
  return `$${value}K`;
}

function toChartData(labels: string[], values: number[]) {
  return labels.map((label, index) => ({
    date: label,
    Reserve: values[index] ?? 0,
  }));
}

const ReserveDashboard = () => {
  const { stats, reserveWallet, growthChart } = RESERVE;
  const [timeframe, setTimeframe] = React.useState<ReserveChartTimeframe>("7D");
  const [copied, setCopied] = React.useState(false);

  const chart = growthChart[timeframe];

  const onCopyWallet = async () => {
    try {
      await navigator.clipboard.writeText(reserveWallet);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      // clipboard may be unavailable
    }
  };

  return (
    <section className="pb-16 pt-10 sm:pb-20 sm:pt-14">
      <WidthConstraint className="space-y-8 sm:space-y-10 max-w-5xl">
        <div className="border border-foreground">
          <div className="grid lg:grid-cols-[minmax(0,1fr)_240px] xl:grid-cols-[minmax(0,1fr)_280px]">
            <div className="border-b border-foreground lg:border-b-0 lg:border-r">
              <div className="border-b border-foreground bg-muted">
                <div className="flex items-center justify-between gap-3 px-5 py-4 sm:px-8 sm:py-5">
                  <p className="font-heading text-lg leading-none">Reserve Balance</p>
                  <InfoIcon
                    className="size-4 shrink-0 text-foreground"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </div>
                <div className="border-t border-foreground px-5 py-6 sm:px-8 sm:py-8">
                  <p className="font-sans text-4xl font-bold tracking-tight">
                    {stats.reserveBalanceOar.toLocaleString("en-US")}{" "}
                    <span className="text-3xl font-bold">OAR</span>
                  </p>
                  <p className="mt-2 font-sans text-base font-normal text-muted-foreground">
                    {formatUsd(stats.reserveBalanceUsd)}
                  </p>
                  <p className="mt-6 font-sans text-xs font-normal text-foreground">
                    This reserve is funded by 1% of every OAR transaction
                  </p>
                </div>
              </div>
              <div className="px-5 py-8 sm:px-8 sm:py-10">
                <p className="font-heading text-lg leading-none">Holders</p>
                <p className="mt-3 font-sans text-4xl font-bold tracking-tight">
                  {stats.holders.toLocaleString("en-US")}
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-1">
              <div className="border-b border-foreground px-5 py-8 sm:px-8 sm:py-10 lg:border-b">
                <p className="font-heading text-base sm:text-lg">Live Price</p>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <p className="font-sans text-3xl font-semibold tracking-tight sm:text-4xl">
                    ${stats.livePrice}
                  </p>
                  <span className="rounded-full border border-border bg-background px-3 py-1 font-sans text-xs font-medium text-[#15803d] sm:text-sm">
                    +{stats.priceChange24h}% in 24h
                  </span>
                </div>
              </div>
              <div className="px-5 py-8 sm:px-8 sm:py-10">
                <p className="font-heading text-base sm:text-lg">Market Cap</p>
                <p className="mt-3 font-sans text-3xl font-semibold tracking-tight sm:text-4xl">
                  {stats.marketCapLabel}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden lg:block border border-foreground">
          <div className="flex flex-col gap-4 border-b border-foreground px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <p className="font-heading text-xl sm:text-2xl">Reserve Growth</p>
            <div className="flex items-center gap-3">
              {TIMEFRAMES.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setTimeframe(option)}
                  className={cn(
                    "font-sans text-sm font-medium transition-colors",
                    timeframe === option
                      ? "rounded-md bg-primary px-4 py-1.5 text-primary-foreground"
                      : "text-foreground hover:text-muted-foreground"
                  )}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-visible px-4 py-6 sm:py-8">
            <AreaChart
              className="h-[280px] sm:h-[320px]"
              data={toChartData(chart.labels, chart.values)}
              index="date"
              categories={["Reserve"]}
              colors={["primary"]}
              valueFormatter={formatReserveValue}
              showLegend={false}
              yAxisWidth={80}
              tickGap={8}
            />
          </div>

          <div className="flex flex-col gap-4 border-t border-foreground px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <div className="flex flex-wrap items-center gap-3 font-sans text-sm sm:text-base">
              <span className="text-muted-foreground">Reserve Wallet:</span>
              <code className="font-mono text-sm">{truncateAddress(reserveWallet)}</code>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-8 gap-1.5 rounded-md border-border bg-muted px-3 shadow-none hover:bg-muted/80"
                onClick={onCopyWallet}
                disabled={!reserveWallet}
              >
                {copied ? "Copied" : "Copy"}
                <CopyIcon />
              </Button>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#15803d] sm:text-base">
              <span
                className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#22c55e]"
                aria-hidden="true"
              >
                <Check className="size-3 text-white" strokeWidth={3} />
              </span>
              <span className="font-heading text-foreground">Verified on Blockchain</span>
            </div>
          </div>
        </div>
      </WidthConstraint>
    </section>
  );
};

export default ReserveDashboard;
