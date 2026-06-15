import { WidthConstraint } from "@/components/ui/width-constraint";
import { DIRECTORY } from "@/lib/constants";

const DirectoryStats = () => {
  const { stats } = DIRECTORY;

  return (
    <section className="pb-10 pt-8 sm:pb-12 sm:pt-10">
      <WidthConstraint>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 sm:gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-heading text-4xl leading-none tracking-tight sm:text-5xl">
                {stat.value}
              </p>
              <p className="mt-2 font-sans text-sm text-muted-foreground sm:text-base">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </WidthConstraint>
    </section>
  );
};

export default DirectoryStats;
