import Image from "next/image";

import { WidthConstraint } from "@/components/ui/width-constraint";
import { LIVE_PRODUCTS } from "@/lib/constants";
import { LiveProduct } from "@/lib/interfaces";
import { cn } from "@/lib/utils";

type ProductRowProps = LiveProduct;

function ProductRow({ title, icon, items }: ProductRowProps) {
  return (
    <article
      className={cn(
        "flex flex-col gap-6 border-b border-foreground py-10 sm:flex-row sm:items-center sm:gap-10 sm:py-12",
        "md:gap-16"
      )}
    >
      <Image
        src={icon}
        alt=""
        width={200}
        height={200}
        className="size-36 shrink-0 object-contain mix-blend-darken sm:size-44 md:size-52"
      />
      <div className="space-y-4">
        <h3 className="font-heading text-2xl sm:text-3xl">{title}</h3>
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
      </div>
    </article>
  );
}

const OurProducts = () => {
  return (
    <section className="py-16 sm:py-24">
      <WidthConstraint>
        <h2 className="font-heading text-3xl sm:text-4xl">Live Today</h2>
        <div className="mt-8 border-t border-foreground sm:mt-10">
          {LIVE_PRODUCTS.map((product) => (
            <ProductRow key={product.title} {...product} />
          ))}
        </div>
      </WidthConstraint>
    </section>
  );
};

export default OurProducts;
