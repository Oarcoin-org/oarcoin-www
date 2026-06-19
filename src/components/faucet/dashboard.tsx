"use client";

import { toast } from "sonner";

import { StatValue } from "@/components/faucet/stat-value";
import { useFaucetTasks } from "@/components/faucet/use-faucet-tasks";
import { Button } from "@/components/ui/button";
import { WidthConstraint } from "@/components/ui/width-constraint";
import { useFaucet } from "@/hooks/use-faucet";
import { TARGET_CHAIN } from "@/lib/config/wagmi.config";
import { FAUCET } from "@/lib/constants";
import type { FaucetTask } from "@/lib/interfaces";
import { getErrorMessage } from "@/lib/utils";
import { formatStatValue } from "@/lib/utils/faucet-stats";

const DEFAULT_CLAIM_AMOUNT = 20;

const FaucetDashboard = ({ tasks }: { tasks: FaucetTask[] }) => {
  const { claimLabel } = FAUCET;
  const {
    isConnected,
    isStatsLoading,
    isEarnedLoading,
    isClaimStatusLoading,
    isClaimDisabled,
    isWrongNetwork,
    claimAmount,
    totalDistributed,
    totalEarned,
    nextClaimLabel,
    nextClaimAtLabel,
    claim,
    isClaiming,
  } = useFaucet();
  const { allTasksComplete } = useFaucetTasks(tasks);

  const dailyClaimAmount = claimAmount > 0 ? claimAmount : DEFAULT_CLAIM_AMOUNT;
  const tasksGateActive = isConnected && !allTasksComplete;

  const handleClaim = async () => {
    if (!allTasksComplete) {
      toast.error("Complete all tasks before claiming.");
      return;
    }

    try {
      await claim();
    } catch (error) {
      toast.error(getErrorMessage(error, "Unable to submit claim."));
    }
  };

  return (
    <section className="pb-10 pt-8 sm:pb-12">
      <WidthConstraint className="max-w-xl space-y-6 sm:space-y-8">
        <p className="text-center font-heading">
          Total OAR Distributed:{" "}
          <span className="font-sans text-lg font-bold sm:text-xl">
            {isStatsLoading ? "—" : formatStatValue(totalDistributed)}
          </span>
        </p>

        <div className="border border-foreground">
          <div className="flex flex-col gap-5 border-b border-foreground bg-muted px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-7 sm:py-7">
            <div>
              <p className="font-heading text-sm sm:text-base">Daily Faucet</p>
              <StatValue value={formatStatValue(dailyClaimAmount)} unit="OAR" />
              {isConnected && !isClaimStatusLoading && nextClaimAtLabel !== "Ready" && (
                <p className="font-sans text-xs text-muted-foreground">
                  Available at {nextClaimAtLabel}
                </p>
              )}
            </div>
            <div className="flex flex-col items-start gap-1.5 sm:items-end">
              <Button
                type="button"
                className="min-w-28 rounded-lg border border-foreground bg-[oklch(0.84_0.05_250)] font-sans text-foreground hover:bg-[oklch(0.80_0.05_250)]"
                disabled={isClaimDisabled || tasksGateActive}
                onClick={handleClaim}
              >
                {isClaiming ? "Claiming…" : claimLabel}
              </Button>
              <p className="font-sans text-xs font-semibold">
                Next Claim: {isClaimStatusLoading ? "Loading…" : nextClaimLabel}
              </p>
              {isWrongNetwork && (
                <p className="max-w-xs text-left text-xs text-destructive sm:text-right">
                  Switch to {TARGET_CHAIN.name} to claim.
                </p>
              )}
            </div>
          </div>

          <div>
            <div className="px-6 py-6 sm:px-7 sm:py-7">
              <p className="font-heading text-sm sm:text-base">Total Earned</p>
              <StatValue
                value={formatStatValue(totalEarned)}
                unit="OAR"
                isLoading={isEarnedLoading}
              />
              {tasksGateActive && (
                <p className="max-w-xs text-xs text-muted-foreground">
                  Complete all tasks to claim.
                </p>
              )}
            </div>
          </div>
        </div>
      </WidthConstraint>
    </section>
  );
};

export default FaucetDashboard;
