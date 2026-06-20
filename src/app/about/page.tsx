import HowDoesItWorkHero from "@/components/about/hero";
import Idea from "@/components/about/idea";
import Process from "@/components/about/process";
import JsonLd from "@/components/seo/json-ld";
import { ROUTES } from "@/lib/constants";
import { createMetadata, pageGraph } from "@/lib/seo";

const TITLE = "How OAR Works";
const DESCRIPTION =
  "Understand how Oarcoin works: open and fair distribution, access without limits, real utility, a reserve that grows through activity, and full transparency with no central authority.";

export const metadata = createMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: ROUTES.about,
});

const HowItWorksPage = () => {
  return (
    <main>
      <JsonLd
        data={pageGraph({
          title: TITLE,
          description: DESCRIPTION,
          path: ROUTES.about,
        })}
      />
      <HowDoesItWorkHero />
      <Process />
      <Idea />
    </main>
  );
};

export default HowItWorksPage;
