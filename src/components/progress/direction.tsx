import type { ReactNode } from "react";

import { WidthConstraint } from "@/components/ui/width-constraint";
import { BUILT_TO_EVOLVE, DIRECTION_FOCUS, IN_DEVELOPMENT } from "@/lib/constants";
import { ProgressBulletGroup } from "@/lib/interfaces";
import { cn } from "@/lib/utils";

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-2.5 font-sans text-sm leading-relaxed sm:text-base"
        >
          <span className="mt-2 size-2 shrink-0 bg-primary" aria-hidden />
          {item}
        </li>
      ))}
    </ul>
  );
}

function DevelopmentItem({ title, items }: ProgressBulletGroup) {
  return (
    <article className="space-y-4 border-b border-foreground py-8 last:border-b-0 sm:py-10">
      <h3 className="font-heading text-xl sm:text-2xl">{title}</h3>
      <BulletList items={items} />
    </article>
  );
}

type ProgressSectionProps = {
  title: string;
  children: ReactNode;
  className?: string;
};

function ProgressSection({ title, children, className }: ProgressSectionProps) {
  return (
    <div className={cn(className, "space-y-3")}>
      <h2 className="font-heading text-2xl sm:text-3xl border-b pb-5 border-foreground">
        {title}
      </h2>
      <div>{children}</div>
    </div>
  );
}

const Direction = () => {
  return (
    <section>
      <WidthConstraint className="space-y-10 sm:space-y-14">
        <ProgressSection title="In development">
          {IN_DEVELOPMENT.map((item) => (
            <DevelopmentItem key={item.title} {...item} />
          ))}
        </ProgressSection>

        <ProgressSection title="Direction">
          <div className="py-8 sm:py-10">
            <BulletList items={DIRECTION_FOCUS} />
          </div>
        </ProgressSection>

        <ProgressSection title="Built to Evolve">
          <div className="py-8 sm:py-10">
            <BulletList items={BUILT_TO_EVOLVE} />
          </div>
        </ProgressSection>
      </WidthConstraint>
    </section>
  );
};

export default Direction;
