import { Heading } from "@/components/heading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { WidthConstraint } from "@/components/ui/width-constraint";
import { cn } from "@/lib/utils";

const About = () => {
  return (
    <section className="py-16 sm:py-24">
      <WidthConstraint>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <Heading
              as="h2"
              text="Oarcoin is an open, community-driven system designed for fair access to digital value for everyone."
              highlightWords={[{ text: "Oarcoin", className: "text-primary" }]}
              className={cn(
                "text-4xl leading-[1.15] sm:text-5xl sm:leading-[1.15]",
                "max-w-xl"
              )}
            />
          </div>

          <div className="space-y-6">
            <div className="space-y-4 text-sm text-foreground/80 sm:text-base">
              <p>
                There are no insiders, no presales, and no central authority.
                Participation is open to anyone from day one. Distribution happens in the
                open, and the system grows through collective activity.
              </p>
              <p>
                OAR is transparent by design. Every interaction contributes to a
                community-powered open asset reserve.
              </p>
              <p>
                Through its simplicity and fairness, OAR can be used for everyday
                transactions, social applications like Rafla, and new forms of
                participation that go beyond traditional payment systems.
              </p>
            </div>

            <div className="border border-foreground/30 bg-background">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="open">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    Open Participation
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-5 text-muted-foreground">
                    Anyone can participate from day one—no gatekeeping, no private rounds.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="distribution">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    Fair Distribution
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-5 text-muted-foreground">
                    Distribution happens publicly and grows through real usage.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="payments">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    Payments &amp; Transfers
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-5 text-muted-foreground">
                    Simple, everyday transactions—earned, used, and shared openly.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="community">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    Community-Powered Systems
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-5 text-muted-foreground">
                    New apps and collective tools can emerge on top of a shared, open
                    reserve.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </WidthConstraint>
    </section>
  );
};

export default About;
