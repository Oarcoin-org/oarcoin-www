import { DirectoryProjectGrid } from "@/components/directory/project-card";
import { WidthConstraint } from "@/components/ui/width-constraint";
import type { DirectoryProject } from "@/lib/interfaces";

type DirectoryFeaturedProps = {
  projects: DirectoryProject[];
  title: string;
};

const DirectoryFeatured = ({ projects, title }: DirectoryFeaturedProps) => {
  if (projects.length === 0) return null;

  return (
    <section className="pb-12 sm:pb-16" data-aos="fade-up">
      <WidthConstraint className="space-y-5 sm:space-y-6">
        <h2 className="font-heading text-2xl sm:text-3xl">{title}</h2>
        <DirectoryProjectGrid projects={projects} />
      </WidthConstraint>
    </section>
  );
};

export default DirectoryFeatured;
