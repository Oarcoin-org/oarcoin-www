import FAQsList from "@/components/faqs/faqs-list";
import FAQsHero from "@/components/faqs/hero";
import JsonLd from "@/components/seo/json-ld";
import { FAQS, ROUTES } from "@/lib/constants";
import { createMetadata, faqSchema, pageGraph } from "@/lib/seo";

const TITLE = "Frequently Asked Questions";
const DESCRIPTION =
  "Answers to common questions about Oarcoin (OAR): what it is, how it's different, how to get and use OAR, the reserve, total supply, the Base blockchain, safety, and more.";

export const metadata = createMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: ROUTES.faqs,
});

const FAQsPage = () => {
  return (
    <main>
      <JsonLd
        data={[
          ...pageGraph({
            title: TITLE,
            description: DESCRIPTION,
            path: ROUTES.faqs,
          }),
          faqSchema(FAQS),
        ]}
      />
      <FAQsHero />
      <FAQsList />
    </main>
  );
};

export default FAQsPage;
