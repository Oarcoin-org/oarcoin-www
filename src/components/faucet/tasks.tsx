"use client";

import { Globe } from "lucide-react";
import Image from "next/image";
import { FaDiscord, FaTelegram, FaXTwitter, FaYoutube } from "react-icons/fa6";

import { useFaucetTasks } from "@/components/faucet/use-faucet-tasks";
import { Button } from "@/components/ui/button";
import { WidthConstraint } from "@/components/ui/width-constraint";
import { FAUCET } from "@/lib/constants";
import type { FaucetTask, FaucetTaskPlatform } from "@/lib/interfaces";
import { cn } from "@/lib/utils";

const ICON_CLASS = "size-5 shrink-0";

const PLATFORM_ICONS: Record<
  Exclude<FaucetTaskPlatform, "custom">,
  React.ComponentType<{ className?: string }>
> = {
  x: FaXTwitter,
  telegram: FaTelegram,
  youtube: FaYoutube,
  discord: FaDiscord,
};

function TaskIcon({ task }: { task: FaucetTask }) {
  if (task.logoUrl) {
    return (
      <Image
        src={task.logoUrl}
        alt=""
        width={20}
        height={20}
        className={cn(ICON_CLASS, "object-contain")}
      />
    );
  }

  const Icon = task.platform === "custom" ? Globe : PLATFORM_ICONS[task.platform];

  return <Icon className={ICON_CLASS} aria-hidden="true" />;
}

type TaskRowProps = {
  task: FaucetTask;
  isCompleted: boolean;
  onComplete: (taskId: string) => void;
};

function TaskRow({ task, isCompleted, onComplete }: TaskRowProps) {
  const handleComplete = () => {
    if (isCompleted) return;
    onComplete(task.id);
  };

  return (
    <div className="flex flex-col gap-3 border-b border-foreground px-6 py-5 last:border-b-0 sm:flex-row sm:items-center sm:justify-between sm:px-7 sm:py-6">
      <div className="flex items-center gap-4">
        <TaskIcon task={task} />
        <p className="text-sm sm:text-base">{task.label}</p>
      </div>
      <Button
        type="button"
        variant="outline"
        className="w-full bg-transparent rounded-[10px] py-2 sm:w-auto"
        onClick={handleComplete}
        disabled={isCompleted}
      >
        {isCompleted ? "Completed" : "Complete"}
      </Button>
    </div>
  );
}

const FaucetTasks = ({ tasks: serverTasks }: { tasks: FaucetTask[] }) => {
  const { tasksSectionTitle } = FAUCET;
  const { tasks, completedTaskIds, completeTask } = useFaucetTasks(serverTasks);

  if (tasks.length === 0) return null;

  return (
    <section className="pb-20 sm:pb-28">
      <WidthConstraint className="max-w-xl space-y-4">
        <h2 className="font-heading text-xl sm:text-2xl">{tasksSectionTitle}</h2>
        <div className="border border-foreground">
          {tasks.map((task) => (
            <TaskRow
              key={task.id}
              task={task}
              isCompleted={completedTaskIds.includes(task.id)}
              onComplete={completeTask}
            />
          ))}
        </div>
      </WidthConstraint>
    </section>
  );
};

export default FaucetTasks;
