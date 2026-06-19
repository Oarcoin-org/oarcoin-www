"use client";

import { useAtom } from "jotai";
import { useCallback, useEffect } from "react";
import { toast } from "sonner";
import { useConnection } from "wagmi";

import {
  getCompletedTaskIds,
  markTaskComplete,
  upsertFaucetUser,
} from "@/lib/firebase/faucet-user";
import type { FaucetTask } from "@/lib/interfaces";
import { completedTaskIdsAtom } from "@/lib/state/faucet-tasks";
import { getErrorMessage } from "@/lib/utils";

export function useFaucetTasks(tasks: FaucetTask[]) {
  const { address, isConnected } = useConnection();
  const [completedTaskIds, setCompletedTaskIds] = useAtom(completedTaskIdsAtom);

  useEffect(() => {
    if (!isConnected || !address) {
      setCompletedTaskIds([]);
      return;
    }

    const activeIds = tasks.map((task) => task.id);

    const loadStatus = async () => {
      try {
        await upsertFaucetUser(address);
        const completed = await getCompletedTaskIds(address, activeIds);
        setCompletedTaskIds(completed);
      } catch (error) {
        toast.error(getErrorMessage(error, "Unable to load task progress."));
      }
    };

    void loadStatus();
  }, [isConnected, address, tasks, setCompletedTaskIds]);

  const allTasksComplete =
    isConnected &&
    tasks.length > 0 &&
    tasks.every((task) => completedTaskIds.includes(task.id));

  const completeTask = useCallback(
    async (taskId: string) => {
      if (!isConnected || !address) {
        toast.error("Connect your wallet to complete tasks.");
        return;
      }

      if (completedTaskIds.includes(taskId)) return;

      const task = tasks.find((item) => item.id === taskId);
      if (!task) return;

      window.open(task.href, "_blank", "noopener,noreferrer");

      setCompletedTaskIds((current) =>
        current.includes(taskId) ? current : [...current, taskId]
      );

      try {
        await markTaskComplete(address, {
          id: task.id,
          taskId: task.taskId,
          label: task.label,
        });
      } catch (error) {
        setCompletedTaskIds((current) => current.filter((id) => id !== taskId));
        toast.error(getErrorMessage(error, "Unable to save task completion."));
      }
    },
    [isConnected, address, completedTaskIds, setCompletedTaskIds, tasks]
  );

  return { tasks, completedTaskIds, allTasksComplete, completeTask };
}
