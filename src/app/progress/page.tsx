import BePartOfOurProgress from "@/components/progress/be-part";
import Direction from "@/components/progress/direction";
import ProgressHero from "@/components/progress/hero";
import OurProducts from "@/components/progress/our-products";
import JsonLd from "@/components/seo/json-ld";
import { ROUTES } from "@/lib/constants";
import { createMetadata, pageGraph } from "@/lib/seo";

const TITLE = "OAR Progress";
const DESCRIPTION =
  "See what's live and what's in development across the Oarcoin ecosystem — from the faucet and Rafla to the reserve dashboard — and the direction OAR is heading.";

export const metadata = createMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: ROUTES.progress,
});

const ProgressPage = () => {
  return (
    <main className="space-y-16 sm:space-y-20">
      <JsonLd
        data={pageGraph({
          title: TITLE,
          description: DESCRIPTION,
          path: ROUTES.progress,
        })}
      />
      <ProgressHero />
      <OurProducts />
      <Direction />
      <BePartOfOurProgress />
    </main>
  );
};

export default ProgressPage;
