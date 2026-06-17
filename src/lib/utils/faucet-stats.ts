export function getNextClaimLabel({
  isConnected,
  canClaim,
  isClaimStatusLoading,
  cooldownSeconds,
  formattedCountdown,
}: {
  isConnected: boolean;
  canClaim: boolean;
  isClaimStatusLoading?: boolean;
  cooldownSeconds: number;
  formattedCountdown: string;
}): string {
  if (!isConnected) return "Connect wallet";
  if (isClaimStatusLoading) return "Loading…";
  if (canClaim) return "Ready";
  if (cooldownSeconds > 0) return formattedCountdown;
  return "Ready";
}

export function formatNextClaimTimestamp(timestampSeconds: number): string {
  if (timestampSeconds <= 0) return "Ready";

  return new Date(timestampSeconds * 1000).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function secondsUntilTimestamp(timestampSeconds: number): number {
  if (timestampSeconds <= 0) return 0;
  return Math.max(0, timestampSeconds - Math.floor(Date.now() / 1000));
}

export function formatStatValue(value: number) {
  return value.toLocaleString("en-US", {
    maximumFractionDigits: value < 1 ? 4 : 2,
  });
}
