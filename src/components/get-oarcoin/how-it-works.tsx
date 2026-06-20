import { TriangleAlert } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { WidthConstraint } from "@/components/ui/width-constraint";
import {
  GET_OARCOIN_HOW_IT_WORKS_STEPS,
  GET_OARCOIN_HOW_IT_WORKS_WARNINGS,
  ROUTES,
} from "@/lib/constants";
import { HowItWorksStep } from "@/lib/interfaces";
import { cn } from "@/lib/utils";

type HowItWorksStepItemProps = {
  step: HowItWorksStep;
};

function HowItWorksStepItem({ step }: HowItWorksStepItemProps) {
  return (
    <article
      className={cn(
        "flex gap-6 border-b border-foreground py-8 sm:flex-row items-center sm:gap-8 sm:py-10",
        "md:gap-12"
      )}
    >
      <p className="font-heading text-xl sm:text-2xl sm:w-14 sm:shrink-0 md:text-3xl">
        {step.number}
      </p>

      <div className="flex size-20 shrink-0 items-center justify-center bg-muted sm:size-24">
        <Image
          src={step.icon}
          alt=""
          width={72}
          height={72}
          className="size-14 object-contain mix-blend-darken sm:size-16"
        />
      </div>

      <p className="font-heading md:text-xl leading-snug sm:text-2xl md:flex-1">
        {step.text}
      </p>
    </article>
  );
}

const HowItWorks = () => {
  return (
    <section className="py-16 sm:py-24" data-aos="fade-up">
      <WidthConstraint className="max-w-3xl px-5">
        <header className="mb-10 space-y-3 text-center sm:mb-14">
          <h2 className="font-heading text-4xl sm:text-5xl">How it works</h2>
          <Link
            href={ROUTES.start}
            className="inline-block font-sans text-sm text-primary underline underline-offset-4"
          >
            New to all this?
          </Link>
        </header>

        <div className="border-t border-foreground">
          {GET_OARCOIN_HOW_IT_WORKS_STEPS.map((step) => (
            <HowItWorksStepItem key={step.number} step={step} />
          ))}
        </div>

        <div
          className={cn(
            "mt-10 flex flex-col sm:flex-row gap-4 bg-[#FF9D3C] p-5 sm:mt-12 sm:gap-5 sm:p-6 rounded-[0.35rem]",
            "text-foreground"
          )}
        >
          <TriangleAlert className="mt-0.5 size-5 shrink-0 sm:size-6" aria-hidden />
          <ul className="list-disc space-y-2 pl-4 font-sans text-sm leading-relaxed sm:text-base">
            {GET_OARCOIN_HOW_IT_WORKS_WARNINGS.map((warning) => (
              <li key={warning}>{warning}</li>
            ))}
          </ul>
        </div>
      </WidthConstraint>
    </section>
  );
};

export default HowItWorks;
