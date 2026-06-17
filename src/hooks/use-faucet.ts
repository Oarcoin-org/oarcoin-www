"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { formatEther } from "viem";
import {
  useChainId,
  useConnection,
  useReadContract,
  useSwitchChain,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";

import { FAUCET_CONTRACT_ABI, FAUCET_CONTRACT_ADDRESS } from "@/lib/config/contract";
import { TARGET_CHAIN } from "@/lib/config/wagmi.config";
import {
  formatNextClaimTimestamp,
  getNextClaimLabel,
  secondsUntilTimestamp,
} from "@/lib/utils/faucet-stats";
import { formatCountdown } from "@/lib/utils/format-countdown";

function formatOarAmount(value: bigint | undefined): number {
  if (value === undefined) return 0;
  return Number(formatEther(value));
}

function readBigInt(value: unknown): bigint | undefined {
  return typeof value === "bigint" ? value : undefined;
}

function readBoolean(value: unknown): boolean | undefined {
  return typeof value === "boolean" ? value : undefined;
}

const LIVE_READ_QUERY = { staleTime: 0 } as const;

export function useFaucet() {
  const { address, isConnected } = useConnection();
  const chainId = useChainId();
  const { mutateAsync: switchChain } = useSwitchChain();
  const queryClient = useQueryClient();
  const processedClaimTxRef = useRef<`0x${string}` | null>(null);

  const walletReadConfig = {
    chainId: TARGET_CHAIN.id,
    query: { enabled: !!address, ...LIVE_READ_QUERY },
  } as const;

  const {
    data: claimAmountRaw,
    refetch: refetchClaimAmount,
    isPending: isPendingClaimAmount,
  } = useReadContract({
    address: FAUCET_CONTRACT_ADDRESS,
    abi: FAUCET_CONTRACT_ABI,
    functionName: "claimAmount",
    chainId: TARGET_CHAIN.id,
  });

  const {
    data: faucetBalanceRaw,
    refetch: refetchFaucetBalance,
    isPending: isPendingFaucetBalance,
  } = useReadContract({
    address: FAUCET_CONTRACT_ADDRESS,
    abi: FAUCET_CONTRACT_ABI,
    functionName: "faucetBalance",
    chainId: TARGET_CHAIN.id,
    query: LIVE_READ_QUERY,
  });

  const {
    data: cooldownRaw,
    refetch: refetchCooldownPeriod,
    isPending: isPendingCooldown,
  } = useReadContract({
    address: FAUCET_CONTRACT_ADDRESS,
    abi: FAUCET_CONTRACT_ABI,
    functionName: "COOLDOWN",
    chainId: TARGET_CHAIN.id,
  });

  const {
    data: canClaimRaw,
    refetch: refetchCanClaim,
    isPending: isPendingCanClaim,
  } = useReadContract({
    address: FAUCET_CONTRACT_ADDRESS,
    abi: FAUCET_CONTRACT_ABI,
    functionName: "canClaim",
    args: address ? [address] : undefined,
    ...walletReadConfig,
  });

  const {
    data: timeUntilNextClaimRaw,
    refetch: refetchTimeUntilNextClaim,
    isPending: isPendingTimeUntilClaim,
  } = useReadContract({
    address: FAUCET_CONTRACT_ADDRESS,
    abi: FAUCET_CONTRACT_ABI,
    functionName: "timeUntilNextClaim",
    args: address ? [address] : undefined,
    ...walletReadConfig,
  });

  const {
    data: nextClaimTimeRaw,
    refetch: refetchNextClaimTime,
    isPending: isPendingNextClaimTime,
  } = useReadContract({
    address: FAUCET_CONTRACT_ADDRESS,
    abi: FAUCET_CONTRACT_ABI,
    functionName: "nextClaimTime",
    args: address ? [address] : undefined,
    ...walletReadConfig,
  });

  const {
    data: totalOarDistributedRaw,
    refetch: refetchTotalOarDistributed,
    isPending: isPendingTotalOarDistributed,
  } = useReadContract({
    address: FAUCET_CONTRACT_ADDRESS,
    abi: FAUCET_CONTRACT_ABI,
    functionName: "totalOarDistributed",
    chainId: TARGET_CHAIN.id,
    query: LIVE_READ_QUERY,
  });

  const {
    data: totalEarnedRaw,
    refetch: refetchTotalEarned,
    isPending: isPendingTotalEarned,
  } = useReadContract({
    address: FAUCET_CONTRACT_ADDRESS,
    abi: FAUCET_CONTRACT_ABI,
    functionName: "totalEarned",
    args: address ? [address] : undefined,
    ...walletReadConfig,
  });

  const {
    mutateAsync: submitClaim,
    data: txHash,
    isPending: isClaimPending,
    error: writeError,
    reset: resetWrite,
  } = useWriteContract();

  const {
    data: receipt,
    isFetching: isConfirming,
    isSuccess: isConfirmed,
    isError: isTxError,
    error: txError,
  } = useWaitForTransactionReceipt({
    hash: txHash,
    chainId: TARGET_CHAIN.id,
    query: { enabled: Boolean(txHash) },
  });

  const cooldownPeriod = Number(readBigInt(cooldownRaw) ?? BigInt(0));
  const timeUntilNextClaim = Number(readBigInt(timeUntilNextClaimRaw) ?? BigInt(0));
  const nextClaimTime = Number(readBigInt(nextClaimTimeRaw) ?? BigInt(0));

  const contractCooldownSeconds = useMemo(() => {
    if (readBoolean(canClaimRaw)) return 0;
    if (timeUntilNextClaim > 0) return timeUntilNextClaim;
    return secondsUntilTimestamp(nextClaimTime);
  }, [canClaimRaw, timeUntilNextClaim, nextClaimTime]);

  const [cooldownSeconds, setCooldownSeconds] = useState(0);

  useEffect(() => {
    let seconds = contractCooldownSeconds;

    const syncCountdown = () => {
      setCooldownSeconds(seconds);
    };

    syncCountdown();
    if (seconds <= 0) return;

    const timer = window.setInterval(() => {
      seconds = Math.max(0, seconds - 1);
      syncCountdown();
    }, 1000);

    return () => window.clearInterval(timer);
  }, [contractCooldownSeconds]);

  const refetchAll = useCallback(async () => {
    await Promise.all([
      refetchClaimAmount(),
      refetchFaucetBalance(),
      refetchCooldownPeriod(),
      refetchCanClaim(),
      refetchTimeUntilNextClaim(),
      refetchNextClaimTime(),
      refetchTotalOarDistributed(),
      refetchTotalEarned(),
    ]);
  }, [
    refetchClaimAmount,
    refetchFaucetBalance,
    refetchCooldownPeriod,
    refetchCanClaim,
    refetchTimeUntilNextClaim,
    refetchNextClaimTime,
    refetchTotalOarDistributed,
    refetchTotalEarned,
  ]);

  useEffect(() => {
    const confirmedTxHash = receipt?.transactionHash;
    if (!isConfirmed || !confirmedTxHash) return;
    if (processedClaimTxRef.current === confirmedTxHash) return;

    processedClaimTxRef.current = confirmedTxHash;

    const syncAfterClaim = async () => {
      await queryClient.invalidateQueries();
      await refetchAll();

      // Some RPC providers briefly return pre-claim state right after confirmation.
      await new Promise((resolve) => window.setTimeout(resolve, 1500));
      await refetchAll();

      resetWrite();
    };

    void syncAfterClaim();
  }, [isConfirmed, receipt?.transactionHash, queryClient, refetchAll, resetWrite]);

  const ensureCorrectChain = useCallback(async () => {
    if (chainId === TARGET_CHAIN.id) return true;

    try {
      await switchChain({ chainId: TARGET_CHAIN.id });
      return true;
    } catch {
      return false;
    }
  }, [chainId, switchChain]);

  const claim = useCallback(async () => {
    if (!address) {
      throw new Error("Connect your wallet to claim OAR.");
    }

    const onCorrectChain = await ensureCorrectChain();
    if (!onCorrectChain) {
      throw new Error(`Switch to ${TARGET_CHAIN.name} to claim OAR.`);
    }

    if (readBoolean(canClaimRaw) === false) {
      throw new Error("Claim cooldown is still active.");
    }

    await submitClaim({
      address: FAUCET_CONTRACT_ADDRESS,
      abi: FAUCET_CONTRACT_ABI,
      functionName: "claim",
      chainId: TARGET_CHAIN.id,
    });
  }, [address, ensureCorrectChain, canClaimRaw, submitClaim]);

  const claimAmount = useMemo(
    () => formatOarAmount(readBigInt(claimAmountRaw)),
    [claimAmountRaw]
  );

  const faucetBalance = useMemo(
    () => formatOarAmount(readBigInt(faucetBalanceRaw)),
    [faucetBalanceRaw]
  );

  const totalDistributed = useMemo(
    () => formatOarAmount(readBigInt(totalOarDistributedRaw)),
    [totalOarDistributedRaw]
  );

  const totalEarned = useMemo(
    () => formatOarAmount(readBigInt(totalEarnedRaw)),
    [totalEarnedRaw]
  );

  const canClaim = readBoolean(canClaimRaw) === true;
  const isClaimStatusLoading =
    isConnected &&
    (isPendingCanClaim || isPendingTimeUntilClaim || isPendingNextClaimTime);

  const formattedCountdown = formatCountdown(cooldownSeconds);
  const nextClaimLabel = getNextClaimLabel({
    isConnected,
    canClaim,
    isClaimStatusLoading,
    cooldownSeconds,
    formattedCountdown,
  });
  const nextClaimAtLabel = formatNextClaimTimestamp(nextClaimTime);

  const isWrongNetwork = isConnected && chainId !== TARGET_CHAIN.id;
  const isClaiming = isClaimPending || (Boolean(txHash) && isConfirming);
  const claimError = writeError ?? txError;

  const isStatsLoading =
    isPendingClaimAmount ||
    isPendingFaucetBalance ||
    isPendingCooldown ||
    isPendingTotalOarDistributed;

  const isEarnedLoading = isConnected && isPendingTotalEarned;

  const isClaimDisabled =
    !isConnected ||
    isClaiming ||
    isClaimStatusLoading ||
    readBoolean(canClaimRaw) === false;

  return {
    address,
    isConnected,
    isStatsLoading,
    isEarnedLoading,
    isClaimStatusLoading,
    isClaimDisabled,
    isWrongNetwork,
    claimAmount,
    faucetBalance,
    totalDistributed,
    totalEarned,
    canClaim,
    nextClaimLabel,
    nextClaimAtLabel,
    timeUntilNextClaim,
    nextClaimTime,
    cooldownSeconds,
    cooldownPeriod,
    claim,
    refetchAll,
    isClaiming,
    isConfirmed,
    isTxError,
    claimError,
  };
}
