import Image from "next/image";
import Link from "next/link";

import { Card } from "@/components/ui/card";
import { WidthConstraint } from "@/components/ui/width-constraint";
import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

type ProductCardProps = {
  index: string;
  title: string;
  href?: string;
  iconSrc: string;
};

function ProductCard({ index, title, href, iconSrc }: ProductCardProps) {
  const isExternal = href?.startsWith("http");
  const Inner = (
    <Card
      className={cn(
        "relative rounded-none py-0",
        "bg-muted",
        "transition-colors hover:bg-muted/60"
      )}
    >
      <div className="flex items-center justify-between px-4 py-3 text-sm">
        <span className="font-medium">{index}</span>
        <ArrowUpRight />
      </div>

      <div className="flex min-h-110 flex-col items-center justify-center gap-6 px-6 py-10 text-center">
        <Image
          src={iconSrc}
          alt=""
          width={200}
          height={200}
          className="mix-blend-darken"
        />
        <h3 className="font-heading text-lg lg:text-2xl">{title}</h3>
      </div>
    </Card>
  );

  if (!href) return Inner;

  return (
    <Link
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="block focus-visible:outline-none"
    >
      {Inner}
    </Link>
  );
}

const Products = () => {
  return (
    <section className="py-16 sm:py-24">
      <WidthConstraint className="space-y-4">
        <h2 className="font-heading text-3xl">Explore the Oar Ecosystem</h2>
        <div className="grid gap-0 border border-foreground/20 md:grid-cols-3">
          <ProductCard
            index="01"
            title="Oar Directory"
            iconSrc="/assets/icons/rafla.svg"
            href={ROUTES.directory}
          />
          <ProductCard
            index="02"
            title="Oar Faucet"
            href={ROUTES.faucet}
            iconSrc="/assets/icons/faucet.svg"
          />
          <ProductCard
            index="03"
            title="Reserve Dashboard"
            href={ROUTES.reserve}
            iconSrc="/assets/icons/reserve.svg"
          />
        </div>
      </WidthConstraint>
    </section>
  );
};

export default Products;
