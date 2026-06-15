import { Button } from "@/components/ui/button";
import { WidthConstraint } from "@/components/ui/width-constraint";
import { FAUCET } from "@/lib/constants";

function StatValue({ value, unit }: { value: string | number; unit: string }) {
  return (
    <p className="mt-0.5 font-sans text-2xl tracking-tight sm:text-3xl">
      <span className="font-bold">{value}</span>{" "}
      <span className="font-normal">{unit}</span>
    </p>
  );
}

const FaucetDashboard = () => {
  const { stats, claimLabel } = FAUCET;

  return (
    <section className="pb-10 pt-8 sm:pb-12 sm:pt-10">
      <WidthConstraint className="max-w-xl space-y-6 sm:space-y-8">
        <p className="text-center font-heading text-sm sm:text-base">
          Total OAR Distributed:{" "}
          <span className="font-sans text-lg font-bold sm:text-xl">
            {stats.totalDistributed.toLocaleString("en-US")}
          </span>
        </p>

        <div className="border border-foreground">
          <div className="flex flex-col gap-5 border-b border-foreground bg-muted px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-7 sm:py-7">
            <div>
              <p className="font-heading text-sm sm:text-base">Daily Faucet</p>
              <StatValue value={stats.dailyReward.toLocaleString("en-US")} unit="OAR" />
            </div>
            <div className="flex flex-col items-start gap-1.5 sm:items-end">
              <Button className="min-w-28 rounded-lg border border-foreground bg-[oklch(0.84_0.05_250)] font-sans text-foreground hover:bg-[oklch(0.80_0.05_250)]">
                {claimLabel}
              </Button>
              <p className="font-sans text-xs font-semibold">
                Next Claim: {stats.nextClaimTime}
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2">
            <div className="border-b border-foreground px-6 py-6 sm:border-b-0 sm:px-7 sm:py-7">
              <p className="font-heading text-sm sm:text-base">Total Earned</p>
              <StatValue value={stats.totalEarned.toLocaleString("en-US")} unit="OAR" />
            </div>
            <div className="border-t border-foreground px-6 py-6 sm:border-t-0 sm:border-l sm:px-7 sm:py-7">
              <p className="font-heading text-sm sm:text-base">Streak</p>
              <StatValue value={stats.streakDays} unit="Days" />
            </div>
          </div>
        </div>
      </WidthConstraint>
    </section>
  );
};

export default FaucetDashboard;
