import type { ReactNode } from "react";

import { WidthConstraint } from "@/components/ui/width-constraint";
import {
  BUILT_TO_EVOLVE,
  DIRECTION_FOCUS,
  IN_DEVELOPMENT,
} from "@/lib/constants";
import { ProgressBulletGroup } from "@/lib/interfaces";

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
    <div className={className}>
      <h2 className="font-heading text-3xl sm:text-4xl">{title}</h2>
      <div className="mt-8 border-t border-foreground sm:mt-10">{children}</div>
    </div>
  );
}

const Direction = () => {
  return (
    <section className="py-16 sm:py-24">
      <WidthConstraint className="space-y-16 sm:space-y-20">
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
