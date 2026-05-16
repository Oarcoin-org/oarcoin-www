import Image from "next/image";

import { Card } from "@/components/ui/card";
import { WidthConstraint } from "@/components/ui/width-constraint";
import { COMMUNITIES } from "@/lib/constants";
import { CommunityCategory } from "@/lib/interfaces";
import { cn } from "@/lib/utils";

type CommunityCardProps = CommunityCategory;

function CommunityCard({ title, icon, items }: CommunityCardProps) {
  return (
    <Card className={cn("relative rounded-none py-0", "bg-muted", "transition-colors")}>
      <div className="flex min-h-110 flex-col items-center justify-center gap-6 px-6 py-10 text-center">
        <Image src={icon} alt="" width={200} height={200} className="mix-blend-darken" />
        <h3 className="font-heading bg-[#D0D0C4] px-6 py-2 text-lg lg:text-2xl">
          {title}
        </h3>
        <ul className="space-y-2 text-left">
          {items.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2.5 font-sans text-sm sm:text-base"
            >
              <span className="size-2 shrink-0 bg-primary" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}

const OurCommunities = () => {
  return (
    <section className="py-16 sm:py-24">
      <WidthConstraint className="space-y-4">
        <div className="grid gap-0 divide-x divide-foreground/20 border border-foreground/20 md:grid-cols-2">
          {COMMUNITIES.map((community) => (
            <CommunityCard key={community.title} {...community} />
          ))}
        </div>
      </WidthConstraint>
    </section>
  );
};

export default OurCommunities;
