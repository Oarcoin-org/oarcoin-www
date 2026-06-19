import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Heading } from "../heading";
import { Button } from "../ui/button";
import { WidthConstraint } from "../ui/width-constraint";

const UNISWAP_FEATURES = [
  "Swap supported tokens (e.g USDC, ETH) for OAR",
  "Trade directly from your wallet",
  "No account or registration required",
];

const Uniswap = () => {
  return (
    <section className="w-full border-y border-foreground" data-aos="fade-up">
      <div className="grid min-h-[min(28rem,70vh)] grid-cols-1 md:grid-cols-2">
        <WidthConstraint className="order-2 flex flex-col justify-center gap-6 bg-background max-w-2xl py-14 sm:py-16 px-5 md:order-1 lg:px-16 lg:py-20 lg:mr-[2%]">
          <Heading as="h2" text="Uniswap" className="text-4xl sm:text-5xl lg:text-6xl" />

          <p className="font-sans text-base leading-relaxed sm:text-lg">
            OAR is currently available on Uniswap, a leading decentralized exchange that
            allows you to trade tokens directly from your wallet.
          </p>

          <ul className="space-y-4">
            {UNISWAP_FEATURES.map((item) => (
              <li
                key={item}
                className="flex gap-3 font-sans text-base leading-relaxed sm:text-lg"
              >
                <span className="mt-2 size-2 shrink-0 bg-primary" aria-hidden />
                {item}
              </li>
            ))}
          </ul>

          <Button className="w-fit gap-2" asChild>
            <Link
              href="https://app.uniswap.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Buy OAR on Uniswap
              <ArrowUpRight />
            </Link>
          </Button>
        </WidthConstraint>

        <div className="order-1 flex items-center justify-center border-b border-foreground md:order-2 md:border-b-0 md:border-l h-full">
          <Image
            src="/assets/illustrations/uniswap.svg"
            alt=""
            width={350}
            height={350}
            className=" w-full h-full object-cover mix-blend-multiply opacity-90"
          />
        </div>
      </div>
    </section>
  );
};

export default Uniswap;
