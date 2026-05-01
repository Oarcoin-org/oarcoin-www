import { cn } from "@/lib/utils";
import type { JSX, ReactNode } from "react";

export function WidthConstraint({
  ...props
}: {
  children: ReactNode;
  className?: string;
}): JSX.Element {
  return (
    <div className={cn("mx-auto w-full max-w-[1300px] px-5", props.className)}>
      {props.children}
    </div>
  );
}
