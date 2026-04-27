import BePartOfOurProgress from "@/components/progress/be-part";
import Direction from "@/components/progress/direction";
import ProgressHero from "@/components/progress/hero";
import OurProducts from "@/components/progress/our-products";

const ProgressPage = () => {
  return (
    <main>
      <ProgressHero />
      <OurProducts />
      <Direction />
      <BePartOfOurProgress />
    </main>
  );
};

export default ProgressPage;
