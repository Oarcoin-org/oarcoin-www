import { Heading } from "@/components/heading";
import { WidthConstraint } from "@/components/ui/width-constraint";
import { ABOUT_PROCESS_INTRO, ABOUT_PROCESS_STEPS } from "@/lib/constants";
import { ProcessStep } from "@/lib/interfaces";
import { cn } from "@/lib/utils";

type ProcessStepItemProps = {
  step: ProcessStep;
};

function ProcessStepItem({ step }: ProcessStepItemProps) {
  return (
    <article className="border-t px-5 lg:px-0 border-foreground flex flex-col md:flex-row gap-2 md:gap-10 py-8 sm:py-10">
      <p className="font-heading text-xl sm:text-2xl md::text-3xl">{step.number}</p>
      <div className="space-y-6">
        <h3 className="font-heading text-xl md:text-2xl">{step.title}</h3>
        <p className="text-sm leading-relaxed text-foreground/80 sm:text-base">
          {step.description}
        </p>
      </div>
    </article>
  );
}

const Process = () => {
  return (
    <section className="py-16 sm:py-24" data-aos="fade-up">
      <WidthConstraint className="px-0">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr] lg:items-start lg:gap-20 xl:gap-24">
          <div className="space-y-6 px-5">
            {ABOUT_PROCESS_INTRO.map((paragraph) => (
              <Heading
                key={paragraph.text}
                as="p"
                text={paragraph.text}
                highlightWords={paragraph.highlightWords}
                className={cn(
                  "font-heading text-base leading-relaxed tracking-normal sm:text-lg lg:text-xl",
                  "text-foreground"
                )}
              />
            ))}
          </div>

          <div>
            {ABOUT_PROCESS_STEPS.map((step) => (
              <ProcessStepItem key={step.number} step={step} />
            ))}
          </div>
        </div>
      </WidthConstraint>
    </section>
  );
};

export default Process;
