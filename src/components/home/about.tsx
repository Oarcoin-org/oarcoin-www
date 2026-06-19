import { Heading } from "@/components/heading";
import { WidthConstraint } from "@/components/ui/width-constraint";
import { cn } from "@/lib/utils";

const FEATURE_TITLES = [
  "Open Participation",
  "Fair Distribution",
  "Payments & Transfers",
  "Community-Powered Systems",
] as const;

const About = () => {
  return (
    <section
      className={cn("relative isolate overflow-hidden", "py-16 sm:py-24 lg:py-32")}
      data-aos="fade-up"
    >
      <div aria-hidden="true" className={cn("absolute inset-0 -z-10", "bg-background")} />
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 -z-10",
          "bg-cover bg-bottom bg-no-repeat",
          "mix-blend-multiply"
        )}
        style={{ backgroundImage: "url('/assets/home-about-bg.svg')" }}
      />
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-x-0 bottom-0 -z-10",
          "h-[250px]",
          "bg-gradient-to-t from-background to-transparent"
        )}
      />

      <WidthConstraint>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <Heading
              as="h2"
              text="Oarcoin is an open, community-driven system designed for fair access to digital value for everyone."
              highlightWords={[{ text: "Oarcoin", className: "text-primary" }]}
              className={cn("text-3xl leading-[150%] sm:text-4xl", "max-w-lg")}
            />
          </div>

          <div className="space-y-6 max-w-xl lg:max-w-2xl">
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

            <div className="border border-foreground bg-white">
              <ul className="flex w-full flex-col">
                {FEATURE_TITLES.map((title) => (
                  <li
                    key={title}
                    className="border-foreground not-last:border-b px-6 py-4 text-sm font-medium"
                  >
                    <h3>{title}</h3>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </WidthConstraint>
    </section>
  );
};

export default About;
