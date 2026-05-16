import Image from "next/image";
import Link from "next/link";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type IllustratedBannerCta = {
  label: string;
  href: string;
  external?: boolean;
};

export type IllustratedBannerProps = {
  title: string;
  body: string;
  leftIllustration: string;
  rightIllustration: string;
  cta?: IllustratedBannerCta;
  className?: string;
  headingClassName?: string;
};

const IllustratedBanner = ({
  title,
  body,
  leftIllustration,
  rightIllustration,
  cta,
  className,
  headingClassName,
}: IllustratedBannerProps) => {
  return (
    <section className={cn("w-full py-14", className)}>
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-center -mb-5 md:mb-0">
          <Image
            src={leftIllustration}
            alt=""
            width={1000}
            height={1000}
            className="w-1/2 object-contain opacity-90 mix-blend-multiply lg:w-full"
          />
        </div>

        <div className="flex flex-col items-center gap-6 text-center">
          <Heading
            as="h2"
            text={title}
            className={cn("text-4xl sm:text-5xl", headingClassName)}
          />
          <p className="max-w-xl font-sans text-base leading-relaxed sm:text-lg">
            {body}
          </p>
          {cta ? (
            <Button className="w-fit" asChild>
              <Link
                href={cta.href}
                {...(cta.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : undefined)}
              >
                {cta.label}
              </Link>
            </Button>
          ) : null}
        </div>

        <div className="flex items-center justify-end -mt-5 md:mt-0">
          <Image
            src={rightIllustration}
            alt=""
            width={1000}
            height={1000}
            className="w-1/2 object-contain opacity-90 mix-blend-multiply lg:w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default IllustratedBanner;
