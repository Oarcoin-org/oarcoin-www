import Link from "next/link";

import { Button } from "@/components/ui/button";
import { WidthConstraint } from "@/components/ui/width-constraint";
import { FAUCET } from "@/lib/constants";
import type { FaucetTask } from "@/lib/interfaces";
import { cn } from "@/lib/utils";

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn("size-5 shrink-0", className)}
      fill="currentColor"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn("size-5 shrink-0", className)}
      fill="currentColor"
    >
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

function TaskIcon({ platform }: { platform: FaucetTask["platform"] }) {
  if (platform === "x") return <XIcon />;
  return <TelegramIcon />;
}

type TaskRowProps = {
  task: FaucetTask;
};

function TaskRow({ task }: TaskRowProps) {
  return (
    <div className="flex flex-col gap-3 border-b border-foreground px-6 py-5 last:border-b-0 sm:flex-row sm:items-center sm:justify-between sm:px-7 sm:py-6">
      <div className="flex items-center gap-4">
        <TaskIcon platform={task.platform} />
        <p className="text-sm sm:text-base">{task.label}</p>
      </div>
      <Button
        variant="outline"
        className="w-full bg-transparent sm:w-auto rounded-[10px] py-2"
        asChild
      >
        <Link
          href={task.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-disabled={task.completed}
        >
          {task.completed ? "Completed" : "Complete"}
        </Link>
      </Button>
    </div>
  );
}

const FaucetTasks = () => {
  const { tasksSectionTitle, tasks } = FAUCET;

  return (
    <section className="pb-20 sm:pb-28">
      <WidthConstraint className="max-w-xl space-y-4">
        <h2 className="font-heading text-xl sm:text-2xl">{tasksSectionTitle}</h2>
        <div className="border border-foreground">
          {tasks.map((task) => (
            <TaskRow key={task.id} task={task} />
          ))}
        </div>
      </WidthConstraint>
    </section>
  );
};

export default FaucetTasks;
