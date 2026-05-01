import Image from "next/image";
import Link from "next/link";

import { Card } from "@/components/ui/card";
import { WidthConstraint } from "@/components/ui/width-constraint";
import { cn } from "@/lib/utils";

type ProductCardProps = {
  index: string;
  title: string;
  href?: string;
  iconSrc: string;
};

function ProductCard({ index, title, href, iconSrc }: ProductCardProps) {
  const Inner = (
    <Card
      className={cn(
        "relative rounded-none py-0",
        "bg-muted/10 ring-1 ring-foreground/20",
        "transition-colors hover:bg-muted/20"
      )}
    >
      <div className="flex items-center justify-between px-4 py-3 text-sm">
        <span className="font-medium">{index}</span>
        <span aria-hidden="true" className="text-foreground/80">
          ↗
        </span>
      </div>

      <div className="flex min-h-64 flex-col items-center justify-center gap-6 px-6 py-10 text-center">
        <Image
          src={iconSrc}
          alt=""
          width={200}
          height={200}
          className="mix-blend-darken"
        />
        <h3 className="font-heading text-lg">{title}</h3>
      </div>
    </Card>
  );

  if (!href) return Inner;

  return (
    <Link href={href} className="block focus-visible:outline-none">
      {Inner}
    </Link>
  );
}

const Products = () => {
  return (
    <section className="py-16 sm:py-24">
      <WidthConstraint>
        <h2 className="font-heading text-3xl">Try our Products</h2>

        <div className="mt-8 grid gap-0 border border-foreground/20 md:grid-cols-3">
          <ProductCard index="01" title="Rafla" iconSrc="/assets/icons/rafla.svg" />
          <ProductCard
            index="02"
            title="Oar Faucet"
            href="/faucet"
            iconSrc="/assets/icons/faucet.svg"
          />
          <ProductCard
            index="03"
            title="Reserve Dashboard"
            href="/reserve"
            iconSrc="/assets/icons/reserve.svg"
          />
        </div>
      </WidthConstraint>
    </section>
  );
};

export default Products;
