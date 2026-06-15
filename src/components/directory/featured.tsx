import { DirectoryProjectGrid } from "@/components/directory/project-card";
import { WidthConstraint } from "@/components/ui/width-constraint";
import { DIRECTORY } from "@/lib/constants";

const DirectoryFeatured = () => {
  const { featuredSectionTitle, projects } = DIRECTORY;
  const featured = projects.filter((project) => project.featured);

  return (
    <section className="pb-12 sm:pb-16">
      <WidthConstraint className="space-y-5 sm:space-y-6">
        <h2 className="font-heading text-2xl sm:text-3xl">{featuredSectionTitle}</h2>
        <DirectoryProjectGrid projects={featured} />
      </WidthConstraint>
    </section>
  );
};

export default DirectoryFeatured;
