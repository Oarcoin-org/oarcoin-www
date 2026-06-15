import { getColorClassName } from "@/lib/chart-utils";
import { cn } from "@/lib/utils";

import type { ChartTooltipProps } from "./types";

export const ChartTooltip = ({
  active,
  payload,
  label,
  valueFormatter,
}: ChartTooltipProps) => {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div
      className={cn(
        "rounded-md border border-foreground bg-background text-sm shadow-md"
      )}
    >
      <div className="border-b border-inherit px-4 py-2">
        <p className="font-medium text-foreground">{label}</p>
      </div>
      <div className="space-y-1 px-4 py-2">
        {payload.map(({ value, category, color }, index) => (
          <div
            key={`id-${index}`}
            className="flex items-center justify-between space-x-8"
          >
            <div className="flex items-center space-x-2">
              <span
                aria-hidden="true"
                className={cn(
                  "h-[3px] w-3.5 shrink-0 rounded-full",
                  getColorClassName(color, "bg")
                )}
              />
              <p className="text-right whitespace-nowrap text-muted-foreground">
                {category}
              </p>
            </div>
            <p className="text-right font-medium whitespace-nowrap text-foreground tabular-nums">
              {valueFormatter(value)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
