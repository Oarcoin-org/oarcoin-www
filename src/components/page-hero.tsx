import * as React from "react";

import { cn } from "@/lib/utils";
import { WidthConstraint } from "./ui/width-constraint";

export type PageHeroProps = {
  title: React.ReactNode;
  description?: React.ReactNode;
  backgroundImage: string;
  actions?: React.ReactNode;
  className?: string;
  contentClassName?: string;
};

const PageHero = ({
  title,
  description,
  backgroundImage,
  actions,
  className,
  contentClassName,
}: PageHeroProps) => {
  return (
    <section
      className={cn(
        "h-screen -mt-14",
        "relative isolate overflow-hidden",
        "bg-background text-foreground",
        "grid grid-rows-2",
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
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-x-0 bottom-0 -z-10",
          "h-[200px]",
          "bg-gradient-to-t from-background to-transparent"
        )}
      />
      <WidthConstraint
        className={cn(
          "flex flex-col items-center justify-center text-center pt-20 lg:pt-32",
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

        {actions ? (
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            {actions}
          </div>
        ) : null}
      </WidthConstraint>
    </section>
  );
};

export default PageHero;
