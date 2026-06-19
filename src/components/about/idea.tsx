import Image from "next/image";

import { Heading } from "@/components/heading";
import { ABOUT_IDEA_BODY, ABOUT_IDEA_INTRO } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { WidthConstraint } from "../ui/width-constraint";

const Idea = () => {
  return (
    <section className="w-full border-y border-foreground" data-aos="fade-up">
      <div className="grid min-h-[min(28rem,70vh)] grid-cols-1 md:grid-cols-2">
        <WidthConstraint className="order-2 flex flex-col justify-center gap-6 bg-background max-w-2xl py-14 sm:py-16 px-5 md:order-1 lg:px-16 lg:py-20 lg:mr-[2%]">
          {ABOUT_IDEA_INTRO.map((paragraph) => (
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
          {ABOUT_IDEA_BODY.map((paragraph) => (
            <p
              key={paragraph}
              className="font-heading text-base leading-relaxed sm:text-lg lg:text-xl"
            >
              {paragraph}
            </p>
          ))}
        </WidthConstraint>

        <div className="order-1 flex items-center justify-center border-b border-foreground bg-primary px-8 py-14 md:order-2 md:border-b-0 md:border-l sm:py-16 lg:py-32">
          <Image
            src="/assets/illustrations/coin.svg"
            alt=""
            width={350}
            height={350}
            className=" object-contain aspect-square mix-blend-multiply opacity-90"
          />
        </div>
      </div>
    </section>
  );
};

export default Idea;
