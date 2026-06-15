import DirectoryExplore from "@/components/directory/explore";
import DirectoryFeatured from "@/components/directory/featured";
import DirectoryHero from "@/components/directory/hero";
import DirectoryStats from "@/components/directory/stats";

const DirectoryPage = () => {
  return (
    <main>
      <DirectoryHero />
      <DirectoryStats />
      <DirectoryFeatured />
      <DirectoryExplore />
    </main>
  );
};

export default DirectoryPage;
