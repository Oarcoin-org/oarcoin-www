import { ROUTES } from "@/lib/constants";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Heading } from "../heading";
import PageHero from "../page-hero";
import { Button } from "../ui/button";

const Hero = () => {
  return (
    <PageHero
      title={
        <Heading
          text="The Open Asset Reserve"
          highlights={[
            { start: 4, end: 5, className: "text-foreground/40" },
            { start: 9, end: 10, className: "text-foreground/40" },
            { start: 15, end: 16, className: "text-foreground/40" },
          ]}
        />
      }
      description="OAR is an open digital currency powered by the community for everyday transactions — earned, used, and shared daily."
      backgroundImage="/assets/hero/home.svg"
      actions={
        <Button asChild className="flex items-center gap-2 py-0 h-14 p-2 pl-5">
          <Link href={ROUTES.start}>
            Get started with Oarcoin
            <div className="bg-[#100C24] flex items-center justify-center size-10">
              <ArrowUpRight />
            </div>
          </Link>
        </Button>
      }
    />
  );
};

export default Hero;
