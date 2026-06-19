import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { WidthConstraint } from "@/components/ui/width-constraint";
import { START_STEPS } from "@/lib/constants";
import { Step } from "@/lib/interfaces";
import { cn } from "@/lib/utils";

type StepCardProps = {
  step: Step;
};

function StepCard({ step }: StepCardProps) {
  return (
    <article className="border-b last:border-b-0 border-foreground">
      <WidthConstraint
        className={cn(
          "grid gap-6 py-10 sm:py-14",
          "lg:grid-cols-[auto_minmax(0,32rem)] lg:items-start lg:gap-x-12 xl:gap-x-20"
        )}
      >
        <div className="flex gap-2 md:gap-5 lg:gap-20">
          <p className="font-heading text-3xl sm:text-4xl">{step.number}</p>
          <h3 className="font-heading text-3xl sm:text-4xl">{step.title}</h3>
        </div>
        <div className="space-y-6">
          <p className="text-sm leading-relaxed text-foreground/80 sm:text-base">
            {step.description}
          </p>
          {step.href ? (
            <Button variant="outline" className="gap-2" asChild>
              <Link
                href={step.href}
                target={step.href?.startsWith("http") ? "_blank" : undefined}
                rel={step.href?.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                {step.buttonLabel}
                <ArrowUpRight />
              </Link>
            </Button>
          ) : (
            <Button variant="outline" className="gap-2" disabled>
              {step.buttonLabel}
              <ArrowUpRight />
            </Button>
          )}
        </div>
      </WidthConstraint>
    </article>
  );
}

const Steps = () => {
  return (
    <section className="py-16 sm:py-24" data-aos="fade-up">
      <div className="border-t border-foreground">
        {START_STEPS.map((step) => (
          <StepCard key={step.number} step={step} />
        ))}
      </div>
    </section>
  );
};

export default Steps;
