import * as React from "react";

import { cn } from "@/lib/utils";
import { WidthConstraint } from "./ui/width-constraint";

export type PageHeroProps = {
  title: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
  contentClassName?: string;
};

const DotPageHeader = ({
  title,
  description,
  className,
  contentClassName,
}: PageHeroProps) => {
  return (
    <section
      className={cn(
        "h-[40vh] -mt-14",
        "relative isolate overflow-hidden",
        "bg-background text-foreground",
        "grid grid-rows-1",
        className
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 -z-10",
          "bg-cover bg-center bg-no-repeat",
          "mix-blend-multiply"
        )}
        style={{ backgroundImage: `url('/assets/hero/dots.svg')` }}
      />
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-x-0 bottom-0 -z-10",
          "h-[150px]",
          "bg-gradient-to-t from-background to-transparent"
        )}
      />
      <WidthConstraint
        className={cn(
          "flex flex-col items-center justify-center text-center pt-20",
          contentClassName
        )}
      >
        <h1
          className={cn(
            "font-heading",
            "text-4xl leading-tight sm:text-5xl sm:leading-tight"
          )}
        >
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
            {description}
          </p>
        )}
      </WidthConstraint>
    </section>
  );
};

export default DotPageHeader;
