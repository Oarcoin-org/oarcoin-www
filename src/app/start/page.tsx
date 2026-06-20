import JsonLd from "@/components/seo/json-ld";
import GettingStartedHero from "@/components/start/hero";
import Steps from "@/components/start/steps";
import { ROUTES } from "@/lib/constants";
import { createMetadata, pageGraph } from "@/lib/seo";

const TITLE = "Getting Started with OAR";
const DESCRIPTION =
  "New to Oarcoin? Learn how to inform yourself, claim free OAR from the faucet, use it across the ecosystem, and verify the system in four simple steps.";

export const metadata = createMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: ROUTES.start,
});

const GettingStartedPage = () => {
  return (
    <main>
      <JsonLd
        data={pageGraph({
          title: TITLE,
          description: DESCRIPTION,
          path: ROUTES.start,
        })}
      />
      <GettingStartedHero />
      <Steps />
    </main>
  );
};

export default GettingStartedPage;
