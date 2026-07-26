import CommunitiesHero from "@/components/communities/hero";
import OurCommunities from "@/components/communities/our-communities";
import JsonLd from "@/components/seo/json-ld";
import { ROUTES } from "@/lib/constants";
import { createMetadata, pageGraph } from "@/lib/seo";

const TITLE = "Community";
const DESCRIPTION =
  "Join the Oarcoin community. Connect with OAR on X (Twitter), Telegram, Discord, and upcoming meetups to stay updated and take part in the open system.";

export const metadata = createMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: ROUTES.communities,
});

const CommunitiesPage = () => {
  return (
    <main>
      <JsonLd
        data={pageGraph({
          title: TITLE,
          description: DESCRIPTION,
          path: ROUTES.communities,
        })}
      />
      <CommunitiesHero />
      <OurCommunities />
    </main>
  );
};

export default CommunitiesPage;
