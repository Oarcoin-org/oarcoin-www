import Image from "next/image";
import Link from "next/link";

import { Card } from "@/components/ui/card";
import { WidthConstraint } from "@/components/ui/width-constraint";
import { COMMUNITIES } from "@/lib/constants";
import { CommunityCategory, FooterLinkItem } from "@/lib/interfaces";
import { cn } from "@/lib/utils";

type CommunityCardProps = CommunityCategory;

function CommunityItemLabel({ item }: { item: FooterLinkItem }) {
  if ("href" in item) {
    return (
      <Link
        href={item.href}
        target={item.newTab ? "_blank" : undefined}
        rel={item.newTab ? "noreferrer" : undefined}
        className="hover:text-primary"
      >
        {item.label}
      </Link>
    );
  }

  if ("externalHref" in item) {
    return (
      <a
        href={item.externalHref}
        target="_blank"
        rel="noreferrer"
        className="hover:text-primary"
      >
        {item.label}
      </a>
    );
  }

  return <span>{item.label}</span>;
}

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
              key={item.label}
              className="flex items-center gap-2.5 font-sans text-sm sm:text-base"
            >
              <span className="size-2 shrink-0 bg-primary" aria-hidden />
              <CommunityItemLabel item={item} />
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}

const OurCommunities = () => {
  return (
    <section className="py-16 sm:py-24" data-aos="fade-up">
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
