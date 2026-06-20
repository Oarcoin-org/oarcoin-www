import Banner from "@/components/get-oarcoin/banner";
import GetOarcoinHero from "@/components/get-oarcoin/hero";
import HowItWorks from "@/components/get-oarcoin/how-it-works";
import Uniswap from "@/components/get-oarcoin/uniswap";
import JsonLd from "@/components/seo/json-ld";
import { ROUTES } from "@/lib/constants";
import { createMetadata, pageGraph } from "@/lib/seo";

const TITLE = "Get OAR — Exchanges";
const DESCRIPTION =
  "Find where to get Oarcoin (OAR). Swap for OAR on Uniswap in a few steps, and always verify the official contract address before trading.";

export const metadata = createMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: ROUTES.getOarcoin,
});

const WhereToBuyOarcoin = () => {
  return (
    <main>
      <JsonLd
        data={pageGraph({
          title: TITLE,
          description: DESCRIPTION,
          path: ROUTES.getOarcoin,
        })}
      />
      <GetOarcoinHero />
      <Uniswap />
      <HowItWorks />
      <Banner />
    </main>
  );
};

export default WhereToBuyOarcoin;
